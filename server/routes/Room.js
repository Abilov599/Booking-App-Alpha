import express from "express";
import {
  deleteRoomById,
  getAllRooms,
  getRoomById,
  postRoom,
} from "./../controllers/Room.js";
const router = express.Router();

router.get("/rooms", getAllRooms);
router.get("/rooms/:id", getRoomById);
router.post("/rooms", postRoom);
router.delete("/rooms/:id", deleteRoomById);

export { router as RoomRoute };
