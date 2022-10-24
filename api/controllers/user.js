import User from "../models/User.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (req.body.username !== user.username) {
            const curruser = await User.findOne({ username: req.body.username });
            if (curruser)
                return next(createError(404, "UserName Already Exists !"));
        }
        if (req.body.email !== user.email) {
            const curremail = await User.findOne({ email: req.body.email });
            if (curremail)
                return next(createError(404, "Email Id Already Registered !"));
        }
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const updatedUser = {
                ...req.body,
                password: hash,
            };
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: updatedUser });
            const { password, isAdmin, ...otherDetails } = updateUser._doc;
            const token = jwt.sign({ id: updateUser._doc._id, isAdmin: updateUser._doc.isAdmin }, process.env.JWT);
            res.cookie("access_token", token, { httpOnly: true, })
                .status(200).json({ details: { ...otherDetails, isAdmin } })
        }
        else {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            const token = jwt.sign({ id: updateUser._id, isAdmin: updateUser.isAdmin }, process.env.JWT);
            const { password, isAdmin, ...otherDetails } = updateUser._doc;
            res.cookie("access_token", token, { httpOnly: true, })
                .status(200).json({ details: { ...otherDetails, isAdmin } })
        }
    } catch (err) {
        return next(createError(404, err));
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getUserbyId = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...otherdetails } = user._doc;
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    const { userId, roomId, roomNum, HotelId, startDate } = req.body;
    try {
        const hotel = await Hotel.findById(HotelId);
        const room = await Room.find({
            "roomNumbers._id": roomId
        });
        await User.updateOne(
            { "_id": userId },
            {
                $push: {
                    "booking": { HotelName: hotel.name, roomnumber: roomNum, roomName: room[0].title, startDate: startDate.startDate, endDate: startDate.endDate }
                },
            }
        )
        res.status(200).json("User Hotel List Updated");
    } catch (err) {
        next(err);
    }
};
export const findtodaysdata = async (req, res, next) => {
    try {
        var start = new Date();
        start.setHours(0, 0, 0, 0);

        var end = new Date();
        end.setHours(23, 59, 59, 999);
        const users = await User.find({ createdAt: { $gte: start, $lt: end } });
        res.status(200).json(users);
    }
    catch (e) {
        next(e);
    }
}