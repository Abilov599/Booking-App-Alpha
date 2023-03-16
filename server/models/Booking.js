import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    room: { type: Object, required: true },
    user: { type: Object, required: true },
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    transactionId: { type: String, required: true },
    checkInDate: { type: String, required: true },
    checkOutDate: { type: String, required: true },
    totalDays: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    adultCount: { type: Number, required: true },
    status: { type: String, required: true, default: "booked" },
  },
  { timestamps: true }
);

export const Bookings = mongoose.model("booking", bookingSchema);
