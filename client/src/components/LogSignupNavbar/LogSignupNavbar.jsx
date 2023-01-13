import "./LogSignupNavbar.css";
import { Link, NavLink, Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faUser, faPlaneDeparture, faSolid } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";


const LogSignupNavbar = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({});
    const { user, dispatch } = useContext(AuthContext);
    const { data, loading, error } = useFetch(`https://hotel-managment-system.onrender.com/api/users/${user._id}`);
    const logouthotel = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    }
    return (
        <div className="navbar">
            <div className="navContainer">
                <div onClick={() => navigate("/")} style={{ cursor: "pointer", color: "inherit", textDecoration: "none" }} >
                    <span className="navlogo"><FontAwesomeIcon icon={faPlaneDeparture} />&nbsp;&nbsp;Hotel Booking App</span>
                </div>
                {user?.isAdmin && <Link to="//localhost:3001" target="_blank" style={{ color: "inherit", textDecoration: "none" }} >
                    <span className="navlogo"><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;Refer Admin Panel Here</span>
                </Link>}

                {user ?
                    <div className="navItems">
                        <div className="navphotos" onClick={() => navigate("/userprofile")}><img className="navphoto" src={data.img ? data.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgd3SjY4Nowsfr0xD4xuKlGPzg33fkgC7ySw5GBdI5Nj3ug9qfAOmUBxylxysL_4brpDE&usqp=CAU"} alt="" /></div>&nbsp;&nbsp;
                        <div className="navprofilename" onClick={() => navigate("/userprofile")}>{data.username}</div>
                        <div className="navprofilelogout" onClick={logouthotel}>Logout</div>
                    </div>
                    :
                    <div className="navItems">
                        <button className="navButton" onClick={() => navigate("/Register")}>Register</button>
                        <button className="navButton" onClick={() => navigate("/login")}>Login</button>
                    </div>
                }
            </div>
        </div>
    )
}
export default LogSignupNavbar