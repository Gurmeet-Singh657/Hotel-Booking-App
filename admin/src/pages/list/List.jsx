import Sidebar from "../../components/sidebar/Sidebar"
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import "./list.scss"
import Datatable from "../../components/datatable/Datatable"

const List = ({ columns }) => {
    return (
        <div className="list">
            <div className="listContainer">
                <AdminNavbar />
                <Datatable columns={columns} />
            </div>
        </div >
    )
}

export default List