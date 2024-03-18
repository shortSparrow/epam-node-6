import mongoose, { Schema } from "mongoose";

export interface UserDbI {
  _id: string;
  email: string;
  role: string;
  password: string;
  token: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

export const UserDb = mongoose.model<UserDbI>("User", UserSchema);

