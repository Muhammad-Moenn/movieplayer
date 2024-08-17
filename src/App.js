import './App.css';
import { Router,Routes,Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import MovieDetail from './components/MovieDetail/MovieDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { useEffect, useState } from 'react';
import Player from './components/Player/Player';
import Login from './components/Login/Login';
import { useSelector } from 'react-redux';
// import MovieDetail from './components/MovieDetail/MovieDetail';
// import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  const [search,setsearch]=useState(true);
  const checkusers=useSelector(state=>state.users.user)
  const Navigate=useNavigate()
  useEffect(()=>{
    checkusers.lenght===0?
      Navigate('/')
    :
      Navigate('/login')
  },[])
  return (
    <div className="App">
      {/* <Router> */}
        <Header search={search} setsearch={setsearch}/>
        <div className='container' >
        <Routes>
          <Route  exact path="/" element={<Home search={search} setsearch={setsearch} />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetail search={search} setsearch={setsearch}/>} />
          <Route exact path="/player/:id" element={<Player />} />
          <Route element={<PageNotFound/>} />
        </Routes> 
        </div>
        <Footer />
      {/* </Router> */}
    </div>
  );
}

export default App;
