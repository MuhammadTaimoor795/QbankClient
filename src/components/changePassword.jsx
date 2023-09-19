import * as React from 'react';
import { useState } from 'react';
import LogoImg from "../assets/logo.png";

// import { Login } from '../action';
import { BiReset } from "react-icons/bi";

import { useNavigate, useSearchParams } from 'react-router-dom';
import { notification } from 'antd';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BASE_URL } from '../variables/Endpoints';
import axios from 'axios';


export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [newpassword, setnewpassword] = useState("");
  const [confirnnewpassword, setconfirnnewpassword] = useState("");
  


  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('resetToken');
  console.log(resetToken);

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordC = () => {
    setShowPasswordC(!showPasswordC);
  };
  // const handleClickShowPassword = () => {
    
  //     setShowPassword(!showPassword)

  // };



  const ChangePasswordData = () => {
    var data = JSON.stringify({
      "password": newpassword,
      "confirmpassword": confirnnewpassword
    });
    
    var config = {
      method: 'post',
      url: `${BASE_URL}user/resetPassword?resetToken=${resetToken}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);

      api['success']({
        message: response?.data?.data,
       
             key: 'ForgetPassword', // specify a unique key for the notification
            });
            setTimeout(()=>{
              navigate("/");
            },1000)
  


    })
    .catch(function (error) {
      api['error']({
        message: error?.response?.data?.error,
  
      });    });

   


    // store.dispatch(Login(data))

  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center" style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                  {contextHolder}
    <div
    style={{height:"100%"}}
      className="max-w-screen-sm m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1"
    >
      <div className="xl:w-8/12 p-6 sm:p-12">
     
     <img
         src={LogoImg}
         style={{width: '100px'}}
         className="mx-auto"
       />
    
     <div className="mt-10 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">
         Reset Your Password
          </h1>
          <div className="w-full flex-1 my-10">

          <div className="mx-auto max-w-xs">
<p style={{fontSize:"12px", color:"#6366f1"}} className='mb-5'>Strong Passwords include numbers, letters and special characters (!, @, $, %, ^, &)</p>
      <div className="relative">
        <input
          onChange={(e) => setnewpassword(e.target.value)}
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          autoComplete='off'
        />
        <button
          onClick={handleClickShowPassword}
          className="absolute top-3 right-0 h-full px-2"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      <div className="relative">
        <input
          onChange={(e) => setconfirnnewpassword(e.target.value)}
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type={showPasswordC ? 'text' : 'password'}
          placeholder="Confirm Password"
          autoComplete='off'
        />
        <button
          onClick={handleClickShowPasswordC}
          className="absolute top-3 right-0 h-full px-2"
        >
          {showPasswordC ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      <button
        onClick={() => ChangePasswordData()}
        className="mt-10  tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
      >
        <BiReset size={25} />
        <span className="ml-3">
          Reset Password
        </span>
      </button>
    </div>
    <p style={{fontSize:"12px", color:"#6366f1", textAlign:"justify"}} className='mt-5'>NOTE: Please ensure the password is at least 8 characters long and includes a combination of uppercase letters, lowercase letters and numbers.</p>
          </div>
        </div>
      </div>
    
    </div>
    
  </div>

 
  );
}