import "./SingleHotel.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import { useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import HotelBookingdetails from "../../components/HotelBookingdetails/HotelBookingdetails"

const SingleHotel = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/find/${path}`);
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
                                <div className="details">
                                    <h1 className="itemTitle">{data.name}</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Type:</span>
                                        <span className="itemValue">{data.type}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">City:</span>
                                        <span className="itemValue">{data.city}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Address:</span>
                                        <span className="itemValue">{data.address}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Country:</span>
                                        <span className="itemValue">{data.country}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Distance:</span>
                                        <span className="itemValue">{data.distance}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Title:</span>
                                        <span className="itemValue">{data.title}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Description:</span>
                                        <span className="itemValue">{data.desc}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Cheapest Price:</span>
                                        <span className="itemValue">{data.cheapestPrice}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Featured:</span>
                                        <span className="itemValue">{data.featured}</span>
                                    </div>
                                    <div className="editButton" onClick={() => navigate(`/hotels/editPage/${data._id}`)}>Edit</div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            {
                                data.photos &&
                                <div className="rightpartofimg">
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[0] ? data.photos[0] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[1] ? data.photos[1] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[2] ? data.photos[2] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[3] ? data.photos[3] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[4] ? data.photos[4] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                    <div className="temptext"><img className="hotellogoimg" src={data.photos[5] ? data.photos[5] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} /></div>
                                </div>
                            }
                            {
                                !data.photos &&
                                <div className="rightpartofimg">
                                    <img className="hotellogoimg" src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                    <img className="hotellogoimg" src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="" />
                                </div>
                            }
                            {/* <Chart aspect={3 / 1} title="User Spending (Last 6 Months)"></Chart> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <HotelBookingdetails path={path} />
            </div>
        </>
    )
}

export default SingleHotel