import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Row, Col, ListGroup } from 'react-bootstrap'

function Comments({ postId, comments }) {
  // const comments = useSelector(st => st.posts[postId].comments);

  const commentsListJSX = comments.map(
    comment => <Comment key={comment.id} comment={comment} postId={postId}/>
  );

  return (
    <div>
      <h2 className="mb-3">Comments</h2>
      <Row>
        <Col xs={12} lg={10} xl={9}>
          <ListGroup className="mb-3">
            {commentsListJSX}
          </ListGroup>
          <CommentForm postId={postId}/>
        </Col>
      </Row>
    </div>
  )
}

export default Comments;