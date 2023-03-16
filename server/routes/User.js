import express from "express";
import {
  authUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  makeAdmin,
  registerUser,
  removeAdmin,
} from "./../controllers/User.js";
const router = express.Router();

router.get("/allUsers", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/makeAdmin/:id", makeAdmin);
router.patch("/removeAdmin/:id", removeAdmin);
router.delete("/users/:id", deleteUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authUser);

export { router as UserRoute };
