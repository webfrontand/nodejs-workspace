import {
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE
} from '../actions/types';
import update from 'react-addons-update';
import { handleActions } from 'redux-actions';

const initialize = {
    status: 'INIT',
    isLogin: false,
    user: {}
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
    default:
      return state;
  }
}
