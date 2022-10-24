import "./login.css"
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleClick = async (e) => {

        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("https://gurmeet-booking-app-backend.herokuapp.com/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/");
        }
        catch (err) {
            // console.log(err.response.data);
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }
    return (
        <>
            <AdminNavbar />
            <div className="login">
                <div className="lContainer">
                    <div className="ltop">
                        <h1 className="lmainhead">Login</h1>
                    </div>
                    <div className="lbottom">
                        <form className="lForm">
                            <div className="lformInput">
                                <label htmlFor="" className="lLabel">UserName </label>
                                <input required="required" type="name" id="username" className="lInput" onChange={handleChange} placeholder="UserName" />

                            </div>
                            <div className="lformInput">
                                <label htmlFor="" className="lLabel">Password </label>
                                <input type="password" id="password" className="lInput" onChange={handleChange} placeholder="PassWord" />
                            </div>
                            <button type="submit" className="lButton" onClick={handleClick}>Login</button>
                            {error && <span className="lerrormessage">{error.message}</span>}
                        </form>
                    </div>
                    {/* <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                    <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                    <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                    {error && <span>{error.message}</span>} */}
                </div>
            </div>
        </>
    );
}
export default Login;