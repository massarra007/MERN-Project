import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 7200 },
});

const Token = mongoose.model("token", tokenSchema);
export default Token;
