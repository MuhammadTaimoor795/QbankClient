import { Breadcrumb, Layout, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../variables/Endpoints';
import axios from 'axios';
import { Button, Modal } from 'antd';
import Headers from "./Header";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Tooltip, notification, Radio } from 'antd';
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const QBankTests = () => {
  const [isModalRemoveOpen, setisModalRemoveOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [mode, setmode] = useState("EXAM");
  const [loading, setLoading] = useState(false);
  const [testId, settestId] = useState("");
  const [openStartTestModal, setopenStartTestModal] = useState(false);
  const { qbankName, id } = useParams();
  const encodedId = encodeURIComponent(testId);
  const encodedmode = encodeURIComponent(mode);
  const navigate = useNavigate();

  const showQuestionModal = (id, name2) => {
    settestId(id);
    setSelectedValue(name2)
    setopenStartTestModal(true);
  };

  const ResumeQuestion = (id, name1, resetid) => {
    settestId(id);

    var config = {
      method: 'get',
      url: `${BASE_URL}user/test/resume/${id}`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(response);
        openNotificationsucess('top', 'Test is Resuming');
        setTimeout(() => {
          navigate(`/startTest/${resetid}/${name1}/${response.data.data.usertestdetail.remainingDuration ? response.data.data.usertestdetail.remainingDuration : response?.data.data.usertestdetail.duration}/${response?.data?.data?.usertestdetail?.mode}`, { state: response?.data?.data?.userquestions });
        }, 2000)
      })
      .catch(function (error) {
        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed")) {
          localStorage.clear();
          navigate("/auth/sign-in")
        } else {
          openNotificationError('top', error?.response?.data?.error);
        }
      });
  };
  const ReviewQuestion = (id, name1) => {
    settestId(id);
    var config = {
      method: 'get',
      url: `${BASE_URL}user/test/report/${id}`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
    };
    axios(config)
      .then(function (response) {
        // console.log(response);
        openNotificationsucess('top', 'Redirecting to Test Report');
        setTimeout(() => {
          navigate(`/report/${id}`);
        }, 2000)
      })
      .catch(function (error) {
        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed")) {
          localStorage.clear();
          navigate("/auth/sign-in")
        } else {
          openNotificationError('top', error?.response?.data?.error);
        }
      });
  };
  const ResetQuestion = (id) => {
    console.log(id)
    settestId(id);
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
        openNotificationsucess('top', 'Test status is reset');
        window.location.reload();
      })
      .catch(function (error) {
        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed")) {
          localStorage.clear();
          navigate("/")
        } else {
          openNotificationError('top', error?.response?.data?.error);
        }
      });
  };
  const handleOk = () => {
    setLoading(true);
    StartTestPost();
  };
  const [api, contextHolder] = notification.useNotification();
  const [tableData, setTableData] = useState([])
  let tokenMe = localStorage.getItem("accessTokenuser");
  const openNotificationsucess = (placement, msg) => {
    api.success({
      message: msg,
      placement,
    });
  };
  const openNotificationwarning = (placement, msg) => {
    api.warning({
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
  const StartTestPost = async () => {
    var data = {
      "testid": testId,
      "mode": mode,
    };
    var config = {
      method: 'post',
      url: `${BASE_URL}user/test`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        openNotificationsucess('top', 'Test is Starting');
        setisModalRemoveOpen(false);
        fetchData();
        setTimeout(() => {
          navigate(`/startTest/${encodedId}/${selectedValue}/0/${encodedmode}`, { state: response?.data?.data, replace: true });
        }, 2000)
        setLoading(false);
      })
      .catch(function (error) {
        if ((error?.response?.data?.error === "jwt expired") || (error?.response?.data?.error === "jwt malformed")) {
          setLoading(false);
          localStorage.clear();
          navigate("/auth/sign-in")
        } else {
          setLoading(false);
          openNotificationError('top', error?.response?.data?.error);
        }
      });
  };
  const fetchData = async () => {
    var config = {
      method: 'get',
      url: `${BASE_URL}user/qbanks/${id}`,
      headers: {
        'Authorization': `Bearer ${tokenMe && tokenMe}`
      },
    };
    axios(config)
      .then(function (response) {
        let dataAscSort = response?.data?.data.sort((a, b) => a?.name.localeCompare(b?.name));
        setTableData(dataAscSort);
      })
      .catch(function (error) {
        console.log(error);
        if (error?.response?.data?.error === "You are Unauthorized") {
          localStorage.clear();
          window.location.reload();
        } else {
          api['error']({
            message: error?.response?.data?.error,
            key: 'Success Message',
          });
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout>
      <Headers />
      {contextHolder}
      <Content
        className="site-layout"
        style={{
          padding: '0 5px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '26px 50px',
          }}
        >
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Qbank Test(s)</Breadcrumb.Item>
        </Breadcrumb>
        <main className="container mx-w-6xl mx-auto py-4" style={{ minHeight: "75vh" }} >
          <div className="flex flex-col space-y-8 mb-10">
            <div className="home">
              <section className="antialiased bg-gray-100 text-gray-600 px-4">
                <div className="flex flex-col justify-center h-full">
                  <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100">
                      <div className="intro-box" style={{ zIndex: 0 }}>
                        <div className="intro-texts">
                          <h1 className="intro-title">{qbankName ? qbankName : "NOT STARTED"} Tests</h1>
                          <p className="intro-description">Select the test you wish to practice.</p>
                        </div>
                      </div>
                    </header>
                    <div className="p-3">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                              <th className="p-2 whitespace-nowrap">
                                <div style={{ display: "flex", justifyContent: "center", borderRight: "1px solid #b0b8c6" }} className="font-semibold text-left">Test Name</div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div style={{ display: "flex", justifyContent: "center", borderRight: "1px solid #b0b8c6" }} className="font-semibold text-left">Description</div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div style={{ display: "flex", justifyContent: "center", borderRight: "1px solid #b0b8c6" }} className="font-semibold text-left">Status</div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div style={{ display: "flex", justifyContent: "center", borderRight: "1px solid #b0b8c6" }} className="font-semibold text-left">Reset</div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div style={{ display: "flex", justifyContent: "center", borderRight: "1px solid #b0b8c6" }} className="font-semibold text-left">Review</div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div style={{ display: "flex", justifyContent: "center" }} className="font-semibold text-center">Actions</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-sm divide-y divide-gray-100">
                            {tableData && tableData.length !== 0 && tableData.map((e, i) => {
                              return (
                                <tr key={e?.name + i}>
                                  <td className="p-2 whitespace-nowrap">
                                    <div style={{ display: "flex", justifyContent: "center" }} className="font-medium text-gray-800">{e?.name}</div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div style={{ display: "flex", justifyContent: "center" }} className="text-left">{e?.description ? e?.description : "No Description"}</div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="font-medium text-green-500" style={{ display: "flex", justifyContent: "center" }} >{e?.status ? e?.status : "NOT STARTED"}</div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap" >
                                    <div style={{ display: "flex", justifyContent: "center" }} className="font-medium text-green-500"><button className="level-link" style={{ outline: "none", backgroundColor: "rgba(255,0,0,0.6)", maxWidth: 110 }} onClick={() => ResetQuestion(e?.id)}>
                                      <i className="bi bi-x-circle"></i> Reset
                                    </button></div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div style={{ display: "flex", justifyContent: "center" }} className="font-medium text-green-500">
                                      <button className="level-link" style={{ outline: "none", backgroundColor: "rgba(115,65,110,0.6)", maxWidth: 110 }} onClick={() => { e?.status === "COMPLETED" ? ReviewQuestion(e?.usertestid, e?.name) : openNotificationwarning('top', 'Review Button is active once test is completed.') }}>
                                        <i className="bi bi-caret-right-fill"></i> Review
                                      </button></div>                                  </td>
                                  <td className="p-2 whitespace-nowrap flex justify-center">
                                    {(e?.status !== "INCOMPLETED" && e?.status !== "COMPLETED" && e?.status !== "PAUSE") ? (
                                      <Tooltip title="Start Test">
                                        <button className="level-link hover:bg-red-300" style={{ outline: "none", maxWidth: 150, backgroundColor: "rgba(50,255,50,0.9)" }} onClick={() => {
                                          showQuestionModal(e?.id, e?.name)
                                        }}>
                                          <i className="bi bi-caret-right-fill"></i> Start Test
                                        </button>
                                      </Tooltip>
                                    ) : (e?.status === "COMPLETED") ? (
                                      <Tooltip title="Reset Test">
                                        <button className="level-link" style={{ outline: "none", maxWidth: 150, backgroundColor: "rgba(255,0,0,0.6)" }} onClick={() => ResetQuestion(e?.id)}>
                                          <i className="bi bi-x-circle"></i> Reset Test
                                        </button>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Resume Test">
                                        <button className="level-link" style={{ outline: "none", maxWidth: 150, backgroundColor: "rgba(0,0,255,0.5)" }} onClick={() => {
                                          ResumeQuestion(e?.usertestid, e?.name, e?.id)
                                        }}>
                                          <i className="bi bi-skip-start-fill"></i> Resume Test
                                        </button>
                                      </Tooltip>
                                    )
                                    }
                                  </td>
                                </tr>
                              )
                            })
                            }
                          </tbody>
                        </table>
                        {(!tableData || tableData.length === 0) && <p className="flex justify-center my-14">
                          <Spin tip="Loading" size="large">
                            <div
                              style={{
                                padding: 50,
                                background: 'rgba(0, 0, 0, 0.05)',
                                borderRadius: 4,
                              }}
                            />
                          </Spin>
                        </p>}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Modal title="Start Test" footer={[
          <Button key="back" onClick={() => setopenStartTestModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" style={{ backgroundColor: "#1677ff" }} type="primary" loading={loading} onClick={() => handleOk()}>
            Start
          </Button>,
        ]}
          open={openStartTestModal} onCancel={() => setopenStartTestModal(false)}>
          <div className="my-10">
            <Radio.Group
              onChange={(e) => setmode(e.target.value)}
              value={mode}
              defaultValue="a"
              style={{
                marginTop: 16,
              }}
            >
              <Radio.Button value="EXAM">Exam Mode</Radio.Button>
              <Radio.Button value="TUTOR">Tutor Mode</Radio.Button>
            </Radio.Group>
          </div>
        </Modal>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          background: "#fff"
        }}
      >
        © QBank - <a href="mailto:info@ezlearningprep.com" style={{color:"rgb(6, 101, 166)", textDecoration:"underline"}}>info@ezlearningprep.com</a>
      </Footer>
    </Layout>
  );
};
export default QBankTests;