import * as React from 'react';
import { useState } from 'react';
import LogoImg from "../assets/logo.png";

// import { Login } from '../action';

import { BiLink } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';
import { BASE_URL } from '../variables/Endpoints';



export default function ForgetPassword() {
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();


  // const handleClickShowPassword = () => {
    
  //     setShowPassword(!showPassword)

  // };



  const ForgetPasswordData = () => {
    var data = JSON.stringify({
      "email": email
    });
    
    var config = {
      method: 'post',
      url: `${BASE_URL}user/forgetPassword`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
      api['success']({
        message: response?.data?.data  
      });
  
    })
    .catch(function (error) {
      console.log(error);

      api['error']({
        message: error?.response?.data?.error,
  
      });
  
    });

   

    // store.dispatch(Login(data))

  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center" style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                  {contextHolder}
    <div
    style={{height:"100%"}}
      className="max-w-screen-sm m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
    >
      <div className="xl:w-8/12 p-6 sm:p-12">
     
     <img
         src={LogoImg}
         style={{width: '100px'}}
         className="mx-auto"
       />
    
     <div className="mt-10 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">
          Forget Password
          </h1>
          <div className="w-full flex-1 my-10">


            <div className="mx-auto max-w-xs">
            <p style={{fontSize:"12px", color:"#6366f1"}} className='mb-5'>Enter your email address and we'll send you the link to reset your password.</p>

              <input
              onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
              />
 


              <button onClick={()=>ForgetPasswordData()}
                className="mt-10 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <BiLink size={25} />
                <span className="ml-3">
               Request Reset Link
                </span>
              </button>
              <p className="mt-6 text-xs text-gray-600 text-center">
               
                <Link to="/" className="border-b border-gray-500 border-dotted mx-1">
                  Member Login
                </Link>
                &nbsp;
                Or 
                &nbsp;
                <Link to="/register" className="border-b border-gray-500 border-dotted mx-1">
                  Create Account
                </Link>
    
              </p>
     
            </div>
          </div>
        </div>
      </div>
    
    </div>
    
  </div>

 
  );
}