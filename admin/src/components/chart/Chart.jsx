import "./chart.scss"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import axios from "axios";
const data = [
    { name: "Jan", Total: 1200 },
    { name: "Feb", Total: 2100 },
    { name: "Mar", Total: 800 },
    { name: "Apr", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
    { name: "July", Total: 1700 },
    { name: "Aug", Total: 1700 },
    { name: "Sep", Total: 1700 },
    { name: "Oct", Total: 1700 },
    { name: "Nov", Total: 1700 },
    { name: "Dec", Total: 1700 }
]

const Chart = ({ aspect, title }) => {
    const [currdata, setCurrdata] = useState([]);
    useEffect(() => {
        const Findfunc = async () => {
            const res = await axios.get("https://gurmeet-booking-app-backend.herokuapp.com/api/hotels/getdata/Months");
            setCurrdata(res.data);
        }
        Findfunc();
    }, []);
    const HotelWiseData = []
    const Hotels = new Map([
    ]);
    for (let i = 0; i < currdata.length; ++i) {
        Hotels.set(data[i].name, currdata[i].length);
    }
    let idx = 0;
    for (let [key, value] of Hotels.entries()) {
        const obj = {
            // id: idx,
            name: key,
            Total: value
        }
        idx = idx + 1;
        HotelWiseData.push(obj)
    }
    // console.log(HotelWiseData);
    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart width={730} height={250} data={HotelWiseData}
                    margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart