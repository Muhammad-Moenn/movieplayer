import React, { useState } from 'react'
import './Header.css'
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchmovies, fetchshows, handlesearchmoviesathomepage } from '../../features/Movies/MovieSlice';
import { FaSearch } from "react-icons/fa";
function Header({search,setsearch}) {
const [input,setinput]=useState('')
const Natigate=useNavigate();
  const dispatch=useDispatch()
  const submitehandler=(e)=>{
    e.preventDefault()
    dispatch(handlesearchmoviesathomepage(input))
    input && Natigate('/')
    dispatch(fetchmovies(input))
    dispatch(fetchshows(input))
    setinput('')
    
    // setsearch(!search)
  }
  return (
    <div className='header'  >
      <div className='h-left' onClick={()=>setsearch(true)}>
        <div className={`h-left-box ${search?"":"hide"}`}>
        <div className='h-img-box' >
          <img src='https://www.iconeasy.com/icon/png/System/Amora/Movies.png'alt=''></img>
          <span>Movie Play</span>
        </div>
        <Link to={'/'}><p>Home</p></Link>
        </div>
      </div>
      <div className='h-right'>
        <form onSubmit={submitehandler} className='search-box'>
          
          <input className={search?'':'visi'} value={input} onChange={(e)=>setinput(e.target.value)}  type='text' placeholder='Search here...' />
          <button  onClick={()=>setsearch(!search)} className='search-icon'><FaSearch /></button>
        </form>
       <FaUserCircle className='user-icon'/>
      </div>
    </div>
  )
}

export default Header