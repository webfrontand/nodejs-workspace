import {
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE
} from '../actions/types';
import update from 'react-addons-update';
import { handleActions } from 'redux-actions';

const initialize = {
  user: {
    status: 'INIT',
    checked: false,
    info: {}
  }
}

export default function user(state = initialize, action){
  switch(action.type){
    case CHECK:
      return update(state, {
        user: {
          status: { $set: 'WAIT' },
          checked: { $set: false }
        }
      });
    case CHECK_SUCCESS:
      return update(state, {
        user: {
          status: { $set: 'SUCCESS' },
          checked: { $set: true },
          info: { $set: action.info }
        }
      });
    case CHECK_FAILURE:
      return update(state, {
        user: {
          status: { $set: 'FAILURE' },
          checked: { $set: false },
          info: { $set: {} }
        }
      });
    default:
      return state;
  }
}
