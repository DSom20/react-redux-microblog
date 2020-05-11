import {
  INITIALIZE_TITLES,
  UPDATE_VOTES,
  ADD_POST,
  DELETE_POST,
  EDIT_POST
} from './actionTypes';

function sortByVote(posts) {
  return posts.sort((a, b) => b.votes - a.votes);
}

function makeTitleFromPost({id, title, description, votes}) {
  return {id, title, description, votes};
}

// Takes several of the same actions that postReducer takes, since the action
// will hit all the reducers in the combined reducer. (Initially didn't take advantage
// of this, action creators call both, eg, addPost and addTitle, with actions therein
// of ADD_POST and ADD_TITLE)
function titleReducer(state = [], action) {

  switch (action.type) {
    case INITIALIZE_TITLES:
      return sortByVote([...action.titles]);

    case ADD_POST:
      return sortByVote([...state, makeTitleFromPost(action.post)]);

    case DELETE_POST:
      return state.filter(title => title.id !== action.postId);
    
    case EDIT_POST:
      return state.map(title => title.id === action.post.id
        ? makeTitleFromPost(action.post)
        : title);

    case UPDATE_VOTES:
      return sortByVote(state.map(
          title => title.id === action.id ? { ...title, votes: action.votes } : title));

    default:
      // console.warn("This action type is not valid", action.type);
      return state;
  }
}

export default titleReducer;