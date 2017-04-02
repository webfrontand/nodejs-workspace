import {
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE
} from './types';
import * as services from '../services/checking';
import { browserHistory } from 'react-router';

export function checkLoginRequest(){
  return (dispatch) => {
    return services.checking().then((response) => {
      if(response.data.success){
        dispatch(checkSuccess(response.data.user));
        browserHistory.push('/myroom')
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

export function checkSuccess(user){
  return {
    type: CHECK_SUCCESS,
    user
  }
}

export function checkFailure(){
  return {
    type: CHECK_FAILURE
  }
}
