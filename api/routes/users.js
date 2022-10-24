import express from "express";
import { deleteUser, getAllUsers, getUserbyId, updateUser, updateRoomAvailability, findtodaysdata } from "../controllers/user.js";
import { createError } from "../utils/error.js";
import User from "../models/User.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


// UPDATE
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);
// GET
router.get("/:id", getUserbyId);
// GET ALL
router.get("/", getAllUsers);
// UPDATE
router.put("/userupdate/roomavail", updateRoomAvailability);
router.get("/userdata/todaysdata", findtodaysdata);

export default router