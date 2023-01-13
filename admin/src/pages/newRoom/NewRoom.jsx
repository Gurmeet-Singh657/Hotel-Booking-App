import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const [success, setSuccess] = useState(false);
    const [hotelId, setHotelId] = useState(undefined);
    const [errr, setErrr] = useState(false);

    const { data, loading, error } = useFetch("https://hotel-managment-system.onrender.com/api/hotels");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    // console.log(hotelId);
    const handleClick = async (e) => {
        e.preventDefault();
        if (!hotelId) {
            setSuccess(false);
            setErrr(`❌ Please Select Any Hotel to Add the Room`);
            return;
        }
        const roomNumbers = rooms.toString().split(",").map((room) => ({ number: room }));
        try {
            await axios.post(`https://hotel-managment-system.onrender.com/api/rooms/${hotelId}`, { ...info, roomNumbers });
            setErrr(false);
            setSuccess("Room Created Successfully ✅");
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
                        <h1>Add New Room</h1>
                    </div>
                    <div className="bottom">
                        <div className="right">
                            <form>
                                {roomInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            id={input.id}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Rooms</label>
                                    <textarea
                                        onChange={(e) => setRooms(e.target.value)}
                                        placeholder="give comma between room numbers."
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
                                                <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
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

export default NewRoom;