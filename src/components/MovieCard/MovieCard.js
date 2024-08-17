import React from 'react'
import './MovieCard.css';
import { FaArrowRight } from "react-icons/fa6";
import {Link} from 'react-router-dom' ;
function MovieCard({data}) {
  return (
    <div className='card-item'>
      <Link to={`/movie/${data.imdbID}`}>
      <div className='card-inner'>
        <div className='card-top'>
          <img src={data.Poster}alt='Movie Poster'></img>
        </div>
        <div className='card-bottom'>
          <div className='card-info'>
            <h4>{data.Title}</h4>
            <p>To Watch Movie Detail  <FaArrowRight /></p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default MovieCard