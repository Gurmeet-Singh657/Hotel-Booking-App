import "./UserEdit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const UserEdit = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [success, setSuccess] = useState(false);
    const [errr, setErrr] = useState(false);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    const { data, loading, error } = useFetch(`https://hotel-managment-system.onrender.com/api/users/${path}`);
    // console.log(data);
    const [info, setInfo] = useState(data);
    // console.log(info);

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

                const updatedUser = {
                    ...info,
                    img: url,
                };
                await axios.put(`https://hotel-managment-system.onrender.com/api/users/${path}`, updatedUser);
                setErrr(false);
                setSuccess("User Updated Successfully ✅");
            }
            else {
                const updatedUser = { ...info };
                await axios.put(`https://hotel-managment-system.onrender.com/api/users/${path}`, updatedUser);
                setErrr(false);
                setSuccess("User Updated Successfully ✅");

            }

        } catch (err) {
            // console.log(err);
            setSuccess(false);
            setErrr(`❌ ${err.response.data.message}`);
        }
    };
    return (
        <>
            <div className="new">
                <div className="newContainer">
                    {/* <AdminNavbar /> */}
                    <div className="top">
                        <h1>Edit User</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={
                                    // data.img
                                    file
                                        ? URL.createObjectURL(file)
                                        : data.img ? data.img :
                                            "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                                            defaultValue={input.id === "password" ? "" : data[input.id]}
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                        />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Admin</label>
                                    <input id="isAdmin" defaultValue={data["isAdmin"]} onChange={handleChange} />
                                </div>
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

export default UserEdit;