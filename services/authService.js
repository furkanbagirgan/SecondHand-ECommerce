import axios, { axiosURL } from '../constants/axios';

export const setLoginService = async (email,password) => {
	return await axios.post(axiosURL.login,{
    identifier:`${email}`,
    password:`${password}`
  }).then((res) => {
      return res.status;
    }).catch((err) => {
      return err.response.status;
    });
};

export const setRegisterService = async (email,password) => {
	return await axios.post(axiosURL.register,{
    username:`${email}`,
    email:`${email}`,
    password:`${password}`
  }).then((res) => {
      return res.status;
    }).catch((err) => {
      if(err.response.data.message[0].messages[0].message==="Email is already taken."){
        return 402;
      }else{
        return 400;
      }
    });
};