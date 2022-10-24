import useFetch from "../../hooks/useFetch.js"
import "./featured.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faHotel, faPlaneDeparture, faSolid } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import axios from "axios";


const Featured = () => {
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
    const [slideIndex, setSlideIndex] = useState(0)
    const IncreaseSlider = () => {
        if (slideIndex !== allcities.length - 1) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === allcities.length - 1) {
            setSlideIndex(0)
        }
    }
    const DecreaseSlider = () => {
        if (slideIndex !== 0) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 0) {
            setSlideIndex(allcities.length - 1)
        }
    }
    const images = [
        "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVybGlufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
        "https://images.pexels.com/photos/597909/pexels-photo-597909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg",
        "https://cdn.britannica.com/94/167894-050-C7E2C482/Brooklyn-Bridge-East-River-New-York-City.jpg",
        "https://thumbs.dreamstime.com/b/berlin-skyline-panorama-sunny-day-germany-33467988.jpg"
    ]
    return (
        <div className="featuredcontainer">
            {<div className="movingicons" onClick={DecreaseSlider}>
                <FontAwesomeIcon icon={faChevronCircleLeft} style={{ fontSize: "30", color: " rgb(122, 122, 236)" }} />
            </div>}
            <div className="featured">
                <div className="featuredItem">
                    <img src={images[slideIndex % allcities.length]} alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>{allcities[slideIndex % allcities.length]}</h1>
                        <h2>{loading ? 0 : data[slideIndex % allcities.length]} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src={images[(slideIndex + 1) % allcities.length]} alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>{allcities[(slideIndex + 1) % allcities.length]}</h1>
                        <h2>{loading ? 0 : data[(slideIndex + 1) % allcities.length]} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src={images[(slideIndex + 2) % allcities.length]} alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>{allcities[(slideIndex + 2) % allcities.length]}</h1>
                        <h2>{loading ? 0 : data[(slideIndex + 2) % allcities.length]} properties</h2>
                    </div>
                </div>
            </div>
            {<div className="movingicons" onClick={IncreaseSlider}>
                <FontAwesomeIcon icon={faChevronCircleRight} style={{ fontSize: "30", color: " rgb(122, 122, 236)" }} />
            </div>}
        </div >
    )
}

export default Featured
