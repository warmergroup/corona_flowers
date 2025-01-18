import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  refreshToken: { type: String, required: true },
});

const TokenModel = model("Tokens", TokenSchema);

export default TokenModel;
