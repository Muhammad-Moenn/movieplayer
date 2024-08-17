import React, { useEffect } from "react";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  playvideo, removeid } from "../../features/Movies/Playerslice";
import { IoChevronBackOutline } from "react-icons/io5";
function Player() {
  const dispatch = useDispatch();
  // const detail = useSelector((state) => state.movies.details);
  const key = useSelector((state) => state.player.player);
  const loading = useSelector((state) => state.player.loading);
  
  // console.log("error is",error)
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(playvideo(id));
  
    return () => {
      dispatch(removeid());
    };
  }, []);
  

  return (
    <>
    <div className="player">
      {loading ?(
        <h3 className="loader">Loading...</h3>

      ):(
        <>
        <div className="backicon-box" onClick={()=>navigate(`/movie/${id}`)}><IoChevronBackOutline  className="backicon"/></div>
      {/* <ifram width='90%' height='90%' src='https://www.youtube.com/embed/hkHHwA-vEyQ' title='trailer'framBorder allowFullScreen></ifram> */}
      
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${key}`}
        title="Official Trailer "
        frameborder="0"
        allowFullScreen
      ></iframe>
      </>
      )}
      
    </div>
      </>
  );
}

export default Player;
