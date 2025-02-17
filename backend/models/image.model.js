import {Schema, model} from 'mongoose';

const imageSchema = new Schema(
  {
    fileUrl: {type: String, required: true},
    fileId: {type: String, required: true},
  },
  {timestamps: true}
);

const ImageModel = model('Images', imageSchema);

export default ImageModel;
