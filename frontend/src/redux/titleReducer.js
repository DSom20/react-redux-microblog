import {
  INITIALIZE_TITLES,
  ADD_TITLE,
  EDIT_TITLE,
  DELETE_TITLE,
  UPDATE_VOTES
} from './actionTypes';


function titleReducer(state = [], action) {

  switch (action.type) {
    case INITIALIZE_TITLES:
      return action.titles;

    case ADD_TITLE:
      return [...state, action.title];

    case EDIT_TITLE:
      return state.map(title => (
        title.id === action.title.id ? action.title : title
      ));

    case DELETE_TITLE:
      return state.filter(title => title.id !== action.id);

    case UPDATE_VOTES:
      return state.map(title => (
        title.id === action.id ? { ...title, votes: action.votes } : title
      ));

    default:
      console.warn("This action type is not valid", action.type);
      return state;
  }
}

export default titleReducer;