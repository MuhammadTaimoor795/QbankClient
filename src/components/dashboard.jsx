import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../variables/Endpoints';
import axios from 'axios';
import { Result, Spin, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const [api, contextHolder] = notification.useNotification();
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    let tokenMe = localStorage.getItem("accessTokenuser");
      const fetchData = async () => {
        var config = {
          method: 'get',
          url: `${BASE_URL}user/qbanks`,
          headers: { 
            'Authorization': `Bearer ${tokenMe && tokenMe}`
          },
        };
        axios(config)
        .then(function (response) {
          const data = response?.data?.data || [];
        
          // Sort the data by QBankName
          data.sort((a, b) => {
            const nameA = a.QBankName.toLowerCase();
            const nameB = b.QBankName.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
  
          // Sort the Tests array for each QBank
          data.forEach((item) => {
            item.Tests.sort((a, b) => {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });
          });
    setTableData(data);

            // setTableData(response?.data?.data);
            if(response?.data?.data.length === 0) {
            setLoading(true);
            }
        })
        .catch(function (error) {
          console.log(error);
          if(error?.response?.data?.error === "You are Unauthorized"){
            localStorage.clear();
            window.location.reload();
          }else{
            api['error']({
              message: error?.response?.data?.error,
                key: 'Error Message',
            });
            setLoading(true);
          }
        });
      };
      useEffect(() => {
        fetchData();
      }, []);
      const navigate = useNavigate();
  return (
      <main className="container mx-w-6xl mx-auto py-4" style={{minHeight:"78vh"}} >
        {contextHolder}
        <div className="flex flex-col space-y-8 mb-10">
        <h2 className="text-xs md:text-xl text-gray-700 font-bold tracking-wide md:tracking-wider mt-5">
                        Assigned Qbanks:</h2>
                {
                    tableData && (tableData.length !== 0) && 
                            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 px-4 xl:p-0 gap-y-4 md:gap-6">
{tableData.map((e,i)=>{
                        return(
                            <div key={e?.QBankName + i}
                            className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-800 flex flex-col justify-between">
                            <div className="flex flex-col">
                                <p className="text-white text-xl font-semibold">{e?.QBankName}</p>
                                <p className="mt-5 text-xs md:text-sm text-gray-50 font-semibold leading-tight max-w-sm">
                                   <b>Tests: </b>
                                   {
                            e?.Tests && (e?.Tests.length !== 0) &&
                            e?.Tests.map((e,key)=>{
                              return(
                                <p key={e?.name + key} className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                         {key+1}. {e?.name !== null ? e?.name : "Test not mentioned" }
                        </p>
                              )
                            })
                           
                          }
                                </p>
                                <p className="mt-5 text-xs md:text-sm text-gray-50 font-light leading-tight max-w-sm">
                                   <b className='font-semibold'>Description: </b>{e?.QBankDesc && e?.QBankDesc !== null ? e?.QBankDesc :"No Description Provided"}
                                </p>
                            </div>
                            <div className="flex justify-end items-end">
                                <button onClick={()=>navigate(`/qbank/${e?.QBankName}/${e?.QBankId}`)} 
                                    className="bg-blue-500 px-4 py-3 my-2 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                                    View Tests
                                </button>
                            </div>
                        </div>
                        )
                    })
                }
</div>
}
                {(!tableData || (tableData.length === 0)) && !loading &&
                <Spin tip="Loading" size="large">
                <div style={{ padding: 50,background: 'rgba(0, 0, 0, 0.05)',borderRadius: 4}} />
              </Spin>}
              {
                loading && <Result
                status="404"
                title="Sorry !"
                subTitle="No QBank assigned to you!"
              />
              }
        </div>
    </main>
  )
}
export default Dashboard