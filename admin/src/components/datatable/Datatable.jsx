import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch.js"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const Datatable = ({ columns }) => {
    const navigate = useNavigate("/");
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const { data, loading, error } = useFetch(`https://gurmeet-booking-app-backend.herokuapp.com/api/${path}`);
    // console.log(data);
    const [list, setList] = useState();
    useEffect(() => {
        setList(data);
    }, [data]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://gurmeet-booking-app-backend.herokuapp.com/api/${path}/${id}`);
            setList(list.filter((item) => item._id !== id));
        } catch (err) {

        }
    }

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="datatable">
            <div className="datatableTitle">
                {path}
                <Link to={`/${path}/new`} className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                getRowId={row => row._id}
            />

        </div>
    )
}
export default Datatable
