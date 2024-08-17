import React, { useEffect } from 'react'
import './Home.css'
import MovieListing from '../MovieListing/MovieListing';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchmovies, fetchshows } from '../../features/Movies/MovieSlice';
function Home({search,setsearch}) {
 const dispatch=useDispatch();
 const input=useSelector((state)=>state.movies.handlesearchmovies)
 const loading=useSelector((state)=>state.movies.loading)
 const movietext=input? input:"harry"
 const showtext=input? input:"witcher"
  useEffect(()=>{
    
    dispatch(fetchmovies(movietext))
    dispatch(fetchshows(showtext))
  },[movietext,showtext,dispatch])
  return (
    <div className='home' onClick={()=>setsearch(true)}>
      {/* <div className='banner-img'></div> */}
      {loading ? (
        <h1 className='loader'>Loading...</h1>
      ) : (
        <MovieListing />
      )}
    </div>
  )
}

export default Home