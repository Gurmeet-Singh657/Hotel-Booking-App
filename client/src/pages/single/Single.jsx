import "./single.css"
import Navbar from "../../components/navbar/Navbar"
import { useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ShowBookedHotels from "../../components/ShowBookedHotels/ShowBookedHotels"

const Single = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useFetch(`https://gurmeet-booking-app-backend.herokuapp.com/api/users/${user._id}`);
    const navigate = useNavigate("/");
    return (
        <div className="single">
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <h1 className="title">Information</h1>
                        <div className="item">
                            {data.img ? <img src={data.img} className="itemImg" /> :
                                <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" className="itemImg" />}
                            <div className="details">
                                <h1 className="itemTitle">{data.username}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{data.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{data.phone}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Admin:</span>
                                    <span className="itemValue">{data.isAdmin ? "True" : "False"}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{data.country}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">City:</span>
                                    <span className="itemValue">{data.city}</span>
                                </div>
                                <div className="editButton" onClick={() => navigate(`/users/editPage`)}>Edit</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShowBookedHotels />
        </div>
    )
}

export default Single