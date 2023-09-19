import * as React from 'react';
import { useState } from 'react';
import LoginImg from "../assets/login.png";
import LogoImg from "../assets/logo.png";

// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Login } from '../action';
// import { store } from '..';
import { BASE_URL } from '../variables/Endpoints';
import { FiLogIn } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { Spin, notification } from 'antd';










export default function SignIn() {


  
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [api, contextHolder] = notification.useNotification();
const navigate = useNavigate();

const [loading, setLoading] = useState(false);
 
  const handleClickShowPassword = () => {
    
      setShowPassword(!showPassword)

  };


  let LoginFunction = () => {
setLoading(true);

    var data = JSON.stringify({
      "email": email,
      "password": password
    });
    
    var config = {
      method: 'post',
      url: `${BASE_URL}user/login`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response?.data);
  if(response?.data?.code === 200 && response?.data?.success === true){
    if(response?.data?.data?.user?.isActive === true){
      if(response?.data?.data?.user?.isBlocked === false){
        if(response?.data?.data?.user?.isVerified === true){
        
          localStorage.setItem("accessTokenuser", response?.data?.data?.accessToken);
          localStorage.setItem("refreshTokenuser", response?.data?.data?.refreshToken);
          localStorage.setItem("usersDetails", typeof(response?.data?.data?.user) === 'object' ? JSON.stringify(response?.data?.data?.user) : null);
  
          api['success']({
            message: 'Successfully Logged In!',
              key: 'SuccessMSG',
          });

          setLoading(false);
          setTimeout(()=>{
            window.location.reload();
          },1000)
  
        }else{
          api['error']({
            message: 'Your Account is not verified!',
              key: 'ErrorMessage',
          });
          setLoading(false);
        }
      }else{
        api['error']({
          message: 'Your Account is blocked!',
            key: 'ErrorMessage',
        });
        setLoading(false);
      }
    }else{
      api['error']({
        message: 'Your Account is not activated!',
          key: 'ErrorMessage',
      });
      setLoading(false);
    }
  }
  
  setLoading(false);
      
    })
    .catch(function (error) {
      console.log(error?.response?.data);
      api['error']({
        message: error?.response?.data?.error,
          key: 'ErrorMessage',
      });
      setLoading(false);
    });
  
    
  }

  return (
 <Spin spinning={loading} delay={100}>
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center" style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
 {contextHolder}

    <div     style={{height:"100%"}}

      className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
    >
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
     
     <img
         src={LogoImg}
         style={{width: '100px'}}
         className="mx-auto"
       />
    
     <div className="mt-10 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">
          Member Login
          </h1>
          <div className="w-full flex-1 my-16">


            {/* <div className="my-12 border-b text-center">
              <div
                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
              >
              Sign In with E-Mail
              </div>
            </div> */}

            <div className="mx-auto max-w-xs">
              <input
              onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
              />
       <div className="relative">
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          autoComplete='off'
        />
        <button
          onClick={()=>setShowPassword(!showPassword)}
          className="absolute top-3 right-0 h-full px-2"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

              

{/* <div className="my-3">
      <input 
className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
      type="checkbox" value={check} onChange={()=>setCheck(!check)} id="flexCheckDefault" />
      <label className="fleading-none inline-block text-sm text-gray-600 tracking-wide font-medium bg-white m-2" htmlFor="flexCheckDefault">
     Remember Me
      </label>
    </div> */}




              <button onClick={()=>LoginFunction()}
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <FiLogIn size={25} />
                <span className="ml-3">
                  Sign In
                </span>
              </button>

          <div className='flex justify-between'>
              <p className="mt-6 text-xs text-gray-600 text-center">
            
            <Link to="/forgetPassword" className="border-b border-gray-500 border-dotted mx-1">
            Forget Password
            </Link>

          </p>

              <p className="mt-6 text-xs text-gray-600 text-center">
                Not a Member? 
                <Link to="/register" className="border-b border-gray-500 border-dotted mx-1">
                  Sign Up Now
                </Link>
    
              </p>
          </div>
          <br />


            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{backgroundImage: `url(${LoginImg})`}}
        ></div>
      </div>

    </div>


  </div>

</Spin>
 
  );
}