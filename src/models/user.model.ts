import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { MODALS_NAME, VALUE_CONSTANT } from "../constant";
import { ERole } from "../enum";

const UserSchema = new Schema(
  {
    user_userName: {
      type: String,
      required: [true, "Vui lòng bổ sung tên người dùng"],
      minlength: 6,
      maxlength: 50,
    },
    user_fullName: {
      type: String,
      required: [true, "Vui lòng bổ sung họ và tên"],
      minlength: 6,
      maxlength: 50,
    },
    user_email: {
      type: String,
      match: [
        /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
        ,
        "Email không đúng định dạng",
      ],
      unique: [true, "Email đã được đăng kí trước đó"],
      required: [true, "Vui lòng bổ sung email"],
    },
    user_password: {
      type: String,
      required: [true, "Vui lòng bổ sung mật khẩu"],
      select: false,
    },
    user_role: {
      type: String,
      enum: ERole,
      default: "USER",
    },
    user_phoneNumber: {
      type: String,
      match: [
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Số điện thoại không đúng định dạng",
      ],
    },
    user_isBlocking: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({
  user_email: 1,
  user_fullName: 1,
  user_phoneNumber: 1,
});

UserSchema.pre("save", async function (next) {
  this.user_password = await bcrypt.hash(
    this.user_password,
    VALUE_CONSTANT.SALT_PASSWORD
  );
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.user_password);
};

export default model(MODALS_NAME.user, UserSchema);
