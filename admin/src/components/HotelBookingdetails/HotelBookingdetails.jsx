import React from 'react'
import "./HotelBookingdetails.css"
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

const HotelBookingdetails = ({ path }) => {
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useFetch(`https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/find/${path}`);
    return (
        <div className='showbookedhotels'>
            <div className="showbookedhotelsheader">Hotel Booking Details</div>
            <TableContainer component={Paper}>
                <Table sx={{ Width: "70vw" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={
                                {
                                    backgroundColor: "rgb(136, 136, 228)", color: "white"
                                }
                            }>User Name</TableCell>
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
                                    {row.UserName}
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
                <><div className='shownohotel'><FontAwesomeIcon icon={faFileCircleExclamation} style={{ color: "rgb(136, 136, 228)" }} />&nbsp;&nbsp;There is no booking related to this Hotel</div></>}
        </div>
    )
}

export default HotelBookingdetails
