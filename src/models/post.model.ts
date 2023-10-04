import { model, Schema } from "mongoose";
import { MODALS_NAME } from "../constant";

const PostSchema = new Schema(
  {
    post_title: {
      type: String,
      required: [true, "Vui lòng bổ sung tiêu đề bài post"],
      unique: [true, "Tiêu đề đã tồn tại"],
    },
    post_description: {
      type: String,
      required: [true, "Vui lòng bổ sung mô tả cho bài post"],
    },
    post_userId: {
      type: Schema.Types.ObjectId,
      required: [true, "Vui lòng bổ sung thông tin người viết bài"],
      ref: MODALS_NAME.user,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({
  post_title: "text",
  post_description: "text",
});

export default model(MODALS_NAME.post, PostSchema);
