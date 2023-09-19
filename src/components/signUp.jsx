import * as React from 'react';
import { useState } from 'react';

import RegisterImg from "../assets/register.png";
import { FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LogoImg from "../assets/logo.png";
import { Spin, notification } from 'antd';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../variables/Endpoints';


export default function SignUp() {

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState(false);
  const [confirmemail, setconfirmemail] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmpassword, setconfirmPassword] = useState("");
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsandConditionC, setTermsandConditionC] = useState(false);

  const [loading, setLoading] = useState(false);

 

  const [api, contextHolder] = notification.useNotification();








  const RegisterData = () => {
setLoading(true);

if(termsandConditionC === true){


    if (email === confirmemail) {



      var data = JSON.stringify({
        "firstname": firstname,
        "lastname":lastname,
        "email": email,
        "password": password,
        "confirmpassword": confirmpassword,
        // "description": selectedValue,
        "phone": phone
      });

      var config = {
        method: 'post',
        url: `${BASE_URL}user/register`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
        
          api['success']({
            message: response?.data?.data,
           
            key: 'SignUp', 
          });

setLoading(false);


        })
        .catch(function (error) {
          console.log(error?.response?.data);
          api['error']({
            message: error?.response?.data?.error,
            key: 'ErrorMessage',
          });
setLoading(false)
        });


    } else {

      api['error']({
        message: "Email Address and Confirmed Email Address do not match.",
       
        
        key: 'ErrorMessage',
      });

      setLoading(false)
    }

  }else{
    api['warning']({
      message: "You must agree to the terms of website.",
     
      
      key: 'ErrorMessage',
    });

    setLoading(false)
  }

  };

  return (
 <Spin spinning={loading} delay={100}>

    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center" style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {contextHolder}

      <div style={{ height: "100%" }}
        className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
      >

        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-10 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${RegisterImg})` }}
          ></div>
        </div>


        <div className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12">

          <img
            src={LogoImg}
            style={{ width: '100px' }}
            className="mx-auto"
          />

          <div className="mt-10 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Create Your Account
            </h1>
            
            <div className="w-full flex-1 my-10">




              <div className="mx-auto grid lg:grid-cols-2 xl:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xs:grid-cols-1 grid-flow-row gap-4">
                <input
                  onChange={(e) => setfirstname(e.target.value)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="First Name"
                  autoComplete='off'

                />
                <input
                  onChange={(e) => setlastname(e.target.value)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="Last Name"
                  autoComplete='off'

                />
                
               
                <input
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email Address"
                  autoComplete='off'
                />


                <input
                  onChange={(e) => setconfirmemail(e.target.value)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Confirm Email Address"
                  autoComplete='off'

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
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-0 h-full px-2"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type={showconfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    autoComplete='off'
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showconfirmPassword)}
                    className="absolute top-3 right-0 h-full px-2"
                  >
                    {showconfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>

                <input
                  onChange={(e) => setphone(e.target.value)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="number"
                  placeholder="Phone Number"
                  autoComplete='off'

                />
              </div>


              <div className="checkbox-wrapper-4 mt-6 mb-3" >
          <input
            className="inp-cbx"
            id="termsC"
            type="checkbox"
            checked={termsandConditionC}
            onChange={() => setTermsandConditionC(!termsandConditionC)} 
          />
          <label className="cbx" htmlFor="termsC">
            <span>
              <svg width="12px" height="10px">
                <use xlinkHref="#check-4"></use>
              </svg>
            </span>
            <span style={{ fontSize: 15 }}>I agree to the <Link className="border-b border-gray-500 border-dotted mx-1" to="/terms-and-condition">terms of the website</Link>.</span>
          </label>
          <svg className="inline-svg">
            <symbol id="check-4" viewbox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </symbol>
          </svg>
        </div>



              <button onClick={() => RegisterData()}
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                
                <FiUserPlus size={25} />
                <span className="ml-3">
                  Sign Up
                </span>
              </button>
              <p style={{fontSize:"12px", color:"#6366f1", textAlign:"justify"}} className='mt-5'>NOTE: Please ensure the password is at least 8 characters long and includes a combination of uppercase letters, lowercase letters and numbers.</p>

              <p className="mt-6 text-xs text-gray-600 text-center">
                Already Have an Account?
                <Link to="/" className="border-b border-gray-500 border-dotted mx-1">
                  Sign In Now
                </Link>

              </p>
            </div>
          </div>
        </div>


      </div>

    </div>

    </Spin>
  );
}