import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload");
                const uploadRes = await axios.post(
                    "https:api.cloudinary.com/v1_1/diwgbw5se/image/upload",
                    data
                );

                const { url } = uploadRes.data;

                const newUser = {
                    ...info,
                    img: url,
                };
                await axios.post(`https://hotel-managment-system.onrender.com/api/auth/register`, newUser);
                setError(false);
                setSuccess("User Created Successfully ✅");
            }
            else {
                const newUser = { ...info };
                await axios.post(`https://hotel-managment-system.onrender.com/api/auth/register`, newUser);
                setError(false);
                setSuccess("User Created Successfully ✅");
            }
        } catch (err) {
            // console.log(err.response.data.message);
            setSuccess(false);
            setError(`❌ ${err.response.data.message}`);
        }
    };

    // console.log(info);
    return (
        <>
            <div className="new">
                <div className="newContainer">
                    <AdminNavbar />
                    <div className="top">
                        <h1>{title}</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
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
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                {inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                        />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Admin</label>
                                    <input id="isAdmin" defaultValue={false} onChange={handleChange} />
                                </div>
                                <button onClick={handleClick}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {error && <div className="showerrr">{error}</div>}
            {success && <div className="showsuccess">{success}</div>}
        </>
    );
};

export default New;