import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button, Divider, Progress, Result, Spin, notification } from 'antd';
import Headers from "./Header";
import { BASE_URL } from '../variables/Endpoints';
import axios from 'axios';

const Resultz = () => {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  let tokenMe = localStorage.getItem("accessTokenuser");

  const [resultData, setResultData] = useState(state);


  const [api, contextHolder] = notification.useNotification();


  let scoreD = resultData && resultData?.score ? resultData?.score.slice(0,resultData?.score.length - 1) : 0;


  const openNotificationsucess = (placement, msg) => {
    api.success({
      message: msg,
      placement,
    });
  };

  const openNotificationError = (placement, msg) => {
    api.error({
      message: msg,
      placement,
    });
  };


  const PersonalizedFeedback = async () => {
     
    const baseUrl = window.location.origin;

const dynamicUrl = `${baseUrl}/report/${id}`;


    var data = {
      "url": dynamicUrl,
    };
    var config = {
      method: 'post',
      url: `${BASE_URL}user/feedbackreport`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
      data: data
    };


    // if(response?.data?.code === 200 && response?.data?.success === true){


    axios(config)
      .then(function (response) {

        openNotificationsucess('top', response?.data?.data);



      })
      .catch(function (error) {


        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed") || (error?.response?.data?.error === "You are Unauthorized")) {
          localStorage.clear();
          window.location.reload();
        } else {

          openNotificationError('top', error?.response?.data?.error);


        }
      });






  };



  return (
    <>
    <Headers />
    {contextHolder}
    {resultData && Object.keys(resultData).length !== 0 ? <main className="container mx-w-6xl mx-auto py-4" style={{ minHeight: "80vh" }} >
    <Result
    status="success"
    title="Test Report Generated"
    subTitle={`Total Questions: ${resultData.questons.length} Questions`}
    extra={[
        <div className='mt-10 resultFlex justify-evenly'>
          <div className='text-center'>

              <Progress type="dashboard" percent={Number(scoreD)} />
        <p className="select-none mt-2 ml-2" style={{ fontSize: 15, textAlign:"center" }}><b>Score: </b>{resultData?.score ? resultData?.score : '0%'}</p>

        <Button style={{ backgroundColor: "#1677ff" }} onClick={PersonalizedFeedback} className='mt-5 ml-2 mb-14' type="primary" key="console">
        Click here for personalized test feedback
      </Button>
          </div>

          <div>
          {resultData?.mode && <p className="select-none mt-2 ml-2" style={{ fontSize: 15, textAlign:"left" }}><b>Mode: </b>{resultData?.mode ? resultData?.mode : "No Mode Found"}</p>}
          <p className="select-none mt-2 ml-2" style={{ fontSize: 15, textAlign:"left" }}><b>Total Correct Questions: </b>{resultData?.["Total Correct Questions"] ? resultData?.["Total Correct Questions"] : 0}</p>
          <p className="select-none mt-2 ml-2" style={{ fontSize: 15, textAlign:"left" }}><b>Total Incorrect Questions: </b>{resultData?.["Total Incorrect Questions"] ? resultData?.["Total Incorrect Questions"] : 0}</p>
          {/* {resultData?.["Total Incorrect Questions"] && <p className="select-none mt-2 ml-2" style={{ fontSize: 15, textAlign:"left" }}><b>Total Incorrect Questions: </b>{resultData?.["Total Incorrect Questions"] ? resultData?.["Total Incorrect Questions"] : 0}</p>} */}
        {resultData?.duration && <p className="select-none mt-2 ml-2" style={{ fontSize: 15, textAlign:"left" }}><b>Duration: </b>{resultData?.duration ? resultData?.duration : 0}</p>}

        {resultData?.remainingDuration && <p className="select-none mt-2 ml-2" style={{ fontSize: 15, textAlign:"left" }}><b>Remaining Duration: </b>{resultData?.remainingDuration ? resultData?.remainingDuration : 0}</p>}
        {resultData?.completeDuration && <p className="select-none mt-2 ml-2" style={{ fontSize: 15, textAlign:"left" }}><b>Complete Duration: </b>{resultData?.completeDuration ? resultData?.completeDuration : 0}</p>}
        {resultData?.status  && <p className="select-none mt-2 mb-14 ml-2" style={{ fontSize: 15, textAlign:"left" }}><b>Status: </b>{resultData?.status  ? resultData?.status : "No Status Found"}</p>}
        
          </div>

        </div>
        ,
     <Link to="/">

     <Button style={{ backgroundColor: "#1677ff" }} className='mt-5' type="primary" key="console">
        Go To Main Page
      </Button>
     </Link>
      ,
    ]}
  />

<Divider orientation="left">Questions: </Divider>
    {resultData && resultData?.questons && (resultData?.questons.length !== 0) ? resultData?.questons.map((result, keys) => (
        <div key={result?.uuid}>
          <h3 className={result?.isCorrect === true ? "select-none mt-10 ml-2 mb-5 text-green-500 font-semibold" : "select-none mt-10 ml-2 mb-5 text-red-400 font-semibold"} style={{ fontSize: 15 }}>
          <p className='text-lg'>{result?.isCorrect === true ? "Correct" : "Incorrect"}</p>
            <br />
            Q.{keys+1}  
            {result?.image && result.image !== null && result.image !== "" && <img className='my-2' src={result.image}/>}
             {result?.question}</h3>

          {/* <h4>User Selected Options:</h4> */}
          {result && result?.options && (result?.options.length !== 0) ? result?.options.map((option) => (
            // <div key={option?.optionId}>
            //   <input
            //     type="checkbox"
            //     checked={true}
            //     readOnly
            //   />
            //   <label>{option?.description}</label>
            // </div>


<div className="checkbox-wrapper-4 my-2 flex" key={option?.optionId}>

{(option?.istrue === true) &&(
          <span className="mt-1 ml-2 mr-2 text-green-600 flex align-center text-sm" style={{ fontSize: 20, display:"inline-block" }}>&#10003;</span>
          )}
{(option?.istrue === false) &&(
          <span className="mt-1 ml-2 mr-2  text-red-700 flex align-center text-sm" style={{ fontSize: 20, display:"inline-block" }}>&#10539;</span>
          )}



<input
  className="inp-cbx"
  type="checkbox"
  checked={option?.isUserSelected}
  readOnly
  id={option?.optionId}
/>
<label className="cbx" for={option?.optionId}>
  <span>
    <svg width="12px" height="10px">
      <use xlinkHref="#check-4"></use>
    </svg>
  </span>
  {option?.description && option?.description !== null && option?.description !== "" && <span style={{ fontSize: 15 }} className="ml-2">{option.description}</span>}
            <br />
            {option?.image && option?.image !== null && option?.image !== "" && <img src={option?.image} style={{borderRadius:6}} />}
</label>
<svg className="inline-svg">
  <symbol id="check-4" viewbox="0 0 12 10">
    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
  </symbol>
</svg>
</div>
          ))
          :
          <p>No Options Found</p>
        }





        
<p className="select-none mt-5 mb-10 ml-2" style={{ fontSize: 15 }}><b>Explanation: </b>
        {result?.explanationImg && result.explanationImg !== null && result.explanationImg !== "" && <img className='my-2' src={result.explanationImg}/>}

{result?.explanation && result?.explanation !== null ? result?.explanation.replace(/�/g, '') : "No Explanation Found"}</p>


<Divider plain>End Of Question {keys + 1}</Divider>
        </div>
      ))
      :
      <p>No Questions Found</p>
    }
</main>
:
<Spin className='mt-16' tip="Loading" size="large">
        <div className="content" />
      </Spin>
}
    </>
  )
}

export default Resultz