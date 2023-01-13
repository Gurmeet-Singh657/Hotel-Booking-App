import "./newHotel.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import { hotelInputs } from "../../formSource"
import useFetch from "../../hooks/useFetch"
import axios from "axios";

const NewHotel = () => {
    const [files, setFiles] = useState([]);
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const [success, setSuccess] = useState(false);
    const [errr, setErrr] = useState(false);
    const { data, loading, error } = useFetch("https://hotel-managment-system.onrender.com/api/rooms");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSelect = e => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setRooms(value);
    }
    const AddFiles = (e) => {
        setFiles(e);
    }
    const handleClick = async e => {
        e.preventDefault();
        try {
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
            const newhotel = {
                ...info, rooms, photos: list,
            }
            await axios.post("https://hotel-managment-system.onrender.com/api/hotels", newhotel);
            setErrr(false);
            setSuccess("Hotel Created Successfully ✅");
        } catch (err) {
            setSuccess(false);
            setErrr(`❌ ${err.response.data.message}`);
        }
    }
    return (
        <>
            <div className="new">
                <div className="newContainer">
                    <AdminNavbar />
                    <div className="top">
                        <h1>Add New Hotel</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <div className="leftext">You can add atmax 6 Images</div>
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
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label htmlFor="file">
                                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label>
                                    <input type="file" id="file"
                                        multiple
                                        onChange={e => AddFiles(e.target.files)} style={{ display: "none" }} />
                                </div>
                                {hotelInputs.map(input => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input id={input.id}
                                            onChange={handleChange}
                                            type={input.type} placeholder={input.placeholder} />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Featured</label>
                                    <select id="featured" onChange={handleChange}>
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </select>
                                </div>
                                {/* <div className="selectRooms">
                                <label>Rooms</label>
                                <select id="rooms" multiple onChange={handleSelect}>
                                    {loading ? "loading" : data && data.map(room => (
                                        <option key={room._id} value={room._id}>{room.title}</option>
                                    ))}
                                </select>
                            </div> */}
                                <button onClick={handleClick}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {errr && <div className="showerrr">{errr}</div>}
            {success && <div className="showsuccess">{success}</div>}
        </>
    )
}

export default NewHotel;