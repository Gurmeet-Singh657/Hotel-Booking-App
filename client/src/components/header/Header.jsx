import "./header.css"
import { useState, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faCar, faPlane, faTaxi, faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons"
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"


const Header = ({ type }) => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])
    const [options, setOptions] = useState({
        maxPeople: 1,
        room: 1
    })
    const { user } = useContext(AuthContext);

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const { dispatch } = useContext(SearchContext);
    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { city: destination, dates, options } });
        navigate("/hotels");
    }
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"} >
                {type !== 'list' && <><h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                    <p className="headerDesc">
                        Get rewarded for your travels - unlock instant savings of 10% or more with a free Booking Account
                    </p>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className="headerIcon" />
                            <input type="text" placeholder="Where are you going?" className="headerSearchInput"
                                onChange={e => setDestination(e.target.value)} />
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                            <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && <DateRange editableDateInputs={true} onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates} className="date" minDate={new Date()} />}
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                            <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.maxPeople} People - ${options.room} room`}</span>
                            {openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Max People</span>
                                    <div className="optionCounter">

                                        <button disabled={options.maxPeople <= 1} className="optionCounterButton" onClick={() => handleOption("maxPeople", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.maxPeople}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("maxPeople", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Min Room</span>
                                    <div className="optionCounter">

                                        <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem">
                            <button onClick={handleSearch} className="headerBtn">Search</button>
                        </div>

                    </div>
                </>}
            </div>
        </div >
    )
}

export default Header