import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { useContext, useState } from "react";
import "./SearchItem.css";

const SearchItem = ({ item, totalrooms, totalpeople }) => {
    const { options } = useContext(SearchContext);
    const [curroption, setCurrOption] = useState(0);
    console.log(totalrooms + "," + totalpeople);
    return (
        <>
            {
                totalrooms >= options.room && totalpeople >= options.maxPeople &&
                < div className="searchItem">
                    <img
                        src={item.photos[0] ? item.photos[0] : "https://media.istockphoto.com/vectors/hotel-hotel-icon-fivestar-hotel-on-a-white-background-vector-id961189076?k=20&m=961189076&s=612x612&w=0&h=T3p2qARooIUEOOAJOWdwFM2wyfE81wkqnOHTZcczN24="}
                        alt=""
                        className="siImg"
                    />
                    <div className="siDesc">
                        <h1 className="siTitle">{item.name}</h1>
                        <span className="siDistance">{item.distance}m from center</span>
                        <span className="siTaxiOp">Free airport taxi</span>
                        <span className="siSubtitle">
                            Studio Apartment with Air conditioning
                        </span>
                        <span className="siFeatures">
                            {item.desc}
                        </span>
                        <span className="siCancelOp">Free cancellation </span>
                        <span className="siCancelOpSubtitle">
                            You can cancel later, so lock in this great price today!
                        </span>
                    </div>
                    <div className="siDetails">
                        {item.rating && <div className="siRating">
                            <span>Excellent</span>
                            <button>{item.rating}</button>
                        </div>}
                        <div className="siDetailTexts">
                            <span className="siPrice">${item.cheapestPrice}</span>
                            <span className="siTaxOp">Includes taxes and fees</span>
                            <Link to={`/hotels/${item._id}`}>
                                <button className="siCheckButton">See availability</button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default SearchItem;