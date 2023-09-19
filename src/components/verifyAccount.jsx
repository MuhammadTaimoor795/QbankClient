import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../variables/Endpoints';
import { Button, Result, notification } from 'antd';

const VerifyAccount = () => {
    const [api, contextHolder] = notification.useNotification();

    const [responseData, setResponseData] = useState("")
    const navigate = useNavigate();
const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  console.log(token);


  const fetchData = async () => {
    var data = '';
  
    var config = {
      method: 'get',
      url: `${BASE_URL}user/verify?token=${token}`,
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setResponseData({name:response?.data?.data, token:"success"});
      
    })
    .catch(function (error) {
        setResponseData({name:error?.response?.data?.error, token:"error"});
      
    });
  };

  useEffect(()=>{
        fetchData();
  },[])

  return (
    <div className="flex items-center justify-center h-screen">
        {contextHolder}
    {
      responseData?.token === "success" ?
<main className="container mx-w-6xl mx-auto py-4" style={{ minHeight: "80vh" }} >
    <Result
    status="success"
    title="Verified Successfully"
    extra={[
     <Link to="/">

     <Button style={{ backgroundColor: "#1677ff" }} type="primary" key="console">
        Click Here To Login
      </Button>
     </Link>
      ,
    ]}
  />
  </main>
      :
<main className="container mx-w-6xl mx-auto py-4" style={{ minHeight: "80vh" }} >
    <Result
    status="error"
    title="Error occured in Verification"
    subTitle={responseData?.name}
    extra={[
     <Link to="/">

     <Button style={{ backgroundColor: "#1677ff" }} type="primary" key="console">
        Go To Main Page
      </Button>
     </Link>
      ,
    ]}
  />
  </main>
    }
  </div>
  
  )
}

export default VerifyAccount