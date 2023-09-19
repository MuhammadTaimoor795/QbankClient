import axios from "axios";
import { login, main_url, register } from "./Endpoints"
import Cookies from 'universal-cookie';
import { toast } from "react-toastify";


export const Register = (data) => (dispach)=>{

  
  axios
  .post(main_url + register, data)
  .then(response => {
    if(response && response.status == 200){

      toast.success("User Created In Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toastStyle',
      });
      
          const cookies = new Cookies();
          cookies.set('user', response?.data, { path:"/", expires: new Date(Date.now()+86400000) });
window.location.href = "/"

    }

    else{
      toast.error(response && response.data && response.data.error && response.data.error.message , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toastStyle',
      });
    }

 
  })
  .catch(error => {
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      bodyClassName: 'toastStyle',
    });
  });




// fetch(main_url + register)
// .then((data)=>{
//   data.json()
//   .then((dataJson)=>{
   
//     return dispach({
//             type: "ADD_TODO",
//             data: dataJson,
//     })

//   }) 
// })
// .catch(err =>{
//   console.error(err)
// })

}


export const forgetpassword = (data) => (dispach)=>{

  
  axios
  .post(main_url + register, data)
  .then(response => {
    if(response && response.status == 200){

      toast.success("User Created In Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toastStyle',
      });
      
          const cookies = new Cookies();
          cookies.set('user', response?.data, { path:"/", expires: new Date(Date.now()+86400000) });
window.location.href = "/"

    }

    else{
      toast.error(response && response.data && response.data.error && response.data.error.message , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toastStyle',
      });
    }

 
  })
  .catch(error => {
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      bodyClassName: 'toastStyle',
    });
  });




// fetch(main_url + register)
// .then((data)=>{
//   data.json()
//   .then((dataJson)=>{
   
//     return dispach({
//             type: "ADD_TODO",
//             data: dataJson,
//     })

//   }) 
// })
// .catch(err =>{
//   console.error(err)
// })

}

export const Login = (data) => (dispach)=>{
  let PostData = {
    identifier: data && data.email,
    password: data && data.password,
  }
  
  axios
  .post(main_url + login, PostData)
  .then(response => {
    if(response && response.status == 200){

   if(data.check){
     const cookies = new Cookies();
     cookies.set('user', response?.data, { path:"/", expires: new Date(Date.now()+2592000000) });
    }else{
      const cookies = new Cookies();
      cookies.set('user', response?.data, { path:"/", expires: new Date(Date.now()+86400000) });

    }
window.location.href = "/"
toast.success("User Logged In Successfully!", {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  bodyClassName: 'toastStyle',
});
    }

    else{
      toast.error(response && response.data && response.data.error && response.data.error.message , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toastStyle',
      });
    }

 
  })
  .catch(error => {
    toast.error((error && error.response && error.response.data && error.response.data.error && error.response.data.error.message === "Invalid identifier or password" ? "Invalid Email or Password" : error.response.data.error.message), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  });



}

 