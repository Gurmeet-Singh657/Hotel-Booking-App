import React from 'react'
import "./AdminNavbar.scss"
import { useContext, useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
const AdminNavbar = () => {
    const navigate = useNavigate("/");
    const { user, dispatch } = useContext(AuthContext);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };
    const [logout, setLogout] = useState(false);
    const onMouseEnter = () => {
        setLogout(true);
    }
    const onMouseLeave = () => {
        setLogout(false);
    }
    return (
        <div className='navbar'>
            <div className="wrapper">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="navlogo">
                        <AdminPanelSettingsIcon />&nbsp;
                        <span className="logo">Admin Panel</span>
                    </div>
                </Link>
                <div className="center">
                    <Link className="iconsbox" to="/users" style={{ textDecoration: "none" }}>
                        <PersonOutlineOutlinedIcon className="icon" />&nbsp;
                        <span className="icontext">Users</span>

                    </Link>
                    <Link to="/hotels" className="iconsbox" style={{ textDecoration: "none" }}>
                        <StoreIcon className="icon" />&nbsp;
                        <span className="icontext">Hotels</span>
                    </Link>
                    <Link to="/rooms" className="iconsbox" style={{ textDecoration: "none" }}>
                        <StoreIcon className="icon" />&nbsp;
                        <span className="icontext">Rooms</span>
                    </Link>

                </div>
                <div className="items" onClick={() => navigate(`/users/${user._id}`)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <div className="procorname">{user?.username}</div>
                    <div className="profilelogo" >
                        {user?.img ? <img src={user?.img} className='avatar' /> :
                            <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" className='avatar' />}
                    </div>
                    {logout && <div className="profcorlogout">
                        <Link to="/rooms" className="iconsbox" style={{ textDecoration: "none" }}>
                            <ExitToAppIcon className="icon" />&nbsp;&nbsp;
                            <span className="icontext" onClick={handleLogout}>Logout</span>
                        </Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar