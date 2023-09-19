import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Button, Modal, Table, notification } from "antd";
import DraggableCalculator from "./draggableCalculator";
import { BsArrowLeft, BsArrowRight, BsStopFill, BsPower } from 'react-icons/bs';
import { BiTimer } from 'react-icons/bi';
import { BASE_URL } from "../variables/Endpoints";
import axios from "axios";
import InputField from "./fields/InputField";

function Tests() {
  const location = useLocation();
  let tokenMe = localStorage.getItem("accessTokenuser");
  const navigate = useNavigate();
  const { state } = location;
  const { id, testname, duration, mode } = useParams();
  const [quizData, setQuizData] = useState(state?.questions);
  const [feedbackInput, setFeedbackInput] = useState("")
  const [showExplanation, setShowExplanation] = useState(false);
  const [durationZ, setDurationZ] = useState(duration);
  const [durationValue, setDurationValue] = useState(0);
  const [isTimedTest, setIsTimedTest] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [submitExamLoading, setSubmitExamLoading] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const mergedOptions = quizData && quizData.length !== 0 && quizData.reduce((merged, data) => {
      return merged.concat(data.userSelectedOption);
    }, []);
    return mergedOptions;
  });
  const [showOptions, setShowOptions] = useState(false);
  const [showAnswerMessage, setShowAnswerMessage] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isEndModalVisible, setIsEndModalVisible] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [isSuspendModalVisible, setIsSuspendModalVisible] = useState(false);
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const handleRowClick = (record) => {
    setCurrentQuestion(Number(record?.questionNumber) - 1);
    setIsEndModalVisible(false);
    setIsSubmitModalVisible(false);
    setIsSuspendModalVisible(false);
    setShowReviewModal(false);
    setIsDurationModalVisible(false);
    setIsFeedbackModalVisible(false);
  };
  const columns = [
    {
      title: 'Question Number',
      dataIndex: 'questionNumber',
      key: 'questionNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Marked For Review',
      dataIndex: 'markedForReview',
      key: 'markedForReview',
    },
  ];
  const data = quizData.map((question, index) => {
    const selectedOptions1 = question.options.filter(option => selectedOptions.includes(option.id));
    const isAnswered = selectedOptions1.length > 0;
    return {
      key: question.uuid,
      questionNumber: index + 1,
      status: isAnswered ? 'Answered' : 'Not Answered',
      markedForReview: question && question?.markedForReview ? 'Yes' : 'No',
    };
  });
  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };
  const handleEndExam = () => {
    setIsEndModalVisible(true);
  };
  const handleSubmitExam = () => {
    setIsSubmitModalVisible(true);
  };
  const handleSuspendExam = () => {
    setIsSuspendModalVisible(true);
  };
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
  function captureKeys(event) {
    if (event.key === 'PrintScreen' || (event.ctrlKey && event.key === 'c')) {
      event.preventDefault();
      console.log('Screenshot capture prevented');
    }
  }
  document.addEventListener('keydown', captureKeys);
  const handleEndModalOk = () => {
    const responseArray = quizData && quizData.length !== 0 && quizData.map((question) => {
      if (!question) {
        return [];
      }
      const selectedOptionIds = selectedOptions.filter((optionId) =>
        question.options.some((option) => option.id === optionId)
      );
      const selectedOptionsData = question.options.filter((option) =>
        selectedOptionIds.includes(option.id)
      );
      const correctOptionIds = question.options
        .filter((option) => option?.istrue)
        .map((option) => option?.id);
      const selectedOptions1a = selectedOptionsData.map(option => option.id);
      const isAllCorrectOptionsSelected = correctOptionIds.every((optionId) =>
        selectedOptions1a.includes(optionId)
      );
      const isAllSelectedOptionsCorrect =
        correctOptionIds.length === selectedOptions1a.length && isAllCorrectOptionsSelected;
      return {
        uuid: question.uuid,
        optionid: selectedOptions1a.length > 0 ? selectedOptions1a : [],
        istrue: isAllSelectedOptionsCorrect
      };
    });
    const filteredData = responseArray && responseArray.length !== 0 ? responseArray.filter(item => item.optionid.length > 0) : [];
    let dataSubmit = {
      "questions": filteredData
    };
    var config = {
      method: 'post',
      url: `${BASE_URL}user/test/evulate`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
      data: dataSubmit
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data?.data));
        var datasa = {
          "usertestid": state?.usertestid,
          "timeleft": (remainingTime && remainingTime !== null) ? Number(remainingTime) / 60 : 0
        };
        var config = {
          method: 'patch',
          url: `${BASE_URL}user/test`,
          headers: {
            'Authorization': `Bearer ${tokenMe && tokenMe}`
          },
          data: datasa
        };
        axios(config)
          .then(function (response) {
            navigate('/', { replace: true });
          })
          .catch(function (error) {
            if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed") || (error?.response?.data?.error === "You are Unauthorized")) {
              localStorage.clear();
              window.location.reload();
            } else {
              openNotificationError('top', error?.response?.data?.error);
            }
            setIsEndModalVisible(false);
          });
      })
      .catch(function (error) {
        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed") || (error?.response?.data?.error === "You are Unauthorized")) {
          // setOpen(false);
          localStorage.clear();
          window.location.reload();
        } else {
          openNotificationError('top', error?.response?.data?.error);
        }
        setIsEndModalVisible(false);
      });
  };
  const handleSuspendModalOk = () => {
    
    let dataR = {
      "testid": id
    };
    let config = {
      method: 'patch',
      url: `${BASE_URL}user/test/reset`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
      data: dataR
    };
    axios(config)
      .then(function (response) {
        navigate('/', { replace: true });

      })
      .catch(function (error) {
        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed")) {
          localStorage.clear();
          navigate("/")
        } else {
          openNotificationError('top', error?.response?.data?.error);
        }
      });

    navigate('/', { replace: true });
    setIsSuspendModalVisible(false);
  };

  const handleDurationModalOk = async () => {
    setIsDurationModalVisible(false);
    var data = {
      "usertestid": state?.usertestid,
      "duration": durationValue,
    };
    var config = {
      method: 'post',
      url: `${BASE_URL}user/test/addtime`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        openNotificationsucess('top', 'Duration has been set successfully');
        console.log(response)
        setDurationZ(durationValue)
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
  const handleFeedbackModalOk = async () => {
    setIsFeedbackModalVisible(false);
    var data = {
      "questionid": quizData && quizData.length !== 0 && quizData[currentQuestion]?.questionId,
      "description": feedbackInput
    };
    var config = {
      method: 'post',
      url: `${BASE_URL}user/test/reportquestion`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        openNotificationsucess('top', 'Feedback Send Successfully!');
        console.log(response)
      })
      .catch(function (error) {
        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed") || (error?.response?.data?.error === "You are Unauthorized")) {
          localStorage.clear();
          window.location.reload();
        } else {
          openNotificationError('top', error?.response?.data?.error);
        }
      });
    setFeedbackInput("")
  };
  const handleModalCancel = () => {
    setIsEndModalVisible(false);
    setIsSubmitModalVisible(false);
    setIsSuspendModalVisible(false);
    setShowReviewModal(false);
    setIsDurationModalVisible(false);
    setIsFeedbackModalVisible(false);
    setFeedbackInput("")
    setDurationValue("")
  };
  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setShowOptions(false);
    setShowAnswerMessage(false);
    setShowExplanation(false);
    setIsDurationModalVisible(false);
    setIsFeedbackModalVisible(false);
  };
  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
    setShowOptions(false);
    setShowAnswerMessage(false);
    setShowExplanation(false);
    setIsDurationModalVisible(false);
    setIsFeedbackModalVisible(false);
  };
  const handleMarkForReview = (questionIndex) => {
    const updatedQuestions = [...quizData];
    updatedQuestions[questionIndex].markedForReview = !updatedQuestions[questionIndex]?.markedForReview;
    setQuizData(updatedQuestions);
  };
  const handleNavigatorButtonClick = () => {
    setShowReviewModal(true);
  };
  const handleOptionChange = (optionId) => {
    const selectedOptionIds = [...selectedOptions];
    const optionIndex = selectedOptionIds.indexOf(optionId);
    if (optionIndex > -1) {
      selectedOptionIds.splice(optionIndex, 1);
    } else {
      selectedOptionIds.push(optionId);
    }
    setSelectedOptions(selectedOptionIds);
    setShowAnswerMessage(false);
  };
  const handleSubmit = () => {
    setSubmitExamLoading(true);
    const responseArray = quizData && quizData.length !== 0 && quizData.map((question) => {
      if (!question) {
        return [];
      }
      const selectedOptionIds = selectedOptions.filter((optionId) =>
        question.options.some((option) => option.id === optionId)
      );
      const selectedOptionsData = question.options.filter((option) =>
        selectedOptionIds.includes(option.id)
      );
      const correctOptionIds = question.options
        .filter((option) => option?.istrue)
        .map((option) => option?.id);
      const selectedOptions1a = selectedOptionsData.map(option => option.id);
      const isAllCorrectOptionsSelected = correctOptionIds.every((optionId) =>
        selectedOptions1a.includes(optionId)
      );
      const isAllSelectedOptionsCorrect =
        correctOptionIds.length === selectedOptions1a.length && isAllCorrectOptionsSelected;
      return {
        uuid: question.uuid,
        optionid: selectedOptions1a.length > 0 ? selectedOptions1a : [],
        istrue: isAllSelectedOptionsCorrect
      };
    });
    let dataSubmit = {
      "questions": responseArray
    };
    var config = {
      method: 'post',
      url: `${BASE_URL}user/test/evulate`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
      data: dataSubmit
    };
    axios(config)
      .then(function (response) {
        var datasa = {
          "usertestid": state?.usertestid
        };
        var config = {
          method: 'patch',
          url: `${BASE_URL}user/test/complete`,
          headers: {
            'Authorization': `Bearer ${tokenMe && tokenMe}`
          },
          data: datasa
        };
        axios(config)
          .then(function (response) {
            openNotificationsucess('top', 'Test is Completed');
            setSubmitExamLoading(false)
            setTimeout(() => {
              navigate(`/result/${state?.usertestid}`, { state: response?.data?.data, replace: true });
            }, 2000)
          })
          .catch(function (error) {
            if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed") || (error?.response?.data?.error === "You are Unauthorized")) {
              // setOpen(false);
              localStorage.clear();
              window.location.reload();
            } else {
              openNotificationError('top', error?.response?.data?.error);
            }
            setSubmitExamLoading(false)
          });
      })
      .catch(function (error) {
        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed") || (error?.response?.data?.error === "You are Unauthorized")) {
          // setOpen(false);
          localStorage.clear();
          window.location.reload();
        } else {
          openNotificationError('top', error?.response?.data?.error);
        }
      });
  };
  const renderOptions = (options) => {
    return options.map((option) => (
      <div style={{ display: "flex" }}>
        {(modes === "TUTOR") && showExplanation && (option?.istrue === true) && (
          <span className="mt-4 ml-2 mr-2 text-green-600 flex align-center text-sm" style={{ fontSize: 20, display:"inline-block" }}>&#10003;</span>
        )}
        {(modes === "TUTOR") && showExplanation && (option?.istrue === false) && (
          <span className="mt-4 ml-2 mr-2 text-red-700 flex align-center text-sm" style={{ fontSize: 20, display:"inline-block" }}>&#10539;</span>
        )}
        <div className="checkbox-wrapper-4 my-2" style={{borderRadius:6,  display:"inline-block" }} key={option.id}>
          <input
            className="inp-cbx"
            id={option.id}
            type="checkbox"
            checked={selectedOptions.includes(option.id)}
            onChange={() => handleOptionChange(option.id)}
          />
          <label className="cbx" for={option.id}>
            <span>
              <svg width="12px" height="10px">
                <use xlinkHref="#check-4"></use>
              </svg>
            </span>
            {option?.name && option?.name !== null && option?.name !== "" && <span style={{ fontSize: 15 }} className="ml-2">{option.name}</span>}
            <br />
            {option?.image && option?.image !== null && option?.image !== "" && <img src={option?.image} style={{borderRadius:6}} />}
          </label>
          <svg className="inline-svg">
            <symbol id="check-4" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </symbol>
          </svg>
        </div>
      </div>
    ));
  };
  const checkAnswers = () => {
    const currentQuestiona = quizData && quizData.length !== 0 ? quizData[currentQuestion] : null;
    if (!currentQuestiona) {
      return;
    }
    const correctOptionIds = currentQuestiona.options
      .filter((option) => option.istrue)
      .map((option) => option.id);
    const selectedOptionIds = quizData && quizData.length !== 0 && quizData[currentQuestion].options.filter(option => selectedOptions.includes(option.id));
    const selectedOptions1a = selectedOptionIds.map(option => option.id);
    const isAllCorrectOptionsSelected = correctOptionIds.every((optionId) =>
      selectedOptions1a.includes(optionId)
    );
    const isAllSelectedOptionsCorrect =
      correctOptionIds.length === selectedOptions1a.length && isAllCorrectOptionsSelected;
    setAnswerCorrect(isAllSelectedOptionsCorrect)
    setShowAnswerMessage(true);
    // Hide the answer message after 5 seconds
    setTimeout(() => {
      setShowAnswerMessage(false);
    }, 5000);
  };
  const modes = mode;
  useEffect(() => {
    const durationInSeconds = durationZ * 60;
    setTotalSeconds(durationInSeconds);
    setRemainingTime(durationInSeconds);
    setIsTimedTest(durationInSeconds > 0);
  }, [durationZ]);
  // Update remaining time every second
  useEffect(() => {
    let timer;
    if (isTimedTest && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isTimedTest && remainingTime === 0) {
      handleSubmit(); // Trigger submit function when timer runs out
    }
    (isTimedTest && remainingTime <= 600) ? setIsErrorMessage(true) : setIsErrorMessage(false);
    return () => clearInterval(timer);
  }, [isTimedTest, remainingTime]);
  // Format remaining time in hours, minutes, and seconds
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default right-click behavior
  };
  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
  return (
    <>
      {contextHolder}
      <div onContextMenu={handleContextMenu} className="select-none progress-box flex justify-between items-center" style={{ flexDirection: "row", backgroundColor: "#0665a6", padding: 10, height:'56px' }}>
        <div className="select-none question-box" style={{ margin: "0px" }}>
          <div className="select-none question-text">
            <h4 className="select-none question" style={{ color: "#fff" }}>{testname}</h4>
          </div>
        </div>
        <div style={{ width: "220px" }}>
          {isTimedTest && <p className="select-none progress-big">Timer: {formatTime(remainingTime)}</p>}
          <p className="select-none progress-big">Question <b style={{ color: "peach" }}>{currentQuestion + 1}</b> of {quizData.length}</p>
        </div>
      </div>
      <div className="select-none progress-box flex justify-between items-center secondHeader" style={{ flexDirection: "row", backgroundColor: "#7eade3", padding: 8 }}>
        <div className="select-none question-box" style={{ margin: "0px" }}>
          <div className="select-none question-text">
            <h3 className="select-none question" style={{ color: "#fff" }}>
              <DraggableCalculator /> &nbsp; - &nbsp; <span onClick={() => { setIsFeedbackModalVisible(true); }} style={{ color: "#fff" }}>Feedback</span> </h3>
          </div>
        </div>
        {isErrorMessage ? (
          <div className="select-none message animation alertTimeout" >
            <div className="select-none icon">
              <i className="select-none bi bi-exclamation-triangle"></i>
            </div>
            <span>Your time is running out!</span>
          </div>
        ) : null}
        <div style={{ width: "290px" }} >
          <p className="select-none progress-big" >
            <span onClick={() => {
              setIsDurationModalVisible(true);
            }} style={{ color: "#fff" }}>Set Timer</span> &nbsp; - &nbsp;
            <span onClick={() => handleMarkForReview(currentQuestion)}
              style={{ cursor: "pointer" }}> {quizData[currentQuestion]?.markedForReview ? 'Unmark for Review' : 'Mark for Review'}
            </span>
          </p>
        </div>
      </div>
      <div className="select-none app-container " style={{ height: "auto" }}>
        {quizData && quizData.length !== 0 ? <div>
          <div>
            {quizData && quizData.length !== 0 && quizData[currentQuestion].image && quizData[currentQuestion].image !== null && quizData[currentQuestion].image !== "" && <img src={quizData[currentQuestion].image}/>}
            <h3 className="select-none question mt-10 ml-2" style={{ fontSize: 15 }}>
              {quizData && quizData.length !== 0 && quizData[currentQuestion].question}
            </h3>
            <form className="select-none my-8">
              {renderOptions(
                quizData && quizData.length !== 0 && quizData[currentQuestion].options
              )}
            </form>
          </div>
          <div className="mainClassFlex">
            {(modes === "TUTOR") && (
              <div className="select-none previous" style={{ width: "auto" }}>
                <button
                  onClick={() => checkAnswers()}
                  type="button"
                  style={{
                    backgroundColor: "#0665a6",
                    borderColor: "#0665a6",
                    boxShadow: "rgba(50, 50, 93, 0.15) 0px 13px 27px -5px, rgba(0, 0, 0, 0.15) 0px 8px 16px -8px",
                    fontSize: 15,
                    width:"230px"
                  }}
                  className="select-none next-btn"
                >
                  <div className="select-none icon" style={{ backgroundColor: "rgb(83 144 215)", borderColor: "rgb(83 144 215)" }}>
                    <i className="bi bi-check2-square"></i>      </div>
                  Check Answers
                </button>
              </div>
            )}
            {(modes === "TUTOR") && (
              <div className="select-none previous" style={{ width: "auto" }} >
                <button onClick={handleShowExplanation}
                  type="button"
                  style={{
                    backgroundColor: "#0665a6",
                    borderColor: "#0665a6",
                    boxShadow: "rgba(50, 50, 93, 0.15) 0px 13px 27px -5px, rgba(0, 0, 0, 0.15) 0px 8px 16px -8px",
                    fontSize: 15,
                    width:"230px"

                  }}
                  className="select-none next-btn shnbtn"
                >
                  <div className="select-none icon" style={{ backgroundColor: "rgb(83 144 215)", borderColor: "rgb(83 144 215)", }}>
                    <i className={showExplanation ? "bi bi-eye-slash" : "bi bi-eye"}></i>  </div>
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </button>
              </div>
            )}
            {(modes === "TUTOR") && showAnswerMessage && (
              <p className={answerCorrect && answerCorrect === true ? "correctClass mt-10 text-green-600 flex align-center text-sm" : "correctClass mt-10 text-red-700 flex align-center text-sm"}>{answerCorrect && answerCorrect === true ? "You are correct. Good job!" : "Incorrect. Try Again!"}</p>
            )}
          </div>
          {(modes === "TUTOR") && showExplanation && (
            <div className="mb-16 ml-2">
              {/* Render the explanation content */}
              <p className="select-none mt-10" style={{ fontSize: 15 }}><b>Explanation: </b>
              {quizData && quizData.length !== 0 && quizData[currentQuestion].explanationImg && quizData[currentQuestion].explanationImg !== null && quizData[currentQuestion].explanationImg !== "" && <img src={quizData[currentQuestion].explanationImg}/>}

              {quizData[currentQuestion]?.explanation && quizData[currentQuestion]?.explanation !== null ? quizData[currentQuestion]?.explanation.replace(/�/g, '') : "No Explanation Found"}</p>
            </div>
          )}
          <div className="select-none fixed bottom-0 left-0 w-full px-3 py-2 mt-16" style={{ backgroundColor: "#0665a6" }}>
            <div className="select-none flex justify-between items-center">
              <div style={{ flexDirection: "row", display: "flex" }}>
                <button onClick={handleEndExam} className="select-none newClassF text-center items-center text-sm mr-2 text-white">
                  <BsStopFill size={16} className="select-none mr-1" />
                  <p style={{ fontSize: 11 }}>End</p>
                </button>
                <p className="select-none text-white"> &nbsp; | &nbsp; </p>
                <button onClick={handleSuspendExam} className="select-none newClassF items-center text-sm text-white">
                  <BsPower size={16} className="select-none mr-1" />
                  <p style={{ fontSize: 11 }}>Suspend</p>
                </button>
              </div>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={currentQuestion === 0 ? "text-gray-300 newClassF items-center text-sm mr-2" : "newClassF items-center text-sm text-white mr-2"}>
                  <BsArrowLeft size={16} className="select-none mr-1" />
                  <p style={{ fontSize: 11 }}>Previous</p>
                </button>
                <p className="select-none text-white"> &nbsp; | &nbsp; </p>
                <button onClick={handleNavigatorButtonClick} className="select-none newClassF items-center text-sm text-white mr-2">
                  <BiTimer size={16} className="select-none mr-1" />
                  <p style={{ fontSize: 11 }}>Navigator</p>
                </button>
                <p className="select-none text-white"> &nbsp; | &nbsp; </p>
                {currentQuestion === quizData.length - 1 ?
                  <button disabled={currentQuestion !== quizData.length - 1} onClick={handleSubmitExam} className={currentQuestion !== quizData.length - 1 ? "text-gray-300 newClassFN items-center text-sm mr-2" : "newClassFN items-center text-sm text-white mr-2"}>
                    <p style={{ fontSize: 11 }}>Submit</p>
                    <BsArrowRight size={16} className="select-none ml-1" />
                  </button>
                  : <button onClick={handleNext} disabled={currentQuestion === quizData.length - 1} className={currentQuestion === quizData.length - 1 ? "text-gray-300 newClassFN items-center text-sm mr-2" : "newClassFN items-center text-sm text-white mr-2"}>
                    <p style={{ fontSize: 11 }}>Next</p>
                    <BsArrowRight size={16} className="select-none ml-1" />
                  </button>}
              </div>
            </div>
          </div>
          <Modal
            visible={showReviewModal}
            title="Review Questions"
            onCancel={handleModalCancel}
            footer={null}
          >
            <Table columns={columns}  pagination={{
        defaultPageSize: 10, // Number of items per page (initially)
        pageSizeOptions: ['10','25', '50','75', '100'], // Options for items per page dropdown
        showSizeChanger: true, // Show the items per page dropdown
        responsive: ['xs'], // Display pagination on mobile devices ('xs' screen size)
      }} 
      onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })} dataSource={data} />
          </Modal>
          <Modal
            title="End Exam"
            visible={isEndModalVisible}
            onOk={handleEndModalOk}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="submit" style={{ backgroundColor: "#1677ff" }} type="primary" onClick={handleEndModalOk}>
                End Exam
              </Button>,
            ]}
          >
            <p>Do you want to end this exam?</p>
            <p>You can come back and resume the previous test.</p>
          </Modal>
          <Modal
            title="Submit Exam"
            visible={isSubmitModalVisible}
            onOk={handleSubmit}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="submit" loading={submitExamLoading} style={{ backgroundColor: "#1677ff" }} type="primary" onClick={handleSubmit}>
                Submit Exam
              </Button>,
            ]}
          >
            <p>Do you want to submit and grade the test?</p>
          </Modal>
          {/* Modal for suspending exam */}
          <Modal
            title="Suspend Exam"
            visible={isSuspendModalVisible}
            onOk={handleSuspendModalOk}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="submit" style={{ backgroundColor: "red" }} type="primary" onClick={handleSuspendModalOk}>
                Suspend
              </Button>,
            ]}
          >
            <p>Are you sure you want to suspend this exam?</p>
            <p><b>NOTE: </b>You will <b>NOT</b> be able to resume the exam where you left off. You will have to start over.</p>
          </Modal>
          <Modal
            title="Duration Of Exam"
            visible={isDurationModalVisible}
            onOk={handleDurationModalOk}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="submit" style={{ backgroundColor: "#0665a6" }} type="primary" onClick={handleDurationModalOk}>
                Set Timer
              </Button>,
            ]}
          >
            <br />
            <InputField
              onChange={(e) => setDurationValue(e.target.value)}
              variant="qbanks"
              extra="mb-3"
              min={0}
              value={durationValue}
              label="Enter Duration: (Enter In Minutes)*"
              placeholder=""
              type="Number"
            />
          </Modal>
          <Modal
            title={`Feedback For Question No. ${Number(currentQuestion + 1)}`}
            visible={isFeedbackModalVisible}
            onOk={handleFeedbackModalOk}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="submit" style={{ backgroundColor: "#0665a6" }} type="primary" onClick={handleFeedbackModalOk}>
                Send Feedback
              </Button>,
            ]}
          >
            <br />
            <div>
              <label
                htmlFor="feedbackInput"
                className="text-sm text-navy-700 dark:text-white ml-3 font-bold"
              >
                Feedback*
              </label>
              <textarea
                onChange={(e) => setFeedbackInput(e.target.value)}
                variant="qbanksz"
                extra="mb-3"
                value={feedbackInput}
                placeholder="Enter Feedback"
                type="text"
                id="feedbackInput"
                rows="5"
                className="mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
              />
            </div>
          </Modal>
        </div>
          :
          <p>Sorry No Questions Found in Test</p>
        }
      </div>
    </>
  );
}
export default Tests;
