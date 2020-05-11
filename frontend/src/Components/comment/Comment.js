import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentFromApi } from '../../redux/actions';
import ListGroup from 'react-bootstrap/ListGroup';

function Comment({ comment, postId }) {
  const dispatch = useDispatch();
  const { id, text } = comment;

  return (
    <ListGroup.Item className="p-2">
        <i onClick={() => dispatch(deleteCommentFromApi(postId, id))} className="align-bottom text-warning fas fa-times"></i>
        <span className="ml-3">{text}</span>
    </ListGroup.Item>
  )
}

export default Comment;