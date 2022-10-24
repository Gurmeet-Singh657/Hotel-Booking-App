import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import "./Chart.css"
import { useState, useEffect } from 'react';
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import Loading from '../Loading/Loading.jsx';
const COLORS = [
    "#1430B8",
    "#FD4D0C",
    "#448D76",
    "#FCBA12",
    "#B814B2",
    "#341109",
    "#66B032",
    "#00C49F",
    "#8601AF",
    "#FD3A0F",
    "#7CCD7C",
    "#6495ED",
    "#CDB79E",
];

export default function CityWiseHotel() {
    const [allcities, setAllCities] = useState([]);
    const [str, setStr] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/finddistinctcities').then((res) => {
            setAllCities(res.data);
            return axios.get(`https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/countByCity?cities=${res.data.join(",").toString()}`)
        }).then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch(err => console.log(err.response));
    }, [])

    const CityWiseData = []
    const CityHotels = new Map([
    ]);
    for (let i = 0; i < allcities.length; ++i) {
        CityHotels.set(allcities[i], data[i]);
    }
    let idx = 0;
    for (let [key, value] of CityHotels.entries()) {
        const obj = {
            id: idx,
            name: key,
            numberofhotels: value
        }
        idx = idx + 1;
        CityWiseData.push(obj)
    }
    return (
        <div className='ViolenceWiseChartanaly'>
            <div className="Violenceanaly">
                <div className="Violenceanlyheade">City Wise Hotels</div>
            </div>
            {/* {loading ? "" : */}
            <div className="violencegraphanddisplay">

                <div className="Violencegraph">
                    <PieChart width={280} height={300}>
                        <Pie
                            data={CityWiseData}
                            outerRadius={140}
                            innerRadius={100}
                            // fill="#8884d8"
                            dataKey="numberofhotels"
                        >
                            {CityWiseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
                <div className="ViolenceTable">
                    {CityWiseData.map((entry, index) => (
                        <>
                            {
                                <div key={index} className="violencedetails">
                                    <div style={{ backgroundColor: COLORS[index % COLORS.length] }} className="violencetableheader">{entry.name}&nbsp;&nbsp;
                                    </div>
                                    <div key={index} className="violencetablenum">{entry.numberofhotels}</div>
                                </div>
                            }
                        </>
                    ))}
                </div>
            </div>
            {/* } */}
        </div>
    );
}