import express from "express";
import {
  getAllBookings,
  getBookingById,
  postBooking,
  getBookingsByUserId,
  cancelBooking,
} from "../controllers/Booking.js";

const router = express.Router();

router.get("/bookings", getAllBookings);
router.get("/bookings/:id", getBookingById);
router.get("/my-bookings/:id", getBookingsByUserId);
router.post("/bookings", postBooking);
router.post("/cancel-booking", cancelBooking);

export { router as BookingsRoute };
