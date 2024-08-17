import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  fetchdetails,
  removemoviedetail,
} from "../../features/Movies/MovieSlice";
import "./MovieDetail.css";
import { FaStar } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { IoTimer } from "react-icons/io5";
import { FaCalendarTimes } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
function MovieDetail({search,setsearch}) {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.movies.details);
  console.log(detail);
  useEffect(() => {
    dispatch(fetchdetails(id));

    return () => {
      dispatch(removemoviedetail());
    };
  }, [dispatch, id]);
  return (
    <div className='section'>
    <div className="backicon-box" onClick={()=>navigate(`/`)}><IoChevronBackOutline  className="backicon"/></div>
    <div className="movie-section" onClick={()=>setsearch(true)}>
      {Object.keys(detail).length === 0 ? (
        <h3 className="loader">Loading...</h3>
      ) : (
        <>
          <div className="left">
            <div className="m-title">{detail.Title}</div>

            <div className="m-rating">
              <span>
                Rating <FaStar className="icon i1" /> {detail.imdbRating}
              </span>
              <span>
                Votes <FaThumbsUp className="icon i2" /> {detail.imdbVotes}
              </span>
              <span>
                Run Time <IoTimer className="icon i3" /> {detail.Runtime}
              </span>
              <span>
                Year <FaCalendarTimes className="icon i4" /> {detail.Year}
              </span>
            </div>
            <div className="m-plot">
              <span>Plot</span>
              <p>{detail.Plot}</p>
            </div>
            <div className="m-info">
              <div>
                <span>Director</span>
                <span>{detail.Director}</span>
              </div>
              <div>
                <span>Writer</span>
                <span>{detail.Writer}</span>
              </div>
              <div>
                <span>Actors</span>
                <span>{detail.Actors}</span>
              </div>
              <div>
                <span>Genre</span>
                <span>{detail.Genre}</span>
              </div>
              <div>
                <span>Language</span>
                <span>{detail.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{detail.Awards}</span>
              </div>
              <div>
                <span>Country</span>
                <span>{detail.Country}</span>
              </div>
              <div>
                <span>Rated</span>
                <span>{detail.Rated}</span>
              </div>
              <div>
                <span>Released</span>
                <span>{detail.Released}</span>
              </div>
              <div>
                <span>Type</span>
                <span>{detail.Type}</span>
              </div>
              <div>
                <span>Released</span>
                <span>{detail.Released}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="img-box">
              <img src={detail.Poster} alt=""></img>
              <div className="play-btn">
               <Link to={`/player/${id}`}> <FaPlay className="playicon"/></Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </div>
  );
}

export default MovieDetail;
