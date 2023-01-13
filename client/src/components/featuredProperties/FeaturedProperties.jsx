import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch("https://hotel-managment-system.onrender.com/api/hotels?featured=true");
    const [slideIndex, setSlideIndex] = useState(0)
    const IncreaseSlider = () => {
        if (slideIndex !== data.length - 1) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === data.length - 1) {
            setSlideIndex(0)
        }
    }
    const DecreaseSlider = () => {
        if (slideIndex !== 0) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 0) {
            setSlideIndex(data.length - 1)
        }
    }
    return (
        <div className="featuredpropscontainer">

            {<div className="movingicons" onClick={DecreaseSlider}>
                <FontAwesomeIcon icon={faChevronCircleLeft} style={{ fontSize: "30", color: " rgb(122, 122, 236)" }} />
            </div>}
            <div className="fp">
                {loading ? "Loading" :
                    <>
                        <div className="fpItem">
                            <img
                                src={data[(slideIndex) % data.length]?.photos[0]}
                                alt=""
                                className="fpImg"
                            />
                            <span className="fpName fpitem">{data[slideIndex % data.length]?.name}</span>
                            <span className="fpCity fpitem">{data[slideIndex % data.length]?.city}</span>
                            <span className="fpPrice fpitem">Starting from ${data[slideIndex % data.length]?.cheapestPrice}</span>
                            {data[slideIndex % data.length]?.rating && <div className="fpRating fpitem">
                                <button>{data[slideIndex % data.length]?.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                        <div className="fpItem">
                            <img
                                src={data[(slideIndex + 1) % data.length]?.photos[0]}
                                alt=""
                                className="fpImg"
                            />
                            <span className="fpName fpitem">{data[(slideIndex + 1) % data.length]?.name}</span>
                            <span className="fpCity fpitem">{data[(slideIndex + 1) % data.length]?.city}</span>
                            <span className="fpPrice fpitem">Starting from ${data[(slideIndex + 1) % data.length]?.cheapestPrice}</span>
                            {data[(slideIndex + 1) % data.length]?.rating && <div className="fpRating fpitem">
                                <button>{data[(slideIndex + 1) % data.length]?.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                        <div className="fpItem">
                            <img
                                src={data[(slideIndex + 2) % data.length]?.photos[0]}
                                alt=""
                                className="fpImg"
                            />
                            <span className="fpName fpitem">{data[(slideIndex + 2) % data.length]?.name}</span>
                            <span className="fpCity fpitem">{data[(slideIndex + 2) % data.length]?.city}</span>
                            <span className="fpPrice fpitem">Starting from ${data[(slideIndex + 2) % data.length]?.cheapestPrice}</span>
                            {data[(slideIndex + 2) % data.length]?.rating && <div className="fpRating fpitem">
                                <button>{data[(slideIndex + 2) % data.length]?.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                        <div className="fpItem">
                            <img
                                src={data[(slideIndex + 3) % data.length]?.photos[0]}
                                alt=""
                                className="fpImg"
                            />
                            <span className="fpName fpitem">{data[(slideIndex + 3) % data.length]?.name}</span>
                            <span className="fpCity fpitem">{data[(slideIndex + 3) % data.length]?.city}</span>
                            <span className="fpPrice fpitem">Starting from ${data[(slideIndex + 3) % data.length]?.cheapestPrice}</span>
                            {data[(slideIndex + 3) % data.length]?.rating && <div className="fpRating fpitem">
                                <button>{data[(slideIndex + 3) % data.length]?.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                    </>
                }
            </div>
            {<div className="movingicons" onClick={IncreaseSlider}>
                <FontAwesomeIcon icon={faChevronCircleRight} style={{ fontSize: "30", color: " rgb(122, 122, 236)" }} />
            </div>}
        </div>
    );
};

export default FeaturedProperties;