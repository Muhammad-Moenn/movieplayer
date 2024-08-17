import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { createuser, removeuser, showuser } from "../../features/Movies/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
function Login() {
  const [signstate, setSignstate] = useState("Sign Up");
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [users, setusers] = useState({});
  const dispatch = useDispatch();
  const Navigate=useNavigate();
  const checkuser=useSelector(state=>state.users.getusers)
  
  useEffect(()=>{
    dispatch(showuser())
  },[])
  
  const setusersdata = (e) => {
    setusers({ ...users, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case 'name':
        setname(e.target.value);
        break;
      case 'email':
        setemail(e.target.value);
        break;
      case 'password':
        setpassword(e.target.value);
        break;
      default:
        break;
    }
  };
  
  //  const formhandler=(e)=>{
  //     e.preventDefault();
  //  }
  const senddatatoapi = async() => {
    setemail('')
    setname('')
    setpassword('')
    await dispatch(createuser(users));
    Navigate('/')
    dispatch(removeuser())
    setusers({});
  };

  const getdatatoapi=()=>{
   
    checkuser.length!==0 && checkuser.map((user) => {
      console.log(user)
      if (user.email === email && user.password === password) {
        Navigate('/');       
      }else{
        toast.error("user not fount")
      }
    });
  }
  return (
    <>
    <div className="login">
    
      <div className="login-form">
        <div className="l-img-box">
          <img
            src="https://www.iconeasy.com/icon/png/System/Amora/Movies.png"
            alt=""
          ></img>
          <span>Movie Play</span>
        </div>
        <h1>{signstate}</h1>
        <from>
          {signstate === "Sign Up" ? (
            <input
              onChange={setusersdata}
              name="name"
              type="text"
              placeholder="Your Name"
              required
              value={name}
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={setusersdata}
            required
            value={email}
          />
          <input
            onChange={setusersdata}
            type="password"
            placeholder="Strong Password"
            name="password"
            required
            value={password}
          />
          <button
            onClick={() => {
              if (
                ((signstate === "Sign Up" )&& (users) && (users.name) && (users.email) && (users.password)
              )) {

                senddatatoapi();
              }else if ((signstate === "Sign In") && (users.email) && (users.password)) {
                getdatatoapi();
                console.log("Calling getdatatoapi()");
              } else {
                toast.error("field is empty");
              }
            }}
            type="submit"
          >
            {signstate}
          </button>
          <div className="from-help">
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label>Remember</label>
            </div>
            <p>Need Help</p>
          </div>
        </from>
        <div className="form-change">
          {signstate === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignstate("Sign Up")}>Sign Up</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setSignstate("Sign In")}>Sign In</span>
            </p>
          )}
          
        </div>
      </div>
      <ToastContainer />
    </div>
      </>
  );
}

export default Login;
