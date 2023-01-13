import React from 'react'
import "./Roomwithunavail.css"
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
import { useLocation } from 'react-router-dom';

const Roomwithunavail = () => {
    // const { user } = useContext(AuthContext);
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`https://hotel-managment-system.onrender.com/api/rooms/${path}`);
    // console.log(data.roomNumbers[0].unavailableDates);
    return (
        <div className='showbookedhotels'>
            <div className="showbookedhotelsheader">Room Booking Details</div>
            <TableContainer component={Paper}>
                <Table sx={{ Width: "70vw" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={
                                {
                                    backgroundColor: "rgb(136, 136, 228)", color: "white"
                                }
                            }>Room Number</TableCell>
                            <TableCell style={
                                {
                                    backgroundColor: "rgb(136, 136, 228)", color: "white"
                                }
                            } align="center">For How many dates booked ?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.roomNumbers?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.number}
                                </TableCell>
                                <TableCell align="center">
                                    {row.unavailableDates.length}
                                    {/* {row?.unavailableDates?.map((curr) => {
                                        <span>{curr},</span>
                                    })} */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {data?.roomNumbers?.length === 0 &&
                <><div className='shownohotel'><FontAwesomeIcon icon={faFileCircleExclamation} style={{ color: "rgb(136, 136, 228)" }} />&nbsp;&nbsp;There is no Room Number alloted to this Room</div></>}
        </div>
    )
}

export default Roomwithunavail
