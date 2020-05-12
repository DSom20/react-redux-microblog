import React, {useState, useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentFromApi } from '../../redux/actions';
import ListGroup from 'react-bootstrap/ListGroup';
import './Comment.css';

function Comment({ comment, postId, ...restOfProps }) {
  const [isExiting, setIsExiting] = useState(false);
  const timerId = useRef(null);
  const dispatch = useDispatch();
  const { id, text } = comment;

  useEffect(() => {
    if (isExiting) {
      timerId.current = setTimeout(() => (
        dispatch(deleteCommentFromApi(postId, id))
      ), 500);
    }
    return () => clearTimeout(timerId.current);
  }, [isExiting]);

  return (
    <ListGroup.Item className={`Comment p-2 ${isExiting ? "fadeOut" : ''}`} {...restOfProps} >
        <i onClick={() => setIsExiting(true)} className="align-bottom text-warning fas fa-times"></i>
        <span className="ml-3">{text}</span>
    </ListGroup.Item>
  )
}

export default Comment;