import {
  LOCAL_REGISTER,
  LOCAL_REGISTER_SUCCESS,
  LOCAL_REGISTER_FAILURE
} from './types';
import request from '../helpers/request';
import * as services from '../services/register';

export function localRegisterRequest(params){
  return (dispatch) => {
    dispatch(localRegister())
    return services.register(params).then((response) => {
      if(!response.data.success){
        console.log(response.data.err.message);
        dispatch(localRegisterFailure(response.data.err.message))
      } else {
        dispatch(localRegisterSuccess(response.data.user));
      }
    })
  }
}


export function localRegister(){
  return {
    type: LOCAL_REGISTER
  }
}

export function localRegisterSuccess(user){
  return {
    type: LOCAL_REGISTER_SUCCESS,
    user
  }
}

export function localRegisterFailure(error){
  return {
    type: LOCAL_REGISTER_FAILURE,
    error
  }
}
