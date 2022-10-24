import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import AdminNavbar from '../../components/adminnavbar/AdminNavbar'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import Table from '../../components/table/Table'
import CityWiseHotel from '../../components/CityWiseHotel/CityWiseHotel'

import "./home.scss"


const Home = () => {
    return (
        <div className='home'>
            <div className="homeContainer">
                <AdminNavbar />
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="hotel" />
                    <Widget type="room" />
                </div>
                <div className="charts">
                    {/* <Featured /> */}
                    <CityWiseHotel />
                    <Chart title="Last 12 Months ( Hotels Added )" aspect={2 / 1} />
                </div>
                {/* <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <Table />
                </div> */}
            </div>
        </div>
    )
}

export default Home