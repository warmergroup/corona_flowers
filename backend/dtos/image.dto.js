class ImageDTO {
  constructor(image) {
    this._id = image._id;
    this.fileUrl = image.fileUrl;
    this.fileId = image.fileId;
    this.createdAt = image.createdAt;
    this.updatedAt = image.updatedAt;
  }
}

export default ImageDTO;
