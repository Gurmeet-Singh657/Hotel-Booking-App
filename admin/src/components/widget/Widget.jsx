import React from 'react'
import "./widget.scss"
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import WeekendIcon from '@mui/icons-material/Weekend';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"

const Widget = ({ type }) => {

    let data;
    const [users, setUsers] = useState(0);
    const [hotels, setHotels] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [todaysusers, setTodaysusers] = useState(0);
    const [todayshotels, setTodayshotels] = useState(0);
    const [todaysrooms, setTodaysrooms] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const Findfunc = async () => {
            const user = await axios.get('https://gurmeet-booking-app-backend.herokuapp.com/api/users');
            setUsers(user.data);
            const hotel = await axios.get('https://gurmeet-booking-app-backend.herokuapp.com/api/hotels');
            setHotels(hotel.data);
            const rooms = await axios.get('https://gurmeet-booking-app-backend.herokuapp.com/api/rooms');
            setRooms(rooms.data);
            const todayuser = await axios.get('https://gurmeet-booking-app-backend.herokuapp.com/api/users/userdata/todaysdata');
            setTodaysusers(todayuser.data);
            const todayhotels = await axios.get('https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/hotelsdata/todaysdata');
            setTodayshotels(todayhotels.data);
            const todayrooms = await axios.get('https://gurmeet-booking-app-backend.herokuapp.com/api/rooms/roomsdata/todaysdata');
            setTodaysrooms(todayrooms.data);
        }
        Findfunc();
        setLoading(true);
    }, [])
    // console.log(todaysusers + " " + todayshotels + " " + todaysrooms);
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                link: "See all Users",
                icon: < PersonOutlineOutlinedIcon className='icon' style={{ color: 'crimson', backgroundColor: "rgba(255,0,0,0.2)" }} />
            };
            break;
        case "hotel":
            data = {
                title: "HOTELS",
                link: "View all Hotels",
                icon: < LocalHotelIcon className='icon' style={{ color: 'goldenrod', backgroundColor: "rgba(218,165,32,0.2)" }} />
            };
            break;
        case "room":
            data = {
                title: "ROOMS",
                link: "View all Rooms",
                icon: < WeekendIcon className='icon' style={{ color: 'green', backgroundColor: "rgba(0,128,0,0.2)" }} />
            };
            break;
        default:
            break;
    }
    const navigate = useNavigate("/");
    return (
        <div className="widget">
            {!loading ? "Loading" : <> <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}
                    {data.title.toLowerCase() === "users" && users.length}
                    {data.title.toLowerCase() === "hotels" && hotels.length}
                    {data.title.toLowerCase() === "rooms" && rooms.length}
                </span>
                <span className="link" onClick={() => navigate(`/${data.title.toLowerCase()}`)}>{data.link}</span>
            </div>
                <div className="right">
                    <div className="percentage positive">
                        <ExpandLessOutlinedIcon />
                        {data.title.toLowerCase() === "users" && todaysusers.length}
                        {data.title.toLowerCase() === "hotels" && todayshotels.length}
                        {data.title.toLowerCase() === "rooms" && todaysrooms.length}
                    </div>
                    {data.icon}
                </div></>}
        </div>
    )
}

export default Widget