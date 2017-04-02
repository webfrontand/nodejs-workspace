import {
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE,
  LOCAL_REGISTER,
  LOCAL_REGISTER_SUCCESS,
  LOCAL_REGISTER_FAILURE
} from '../actions/types';
import update from 'react-addons-update';
import { handleActions } from 'redux-actions';

const initialize = {
    status: 'INIT',
    isLogin: false,
    user: {},
    error: ''
}

export default function check(state = initialize, action){
  switch(action.type){
    case CHECK:
      return update(state, {
        status: { $set: 'WAIT' },
        isLogin: { $set: true }
      });
    case CHECK_SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
        isLogin: { $set: true },
        user: { $set: action.user }
      });
    case CHECK_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
        isLogin: { $set: false },
        user: { $set: {} }
      });
    case LOCAL_REGISTER:
      return update(state, {
        status: { $set: 'WAIT' },
        isLogin: { $set: true }
      });
    case LOCAL_REGISTER_SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
        isLogin: { $set: true },
        user: { $set: action.user }
    });
    case LOCAL_REGISTER_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
        isLogin: { $set: false },
        error: { $set: action.error }
    });

    default:
      return state;
  }
}
