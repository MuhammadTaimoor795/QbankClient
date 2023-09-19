import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from './components/home';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import ForgetPassword from './components/forgetPassword';
import ChangePassword from './components/changePassword';
import Cookies from 'universal-cookie';
import { ToastContainer } from 'react-toastify';
import VerifyAccount from './components/verifyAccount';
import QBankTests from './components/QBankTests';
import Tests from './components/Tests';
import "./assets/css/style.css";
import "./assets/css/result.css";
import "./assets/css/home.css";
import "./assets/css/quiz.css";
import "./App.css";
import Resultz from './components/result';
import ReportTest from './components/ReportTest';
import TermsAndConditionsPage from './components/termsandcondition';

const root = ReactDOM.createRoot(document.getElementById('root'));
// export const store = createStore(rootReducer,applyMiddleware(ReduxThunk))


const Roots = () => {

  const cookies = new Cookies();



  let user = localStorage.getItem("accessTokenuser");





  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
    <Route path="/" element={user ? <Home/> : <SignIn />} />
    <Route path="/qbank/:qbankName/:id" element={user ? <QBankTests/> : <SignIn />} />
    <Route path="/startTest/:id/:testname/:duration/:mode" element={user ? <Tests/> : <SignIn />} />
    <Route path="/result/:id" element={user ? <Resultz /> : <SignIn />} />
    <Route path="/report/:id" element={user ? <ReportTest /> : <SignIn />} />

    <Route path="/terms-and-condition" element={<TermsAndConditionsPage />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <SignUp />} />
        <Route path="/forgetPassword" element={user ? <Navigate to="/" replace /> : <ForgetPassword />} />
        <Route index path="/user/resetpassword" element={user ? <Navigate to="/" replace /> : <ChangePassword />} />
        <Route index path="/user/verify" element={user ? <Navigate to="/" replace /> : <VerifyAccount />} />
        
    </Routes>
  </BrowserRouter>
  )

}



root.render(<Roots />, document.getElementById('root'));


