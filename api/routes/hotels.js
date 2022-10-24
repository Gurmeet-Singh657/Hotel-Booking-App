import express from "express";
import { countByCity, createHotel, deleteHotel, getAllHotels, getHotelbyId, updateHotel, countByType, getHotelRooms, getDistinctHotels, updateRoomAvailable, findtodaysdata, finddatabyMonths } from "../controllers/hotel.js";
import { createError } from "../utils/error.js";
import Hotel from "../models/Hotel.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.put("/:id", verifyAdmin, updateHotel);
// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET
router.get("/find/:id", getHotelbyId);
// GET ALL
router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/finddistinctcities", getDistinctHotels);
router.put("/userupdate/roomavail", updateRoomAvailable);
router.get("/hotelsdata/todaysdata", findtodaysdata);
router.get("/getdata/Months", finddatabyMonths);

export default router