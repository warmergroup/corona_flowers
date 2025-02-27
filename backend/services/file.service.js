import dotenv from "dotenv";

dotenv.config();
import {Client, Storage, ID} from "appwrite";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";
import BaseError from "../errors/base.error.js";


const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_BUCKET_ID,
  APPWRITE_API_KEY,
} = process.env;

class FileService {
  constructor() {
    this.client = new Client();
    this.client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  async save(file) {
    if (!file || !file.buffer) {
      throw BaseError.BadRequestError(
        "Fayl tanlanmadi yoki noto'g'ri formatda"
      );
    }

    const filename = `${Date.now()}_${file.originalname}`;
    const uploadsDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadsDir)) {
      await fs.promises.mkdir(uploadsDir, {recursive: true});
    }

    const filePath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(filePath, file.buffer);

    const form = new FormData();
    form.append("fileId", ID.unique());
    form.append("file", fs.createReadStream(filePath));

    const {data} = await axios.post(
      `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          "X-Appwrite-Project": APPWRITE_PROJECT_ID,
          "X-Appwrite-Key": APPWRITE_API_KEY,
        },
      }
    );

    if (!data.$id) {
      throw BaseError.BadRequestError(
        `Fayl yuklash muvaffaqiyatsiz: ${data.message}`
      );
    }

    await fs.promises.unlink(filePath);

    return {
      fileId: data.$id,
      fileUrl: `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${data.$id}/view?project=${APPWRITE_PROJECT_ID}`,
    };
  }

  async delete(fileId) {
    try {
      const {data} = await axios.delete(
        `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${fileId}`,
        {
          headers: {
            "X-Appwrite-Project": APPWRITE_PROJECT_ID,
            "X-Appwrite-Key": APPWRITE_API_KEY,
          },
        }
      );

      return data;
    } catch (error) {
      throw BaseError.BadRequestError(
        "Faylni o'chirishda xatolik: " + error.message
      );
    }
  }

  async getFileView(bucketId, fileId) {
    try {
      const {href} = this.storage.getFileView(bucketId, fileId);
      return href;
    } catch (error) {
      throw new Error("Faylni ko'rishda xatolik: " + error.message);
    }
  }

  async updateFile(fileId, name, permissions) {
    try {
      return await this.storage.updateFile(
        APPWRITE_BUCKET_ID,
        fileId,
        name,
        permissions
      );
    } catch (error) {
      throw new Error("Faylni yangilashda xatolik: " + error.message);
    }
  }
}

export default new FileService();
