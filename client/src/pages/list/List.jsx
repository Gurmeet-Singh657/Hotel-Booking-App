import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem.jsx";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useEffect } from "react";

const List = () => {
    const { city, dates, options } = useContext(SearchContext);
    const [destination, setDestination] = useState(city);
    const [cdates, setCdates] = useState(dates);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const [room, setRoom] = useState(1);
    const [maxPeople, setMaxPeople] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [finalans, setFinalans] = useState(new Array(1000).fill(500));
    const [FinalPeoplecnt, setFinalPeoplecnt] = useState(new Array(1000).fill(500));
    useEffect(() => {
        setLoading(true);
        axios.get(`https://hotel-managment-system.onrender.com/api/hotels?city=${destination}&min=${min - 1 || 0}&max=${max + 1 || 999}`).then(res => {
            setData(res.data);
            // FinalFunc().then(() => {
            //     FinalPeoplecount().then(() => {
            //         setLoading(false);
            //     });
            // })
            setLoading(false);
        })
    }, [options.maxPeople, options.room, city, dates, min, max]);



    // const FinalFunc = async () => {
    //     const Calculatefunc = async (curr) => {
    //         const res = await axios.get(`https://hotel-managment-system.onrender.com/api/hotels/room/${curr._id}`);
    //         let ans = 0;
    //         await Promise.all(res?.data?.map((cur) => {
    //             ans += cur.roomNumbers.length;
    //         }));
    //         console.log(ans);
    //         return ans;
    //     }
    //     const Finalans = await Promise.all(
    //         data.map(Calculatefunc)
    //     );
    //     setFinalans(Finalans);
    //     return true;
    // }
    // const FinalPeoplecount = async () => {
    //     const Calculatefunc = async (curr) => {
    //         const res = await axios.get(`https://hotel-managment-system.onrender.com/api/hotels/room/${curr._id}`);
    //         let ans = 0;
    //         await Promise.all(res?.data?.map((cur) => {
    //             ans = Math.max(ans, cur.maxPeople);
    //         }))
    //         return ans;
    //     }
    //     const Finalans = await Promise.all(
    //         data.map(Calculatefunc)
    //     )
    //     console.log(Finalans);
    //     setFinalPeoplecnt(Finalans);
    //     return true;
    // }
    const { dispatch } = useContext(SearchContext);
    const [showhotelsarr, setShowhotelsarr] = useState([]);
    const handleClick = () => {
        dispatch({ type: "NEW_SEARCH", payload: { city: destination, dates: cdates, options: { room, maxPeople } } });
    }
    // const isroomavail = finalans.some(item => item >= options.room);
    // const isPeopleavail = FinalPeoplecnt.some(item => item >= options.maxPeople);
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input value={destination} type="text"
                                onChange={e => setDestination(e.target.value)} />
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>
                            {(
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setCdates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={cdates}
                                    minDate={new Date()}
                                />
                            )}
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e => setMax(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Max People</span>
                                    <input
                                        type="number"
                                        defaultValue={options.maxPeople}
                                        className="lsOptionInput"
                                        onChange={e => setMaxPeople(e.target.value)}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Min Room</span>
                                    <input
                                        type="number"
                                        defaultValue={options.room}
                                        className="lsOptionInput"
                                        onChange={e => setRoom(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? <div className="nothoteltoshow">Please wait !!</div> : <>
                            {data.length > 0 &&
                                data.map((item, index) => (
                                    <>
                                        <SearchItem item={item} key={item._id} />
                                    </>
                                ))}
                            {(data.length === 0) &&
                                <div className="nothoteltoshow">No Hotel to Show Here! Try Searching for another parameter</div>
                            }
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;