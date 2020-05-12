import React from 'react';
import { Card, Popover, OverlayTrigger, Button } from 'react-bootstrap';

function BlogPostDisplay({ post, toggleEdit, handleVote, handleDelete }) {
  const popoverToConfirmDelete = (
    <Popover id="popover-delete">
      <Popover.Title>Do you REALLY want to delete this blog post?</Popover.Title>
      <Popover.Content className="text-center">
        <Button onClick={handleDelete}>Yes, DELETE!</Button>
      </Popover.Content>
    </Popover>
  )
  return (
    <div className="mb-4">
      <h2>{post.title}</h2>
      <h5 className="font-italic mb-4">{post.description}</h5>
      <p className="mb-4">{post.body}</p>
      <div className="d-flex">
        <Card className="p-2 flex-row justify-content-center align-items-center" style={{width: "90px"}}>
          <div>
            <i onClick={toggleEdit} className=" text-primary fas fa-edit"></i>
            <OverlayTrigger rootClose trigger="click" placement="right" overlay={popoverToConfirmDelete}>
              <i className="ml-3 text-warning fas fa-times"></i>
            </OverlayTrigger>
          </div>
        </Card>
        <Card className="ml-4 px-3 py-2 flex-row justify-content-center align-items-center">
          <span>{post.votes} Votes:</span>
          <i onClick={() => handleVote("up")} className="ml-2 mt-n2 text-success fas fa-thumbs-up"></i>
          <i onClick={() => handleVote("down")} className="ml-2 mt-2 align-bottom text-danger fas fa-thumbs-down"></i>
        </Card>
      </div>
    </div>
  );
}

export default BlogPostDisplay;