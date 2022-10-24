import "./HotelEdit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const HotelEdit = ({ inputs, title }) => {
    const [files, setFiles] = useState("");
    const [rooms, setRooms] = useState([]);
    const [success, setSuccess] = useState(false);
    const [errr, setErrr] = useState(false);
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    const { data, loading, error } = useFetch(`https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/find/${path}`);
    useEffect(() => {
        axios.get('/api/rooms').then((res) => {
            setRooms(res.data);
            // console.log(res.data);
        })
    }, [])
    const [info, setInfo] = useState(data);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (files) {
                const list = await Promise.all(
                    Object.values(files).map(async file => {
                        const data = new FormData();
                        data.append("file", file);
                        data.append("upload_preset", "upload");
                        const uploadRes = await axios.post(
                            "https:api.cloudinary.com/v1_1/diwgbw5se/image/upload",
                            data
                        );

                        const { url } = uploadRes.data;
                        return url;

                    }))
                const updatedhotel = {
                    ...info, rooms, photos: list,
                }
                await axios.put(`https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/${path}`, updatedhotel);
                setErrr(false);
                setSuccess("Hotel Updated Successfully ✅");
            }
            else {
                const updatedHotel = { ...info };
                await axios.put(`https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/${path}`, updatedHotel);
                setErrr(false);
                setSuccess("Hotel Updated Successfully ✅");
            }

        } catch (err) {
            // console.log(err);
            setSuccess(false);
            setErrr(`❌ ${err.response.data.message}`);
        }
    };
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSelect = e => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        // console.log(value);
        setInfo((prev) => ({ ...prev, "rooms": value }));
    }
    return (
        <>
            <div className="new">
                <div className="newContainer">
                    <AdminNavbar />
                    <div className="top">
                        <h1>Edit Hotel</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <div className="leftext">You can add atmax 6 Images</div>
                            {
                                data.photos && !files &&
                                <div className="leftpartofimg">
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[0] ? data.photos[0] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[1] ? data.photos[1] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[2] ? data.photos[2] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[3] ? data.photos[3] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[4] ? data.photos[4] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[5] ? data.photos[5] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                </div>
                            }
                            {
                                (!data.photos || files) &&
                                <div className="leftpartofimg">
                                    <img className="hotellogoimg" src={files[0] ? URL.createObjectURL(files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={files[1] ? URL.createObjectURL(files[1]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={files[2] ? URL.createObjectURL(files[2]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={files[3] ? URL.createObjectURL(files[3]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={files[4] ? URL.createObjectURL(files[4]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={files[5] ? URL.createObjectURL(files[5]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                </div>
                            }
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label htmlFor="file">
                                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        multiple
                                        onChange={(e) => setFiles(e.target.files)}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                {inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            defaultValue={data[input.id]}
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                        />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Featured</label>
                                    {data["featured"] === true &&
                                        <select id="featured" onChange={handleChange}>
                                            <option value={true} selected>Yes</option>
                                            <option value={false}>No</option>
                                        </select>}
                                    {data["featured"] === false &&
                                        <select id="featured" onChange={handleChange}>
                                            <option value={true} >Yes</option>
                                            <option value={false} selected>No</option>
                                        </select>}
                                </div>
                                {/* <div className="selectRooms">
                                <label>Rooms</label>
                                <select id="rooms" multiple onChange={handleSelect}>
                                {loading ? "loading" : rooms && rooms.map(room => (
                                    <option key={room._id} value={room._id}>{room.title}</option>
                                    ))}
                                    </select>
                                </div> */}
                                <button onClick={handleClick}>Edit</button>
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

export default HotelEdit;