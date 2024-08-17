import React from 'react'
import './MovieListing.css'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoChevronBackOutline } from "react-icons/io5";
import 'swiper/css';
import { Slidersetting } from '../Slidersetting';
import { handlesearchmoviesathomepage } from '../../features/Movies/MovieSlice';
function MovieListing() {
  const movies=useSelector((state)=>state.movies.movies);
  const shows=useSelector((state)=>state.movies.shows);
  const input=useSelector((state)=>state.movies.handlesearchmovies)
  const dispatch=useDispatch();
  const toNullInput=()=>{
    dispatch(handlesearchmoviesathomepage())
  }
  let renderMovies,rendershows = '';

  renderMovies = movies.Response === "True" ? (
    <Swiper className='swiper-box'{...Slidersetting}>
      {movies.Search.map((movie, index) => (
        <SwiperSlide className='swiperslide'key={index}>
          <MovieCard data={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className='movie-error'><h3>{movies.Error}</h3></div>
  );
  rendershows = shows.Response === "True" ? (
    <Swiper {...Slidersetting} className='swiper-box'>
      {shows.Search.map((show, index) => (
        <SwiperSlide className='swiperslide'key={index}>
          <MovieCard data={show} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className='movie-error'><h3>{shows.Error}</h3></div>
  );
  

  return (
    <div className='movie-wapper'>
      {input&&
      <span onClick={toNullInput} ><IoChevronBackOutline  className="backicon back"/></span>
      }
      
      <div className='movie-list'>
        <h2>Movies</h2>
        <div className='movie-container'>
          {renderMovies}
        </div>
      </div>
      <div className='movie-list'>
        <h2>Series</h2>
        <div className='movie-container'>
          {rendershows}
        </div>
      </div>
      
    </div>
  )
}

export default MovieListing