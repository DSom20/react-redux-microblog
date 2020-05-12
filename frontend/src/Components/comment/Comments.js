import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Row, Col, ListGroup } from 'react-bootstrap';

function Comments({ postId, comments }) {

  const commentsListJSX = comments.map(
    comment => (
        <Comment key={comment.id} comment={comment} postId={postId}/>
    )
  );

  return (
    <div flipKey={comments.length} className="Comments">
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

/*
  Tried using react-flip-toolkit to cleanly animate component exiting then
other list items rearranging around it.
  Worked pretty well sometimes- when lower list items would move up. But
sometimes upper list items would come down, and it was janky. Part of the jank
was that the non-list elements on the page were not part of the flipper
transition, so they would see an empty layout space and transition down/up 
right away. Would feel weird to put the whole page in a Flipper...
  Other issue was that when adding comments, once you hit the point of the end
  of the page where you start to scroll, they randomly try to animate a reordering...
  Ended up just setting a timer for fadeout on the deleted element. And no 
  transition for replacing it- they just immediately takeover its spot when it
  dissapears.

  I thought this link would help: https://github.com/aholachek/react-flip-toolkit/issues/20. But not entirely.
*/