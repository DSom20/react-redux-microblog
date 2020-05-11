import {
  ADD_ERROR,
  // RESET_ERRORS
} from './actionTypes';

function errorReducer(state = [], action) {
  switch (action.type) {

    case ADD_ERROR:
      console.error(action.msg);
      return state

    // case RESET_ERRORS:
    //   return [];

    default:
      return state;
  }
}

export default errorReducer;