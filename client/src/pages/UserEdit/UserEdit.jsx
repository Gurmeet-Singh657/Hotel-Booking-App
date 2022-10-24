import "./UserEdit.css";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserEdit = ({ inputs }) => {
    const [file, setFile] = useState("");
    const [myerror, setMyerror] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const location = useLocation();
    const { user, dispatch } = useContext(AuthContext);
    const { data, loading, error } = useFetch(`https://gurmeet-booking-app-backend.herokuapp.com/api/users/${user._id}`);
    const [info, setInfo] = useState(data);;

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
                try {
                    const res = await axios.put(`https://gurmeet-booking-app-backend.herokuapp.com/api/users/${user._id}`, updatedUser);
                    setSuccess("Successfully Updated Profile ✅ !");
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                    console.log(user);
                    setMyerror(false);
                }
                catch (err) {
                    setMyerror("Email Id or UserName Already Exists");
                    setSuccess(false);
                }
            }
            else {
                const updatedUser = { ...info };
                try {
                    const res = await axios.put(`https://gurmeet-booking-app-backend.herokuapp.com/api/users/${user._id}`, updatedUser);
                    setSuccess("Successfully Updated Profile ✅ !");
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                    setMyerror(false);
                }
                catch (err) {
                    setMyerror("Email Id or UserName Already Exists");
                    setSuccess(false);
                }
            }

        } catch (err) {

        }
    };
    return (
        <>
            <div className="edituser">
                <div className="edituserContainer">
                    <Navbar />
                    <div className="editusertop">
                        <h1 className="editusermainhead">Edit User</h1>
                    </div>
                    <div className="edtiuserbottom">
                        <div className="edituserleft">
                            <img className="edituserimg"
                                src={

                                    file
                                        ? URL.createObjectURL(file)
                                        : data.img ? data.img :
                                            "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="edituserright">
                            <form className="edituserform">
                                <div className="edituserformInput">
                                    <label className="edituserLabel" htmlFor="file">
                                        Image: <DriveFolderUploadOutlinedIcon className="editusericon" />
                                    </label>
                                    <input className="edituserFile"
                                        type="file"
                                        id="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                {inputs.map((input) => (
                                    <div className="edituserformInput" key={input.id}>
                                        <label className="edituserLabel">{input.label}</label>
                                        <input className="edituserInput"
                                            defaultValue={input.id === "password" ? "" : data[input.id]}
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                        />
                                    </div>
                                ))}
                                <button className="edituserbtn" onClick={handleClick}>Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="regerrorbox">
                {myerror && <span className="errormsg">{myerror}</span>}
                {success && <span className="successmsg">{success}</span>}
            </div>
        </>
    );
};

export default UserEdit;