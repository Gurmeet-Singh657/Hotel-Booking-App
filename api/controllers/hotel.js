import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"
import User from "../models/User.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getHotelbyId = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        if (req.query.city !== '') {
            const hotel = await Hotel.find({
                ...others,
                cheapestPrice: { $gt: min || 1, $lt: max || 999 },
            }).limit(req.query.limit);
            res.status(200).json(hotel);
        }
        else {
            const hotel = await Hotel.find({ cheapestPrice: { $gt: min || 1, $lt: max || 999 } }).limit(req.query.limit);
            res.status(200).json(hotel);
        }
    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    let cities = req.query.cities;
    cities = cities.split(",");
    console.log(cities);
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount }
        ]);
    } catch (err) {
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel?.rooms?.map((room) => {
            return Room.findById(room);
        }))
        res.status(200).json(list);
    }
    catch (err) {
        next(err);
    }
}

export const getDistinctHotels = async (req, res, next) => {
    try {
        const cities = await Hotel.find().distinct('city');
        res.status(200).json(cities);
    } catch (err) {
        next(err);
    }
}

export const updateRoomAvailable = async (req, res, next) => {
    const { userId, roomId, roomNum, HotelId, startDate } = req.body;
    try {
        const user = await User.findById(userId);
        const room = await Room.find({
            "roomNumbers._id": roomId
        });
        await Hotel.updateOne(
            { "_id": HotelId },
            {
                $push: {
                    "booking": { UserName: user.username, roomnumber: roomNum, roomName: room[0].title, startDate: startDate.startDate, endDate: startDate.endDate }
                },
            }
        )

        res.status(200).json("Hotel List Updated");
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
        const hotels = await Hotel.find({ createdAt: { $gte: start, $lt: end } });
        res.status(200).json(hotels);
    }
    catch (e) {
        next(e);
    }
}
export const finddatabyMonths = async (req, res, next) => {
    try {
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const givenmonthdata = await Promise.all(months.map(async (curr) => {
            return await Hotel.find({ "$expr": { "$eq": [{ "$month": "$createdAt" }, curr] } });
        })) 
        res.status(200).json(givenmonthdata);
    }
    catch (e) {
        next(e);
    }
}
