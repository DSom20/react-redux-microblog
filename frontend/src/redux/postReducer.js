import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_VOTES
} from './actionTypes';

function postReducer(state = {}, action) {
  let updatedComments;

  switch (action.type) {
    case ADD_POST:
      return { ...state, [action.post.id]: action.post };

    case EDIT_POST:
      const updatedPost = { ...state[action.id], ...action.post };
      return { ...state, [action.id]: updatedPost }

    case DELETE_POST:
      // ({[action.id], ...updatedPosts}) = state;
      const updatedPosts = { ...state };
      delete updatedPosts[action.id];
      return updatedPosts;

    case ADD_COMMENT:
      updatedComments = [
        ...state[action.postId].comments,
        action.comment
      ];
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: updatedComments
        }
      }

    case DELETE_COMMENT:
      updatedComments = state[action.postId].comments.filter(
        comment => comment.id !== action.commentId
      );
      return {
        ...state,
        [action.postId]: { ...state[action.postId], comments: updatedComments }
      }

    case UPDATE_VOTES:
      // The if clause prevents a vote from the Home/titles page adding the post
      // to the store with solely a vote property. This would cause an error if then
      // try to go to that post display page because it would see the post exists
      // in the store and not try to fetch it from API, but it's an incomplete
      // data entry, which causes its properties to not display and even causes
      // the comment list to error out since it's trying to map over undefined
      // post.comments
      if (state[action.id]) {
        return {
          ...state,
          [action.id]: { ...state[action.id], votes: action.votes }
        };
      } else {
        return state;
      }


    default:
      // console.warn("This action type is not valid", action.type);
      return state;
  }
}

export default postReducer;