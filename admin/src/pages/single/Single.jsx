import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import { useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import ShowBookedHotels from "../../components/ShowBookedHotels/ShowBookedHotels.jsx"
import UserEdit from "../UserEdit/UserEdit.jsx"
import { userInputs } from "../../formSource.js"

const Single = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`https://gurmeet-booking-app-backend.herokuapp.com/api/users/${path}`);
    // console.log(data);
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
                                    <div className="editButton" onClick={() => navigate(`/users/editPage/${data._id}`)}>Edit</div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            {/* <Chart aspect={3 / 1} title="User Spending (Last 6 Months)"></Chart> */}
                            {/* <UserEdit inputs={userInputs} /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                {/* <h1 className="title">Last Transactions</h1>
                    <List /> */}
                <ShowBookedHotels path={path} />
            </div>
        </>
    )
}

export default Single