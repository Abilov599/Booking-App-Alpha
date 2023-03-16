import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    price: { type: Number, required: true },
    maxAdultCount: { type: Number, required: true },
    maxChildCount: { type: Number, required: true },
    thumbnailImage: { type: String, required: true },
    images: { type: Array, required: true },
    currentBookings: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const Rooms = mongoose.model("rooms", roomSchema);
