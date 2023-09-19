import * as React from 'react';
import { useState, useEffect } from 'react';
import LogoImg from "../assets/logo.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { Login } from '../action';
import { Link, useNavigate } from 'react-router-dom';
import { notification, theme, Modal, Button } from 'antd';
import axios from 'axios';
import { BASE_URL } from '../variables/Endpoints';
function Header() {
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openChangePasswordModal, setopenChangePasswordModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showCurrentPassword, setCurrentShowPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  let tokenMe = localStorage.getItem("accessTokenuser");
  // const handleClickShowPassword = () => {
  //     setShowPassword(!showPassword)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const openNotificationsucess = (placement,msg) => {
    api.success({
      message: msg,
      placement,
    });
  };
  const openNotificationError = (placement,msg) => {
    api.error({
      message: msg,
      placement,
    });
  };
  const changePassword = () =>{
      var data = {
        "oldpassword": currentPassword,
        "password": password,
        "confirmpassword": confirmpassword ,
      };
      var config = {
        method: 'post',
        url: `${BASE_URL}user/changePassword`,
        headers: { 
          'Authorization': `Bearer ${tokenMe && tokenMe}`
        },
        data : data
      };
      axios(config)
      .then(function (response) {
        openNotificationsucess('top','Password has been successfully changed.');
        setopenChangePasswordModal(false);
       
        setLoading(false);
      })
      .catch(function (error) {
        if((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed")){
          setLoading(false);
          localStorage.clear();
          navigate("/auth/sign-in")
        }else{
          setLoading(false);
          openNotificationError('top',error?.response?.data?.error);
        }
      });
  }
  const handleTestCancel = () => {
    setopenChangePasswordModal(false);
  };
  const Logout = () =>{
    localStorage.clear();
    window.location.reload();
  }
  const showQuestionModal = () => {
    setopenChangePasswordModal(true);
  };
  // };
  const handlechangepass = () => {
    setLoading(true);
    changePassword();
  };
  const fetchProfile = async () => {
    var config = {
      method: 'get',
      url: `${BASE_URL}user/profile`,
      headers: { 
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
    };
    axios(config)
    .then(function (response) {
        if(response?.data?.success === true && response?.data?.code === 200 ) {
            setProfileData(response?.data?.data);
        }
      // setTableData(response?.data?.data);
    })
    .catch(function (error) {
      console.log(error);
      if(error?.response?.data?.error === "You are Unauthorized"){
        localStorage.clear();
        window.location.reload();
      }else{
        api['error']({
          message: error?.response?.data?.error,
            key: 'Success Message',
        });
      }
    });
  };
  useEffect(() => {
    fetchProfile();
  }, []);
return (
<>
<Modal
        open={openChangePasswordModal}
        title="Change Password"
        onOk={handlechangepass}
        onCancel={handleTestCancel}
        footer={[
          <Button key="back" onClick={handleTestCancel}>
            Cancel
          </Button>,
          <Button key="submit" style={{backgroundColor:"#1677ff"}} type="primary" loading={loading} onClick={handlechangepass}>
            Submit
          </Button>,
        ]}
      >
<div className="relative">
        <input
          onChange={(e) => setcurrentPassword(e.target.value)}
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type={showCurrentPassword ? 'text' : 'password'}
          placeholder="Current Password"
          autoComplete='off'
        />
        <button
          onClick={()=>setCurrentShowPassword(!showCurrentPassword)}
          className="absolute top-3 right-0 h-full px-2"
        >
          {showCurrentPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
     <div className="relative">
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type={showPassword ? 'text' : 'password'}
          placeholder="New Password"
          autoComplete='off'
        />
        <button
          onClick={()=>setShowPassword(!showPassword)}
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
          placeholder="Confirm New Password"
          autoComplete='off'
        />
        <button
          onClick={()=>setShowConfirmPassword(!showconfirmPassword)}
          className="absolute top-3 right-0 h-full px-2"
        >
          {showconfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
           {/* <InputField
        onChange={(e) => settestduration(e.target.value)}
          variant="qbank"
          extra="mb-3"
          label="Duration*"
          placeholder="Enter Test Duration"
          id="type"
          type="text"
        /> */}
      </Modal>
    <header className="sticky top-0 z-10 w-full flex items-center justify-between bg-gray-800 text-white px-2 py-2" style={{background:"rgb(6, 101, 166)"}}>
    <Link to="/">
    <img src={LogoImg} style={{filter: 'drop-shadow(0 0 0.75rem #fff)'}} className="w-10 h-10" alt="Logo" />
    </Link>
  {contextHolder}
    <div className="relative">
      <div className="flex items-center text-white">
        <div className="group" onClick={toggleDropdown}>
          <span className="cursor-pointer mr-2">Profile</span>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-lg shadow-lg" style={{backgroundColor:"rgb(6, 101, 166)"}}>
           <div className="p-2">
                <p className="text-center">{profileData?.email}</p>
              </div>
              <hr className="my-2" />
              <a className="block px-4 py-2 text-white" onClick={showQuestionModal}>
                Change Password
              </a>
              {/* Add more dropdown options if needed */}
            </div>
          )}
        </div>
        <a onClick={Logout} className="cursor-pointer ml-4 text-white">
          Logout
        </a>
      </div>
    </div>
  </header>
  </>
        );
}
export default Header;