import {
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE
} from './types';
import axios from 'axios';

export function checkLoginRequest(){
  return (dispatch) => {
    return axios.get('/check').then((response) => {
      if(response.data.check){
        dispatch(checkSuccess(response.data.check));
      } else {
        dispatch(checkFailure());
      }
    })
  }
}

export function check(){
  return {
    type: CHECK
  }
}

export function checkSuccess(info){
  return {
    type: CHECK_SUCCESS,
    info
  }
}

export function checkFailure(){
  return {
    type: CHECK_FAILURE
  }
}
