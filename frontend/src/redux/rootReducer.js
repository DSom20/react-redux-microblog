import { combineReducers } from 'redux';

import posts from './postReducer';
import titles from './titleReducer';
import errors from './errorReducer';

const rootReducer = combineReducers({
  posts,
  titles,
  errors
});

export default rootReducer;