import React from 'react'
import "./ShowBookedHotels.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from '../../hooks/useFetch';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const ShowBookedHotels = () => {
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useFetch(`https://hotel-managment-system.onrender.com/api/users/${user._id}`);
    return (
        <div className='showbookedhotels'>
            <div className="showbookedhotelsheader">Hotels Booked</div>
            <TableContainer component={Paper}>
                <Table sx={{ Width: "70vw" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={
                                {
                                    backgroundColor: "rgb(136, 136, 228)", color: "white"
                                }
                            }>Hotel Name</TableCell>
                            <TableCell style={
                                {
                                    backgroundColor: "rgb(136, 136, 228)", color: "white"
                                }
                            } align="center">Room Name</TableCell>
                            <TableCell style={
                                {
                                    backgroundColor: "rgb(136, 136, 228)", color: "white"
                                }
                            } align="center">Room Number</TableCell>
                            <TableCell style={
                                {
                                    backgroundColor: "rgb(136, 136, 228)", color: "white"
                                }
                            } align="center">From</TableCell>
                            <TableCell style={
                                {
                                    backgroundColor: "rgb(136, 136, 228)", color: "white"
                                }
                            } align="center">To</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.booking?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.HotelName}
                                </TableCell>
                                <TableCell align="center">{row.roomName}</TableCell>
                                <TableCell align="center">{row.roomnumber}</TableCell>
                                <TableCell align="center">{row.startDate.slice(0, 10)}</TableCell>
                                <TableCell align="center">{row.endDate.slice(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {data?.booking?.length === 0 &&
                <><div className='shownohotel'><FontAwesomeIcon icon={faFileCircleExclamation} style={{ color:"rgb(136, 136, 228)"}}/>&nbsp;&nbsp;You have not yet booked any Hotel</div></>}
        </div>
    )
}

export default ShowBookedHotels
