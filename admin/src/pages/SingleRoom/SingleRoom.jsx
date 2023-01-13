import "./SingleRoom.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import { useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Roomwithunavail from "../../components/Roomwithunavail/Roomwithunavail"

const SingleRoom = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`https://hotel-managment-system.onrender.com/api/rooms/${path}`);
    const navigate = useNavigate("/");
    return (
        <>
            <div className="single">
                <div className="singleContainer">
                    <AdminNavbar />
                    <div className="top">
                        <div className="left">
                            <h1 className="title">Information</h1>
                            <div className="item">
                                <div className="details">
                                    <h1 className="itemTitle">{data.title}</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Price:</span>
                                        <span className="itemValue">{data.price}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">MaxPeople:</span>
                                        <span className="itemValue">{data.maxPeople}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Description:</span>
                                        <span className="itemValue">{data.desc}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Hotel Name:</span>
                                        <span className="itemValue">{data.hotelname}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Room Numbers:</span>
                                        {
                                            data.roomNumbers?.map((curr) => {
                                                return (
                                                    <span key={curr._id} className="itemValue">{curr.number}&nbsp;,&nbsp;</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="editButton" onClick={() => navigate(`/rooms/editPage/${data._id}`)}>Edit</div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            {/* <Chart aspect={3 / 1} title="Rooms Used ( This Year )"></Chart> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                {/* <h1 className="title">Last Transactions</h1> */}
                {/* <List /> */}
                <Roomwithunavail />
            </div>
        </>
    )
}

export default SingleRoom