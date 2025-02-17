import {storage} from '~/module/appwrite';

export const getUsedStorage = async () => {
  const bucketId = 'coronaflowersBucketId'

  if (!bucketId) {
    throw new Error('Bucket ID is not defined');
  }

  try {
    const response = await storage.listFiles(bucketId);
    const totalSize = response.files.reduce((sum, file) => sum + file.sizeOriginal, 0);
    // console.log("files: ", response.files)
    // console.log('Total Used Storage:', totalSize);
    return totalSize;
  } catch (error) {
    console.error("Xato yuz berdi: ", error);
    return 0;
  }
};
