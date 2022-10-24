import "./Register.css";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Register = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const { dispatch } = useContext(AuthContext);

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
                try {
                    const res = await axios.post(`https://gurmeet-booking-app-backend.herokuapp.com/api/auth/register`, newUser);
                    setSuccess("You are Successfully Registerd ✅ !");
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                    setError(false);
                    navigate("/");
                }
                catch (err) {
                    setError(err.response.data.message);
                    setSuccess(false);
                }

            }
            else {
                const newUser = { ...info };
                try {
                    const res = await axios.post(`https://gurmeet-booking-app-backend.herokuapp.com/api/auth/register`, newUser);
                    setSuccess("You are Successfully Registered ✅ !");
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                    navigate("/");
                    setError(false);
                }
                catch (err) {
                    setError(err.response.data.message);
                    setSuccess(false);
                }
            }
        } catch (err) {
        }
    };
    return (
        <>
            <Navbar />
            <div className="Register">
                <div className="RegisterContainer">
                    <div className="Regtop">
                        <h1 className="Regmainhead">Register as New User</h1>
                    </div>
                    <div className="Regbottom">
                        <div className="Regleft">
                            <img className="RegImg"
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="Regright">
                            <form className="RegForm">
                                <div className="RegformInput">
                                    <label className="RegLabel" htmlFor="file">
                                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label>
                                    <input className="RegInput"
                                        type="file"
                                        id="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                {inputs.map((input) => (
                                    <div className="RegformInput" key={input.id}>
                                        <label className="RegLabel">{input.label}</label>
                                        <input className="RegLabel"
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                        />
                                    </div>
                                ))}
                                <button className="RegButton" onClick={handleClick}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="regerrorbox">
                {error && <span className="errormsg">{error}</span>}
                {success && <span className="successmsg">{success}</span>}
            </div>
        </>
    );
};

export default Register;