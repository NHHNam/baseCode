import { model, Schema } from "mongoose";
import { MODALS_NAME } from "../constant";

const PaymentSchema = new Schema(
  {
    payment_cartId: {
      type: String,
      required: [true, "Vui lòng bổ sung mã thẻ"],
      unique: true,
    },
    payment_nameCard: {
      type: String,
      required: [true, "Vui lòng bổ sung tên thẻ"],
    },
    payment_userId: {
      type: Schema.Types.ObjectId,
      required: [true, "Vui lòng bổ sung thông tin id người dùng"],
      ref: MODALS_NAME.user,
    },
  },
  { timestamps: true }
);

export default model(MODALS_NAME.payment, PaymentSchema);
