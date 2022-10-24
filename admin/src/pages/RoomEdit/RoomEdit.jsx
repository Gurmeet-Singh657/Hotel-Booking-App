import "./RoomEdit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect } from "react";

const RoomEdit = () => {
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const location = useLocation();
    const [success, setSuccess] = useState(false);
    const [errr, setErrr] = useState(false);
    const path = location.pathname.split("/")[3];
    // console.log(path);

    const { data, loading, error } = useFetch(`https://gurmeet-booking-app-backend.herokuapp.com/api/hotels`);
    const [rooms, setRooms] = useState([]);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    // console.log(info);
    // const CallFunc = async () => {
    //     const roomsnums = await Promise.all(info?.roomNumbers?.map((curr) => {
    //         return curr.number;
    //     }))
    // console.log(roomsnums);
    //     setRooms(roomsnums.toString());
    // }
    // console.log(rooms);
    // CallFunc();
    useEffect(() => {
        const FindDetail = async () => {
            const res = await axios.get(`https://gurmeet-booking-app-backend.herokuapp.com/api/rooms/${path}`);
            setInfo(res.data);
            // console.log(res.data);
            const roomsnums = await Promise.all(res.data.roomNumbers.map((curr) => {
                return curr.number;
            }))
            // console.log(roomsnums);
            setRooms(roomsnums.toString());
        }
        FindDetail();
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        try {
            await axios.put(`https://gurmeet-booking-app-backend.herokuapp.com/api/rooms/${path}`, { ...info, roomNumbers });
            setErrr(false);
            setSuccess("Room Updated Successfully ✅");
        } catch (err) {
            // console.log(err);
            setSuccess(false);
            setErrr(`❌ ${err.response.data.message}`);
        }
    };

    // console.log(info)
    return (
        <>
            <div className="new">
                <div className="newContainer">
                    <AdminNavbar />
                    <div className="top">
                        <h1>Edit Room</h1>
                    </div>
                    <div className="bottom">
                        <div className="right">
                            <form>
                                {roomInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            defaultValue={info[input.id]}
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                        />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Rooms</label>
                                    <textarea
                                        onChange={(e) => setRooms(e.target.value)}
                                        placeholder="give comma between room numbers."
                                        defaultValue={rooms}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Choose a hotel</label>
                                    <select
                                        id="hotelId"
                                        onChange={(e) => setHotelId(e.target.value)}
                                    >
                                        {loading
                                            ? "loading"
                                            : data &&
                                            data.map((hotel) => (
                                                <option key={hotel._id} value={hotel._id} defaultValue={info["hotelname"] === hotel.name}>{hotel.name}</option>
                                            ))}
                                    </select>
                                </div>
                                <button onClick={handleClick}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {errr && <div className="showerrr">{errr}</div>}
            {success && <div className="showsuccess">{success}</div>}
        </>
    );
};

export default RoomEdit;