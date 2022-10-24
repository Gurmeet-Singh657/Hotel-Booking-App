import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {

    const hotelID = req.params.hotelid
    const currhotel = await Hotel.findById(hotelID);
    const roomjson = req.body;
    roomjson["hotelname"] = currhotel.name;
    const newRoom = new Room(roomjson)

    try {
        const savedRoom = await newRoom.save()

        try {
            await Hotel.findByIdAndUpdate(hotelID, {
                $push: { rooms: savedRoom._id },
            })
        } catch (e) {
            next(e)
        }
        res.status(200).json(savedRoom)
    } catch (e) {
        next(e)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
    } catch (e) {
        next(e)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        }
        catch (err) {
            next(err);
        }
        res.status(200).json("Room Deleted")
    } catch (e) {
        next(e)
    }
}

export const getRoomById = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (e) {
        next(e)
    }
}

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (e) {
        next(e)
    }
}

export const findtodaysdata = async (req, res, next) => {
    try {
        var start = new Date();
        start.setHours(0, 0, 0, 0);

        var end = new Date();
        end.setHours(23, 59, 59, 999);
        const rooms = await Room.find({ createdAt: { $gte: start, $lt: end } });
        res.status(200).json(rooms);
    }
    catch (e) {
        next(e);
    }
}