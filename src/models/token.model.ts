import { model, Schema } from "mongoose";
import { MODALS_NAME } from "../constant";
const TokenSchema = new Schema(
  {
    token_userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: MODALS_NAME.user,
    },
    token_privateKey: {
      type: String,
      required: true,
    },
    token_publicKey: {
      type: String,
      required: true,
    },
    token_refreshTokenUsing: {
      type: String,
      required: true,
    },
    token_refreshTokenUsed: {
      type: Array<String>,
      default: [],
    },
  },
  { timestamps: true }
);

export default model(MODALS_NAME.token, TokenSchema);
