import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentFromApi } from '../redux/actions';
import { Card, ListGroup } from 'react-bootstrap';

function Comment({ comment, postId }) {
  const dispatch = useDispatch();
  const { id, text } = comment;

  return (
    <ListGroup.Item className="p-2">
      {/* <div className="d-inline-flex border border-light p-2"> */}
        <i onClick={() => dispatch(deleteCommentFromApi(postId, id))} className="text-warning fas fa-times"></i>
        <span>{text}</span>
      {/* </div> */}
    </ListGroup.Item>
  )
}

export default Comment;