import {
  INITIALIZE_TITLES,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_VOTES,
  ADD_ERROR,
  // RESET_ERRORS
} from './actionTypes';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";


// Error to watch out for:
// postId and commentId are stored as numbers, but when I'm grabbing postId
// from component to send into a dispatch, I get it through useParams. Should
// coerce to number all the time...
// the deleteTitle() action as part of deletePostFromApi was actually deleting
// the title from the store because of this bug

export function getPostFromApi(id) {
  return async dispatch => {
    try {
      const post = (await axios.get(`${BASE_URL}/posts/${id}`)).data;
      dispatch(addPost(post));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function getTitlesFromApi() {
  return async dispatch => {
    try {
      const titles = (await axios.get(`${BASE_URL}/posts`)).data;
      dispatch(initializeTitles(titles));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function addPostToApi(postData) {
  return async dispatch => {
    try {
      // API endpoint does NOT return [] for comments
      const postResponse = (await axios.post(`${BASE_URL}/posts`, postData)).data;
      const post = {...postResponse, comments: []};
      dispatch(addPost(post));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function editPostInApi(id, postData) {
  return async dispatch => {
    try {
      // API endpoint DOES return comments, even [] if none yet
      const post = (await axios.put(`${BASE_URL}/posts/${id}`, postData)).data;
      dispatch(editPost(id, post));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function deletePostFromApi(id) {
  return async dispatch => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`);
      dispatch(deletePost(id));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function addCommentToApi(postId, text) {
  return async dispatch => {
    try {
      const comment = (await axios.post(`${BASE_URL}/posts/${postId}/comments`, {text})).data;
      dispatch(addComment(postId, comment));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function deleteCommentFromApi(postId, commentId) {
  return async dispatch => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`);
      dispatch(deleteComment(postId, commentId));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function voteForPost(id, direction) {
  return async dispatch => {
    try {
      const { votes } = (await axios.post(`${BASE_URL}/posts/${id}/vote/${direction}`)).data;
      dispatch(updateVotes(id, votes));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

function updateVotes(id, votes) {
  return {
    type: UPDATE_VOTES,
    id,
    votes
  }
}

function initializeTitles(titles) {
  return {
    type: INITIALIZE_TITLES,
    titles
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

function editPost(id, post) {
  return {
    type: EDIT_POST,
    post,
    id
  }
}

function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

function addComment(postId, comment) {
  return {
    type: ADD_COMMENT,
    postId,
    comment
  }
}

function deleteComment(postId, commentId) {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  }
}

function addError(msg) {
  return {
    type: ADD_ERROR,
    msg
  }
}

// function resetErrors() {
//   return {
//     type: RESET_ERRORS,
//   }
// }

