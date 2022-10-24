import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom, updateRoomAvailability, findtodaysdata } from "../controllers/room.js";
import { createError } from "../utils/error.js";
import Room from "../models/Room.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
// DELETE
router.delete("/:id", verifyAdmin, deleteRoom);
// PUT
router.put("/availability/:id", updateRoomAvailability);
// GET
router.get("/:id", getRoomById);
// GET ALL
router.get("/", getAllRooms);
router.get("/roomsdata/todaysdata", findtodaysdata);

export default router