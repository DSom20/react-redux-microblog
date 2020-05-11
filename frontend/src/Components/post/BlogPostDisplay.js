import React from 'react';
import Card from 'react-bootstrap/Card'

function BlogPostDisplay({ post, toggleEdit, handleVote, handleDelete }) {
  return (
    <div className="mb-4">
      <h2>{post.title}</h2>
      <h5 className="font-italic mb-4">{post.description}</h5>
      <p className="mb-4">{post.body}</p>
      <div className="d-flex">
        <Card className="p-2 flex-row justify-content-center align-items-center" style={{width: "90px"}}>
          <div>
            <i onClick={toggleEdit} className=" text-primary fas fa-edit"></i>
            <i onClick={handleDelete} className="ml-3 text-warning fas fa-times"></i>
          </div>
        </Card>
        <Card className="ml-4 p-2 flex-row justify-content-center align-items-center">
          <span>{post.votes} Votes:</span>
          <i onClick={() => handleVote("up")} className="ml-3 mt-n2 text-success fas fa-thumbs-up"></i>
          <i onClick={() => handleVote("down")} className="ml-3 mt-2 align-bottom text-danger fas fa-thumbs-down"></i>
        </Card>
      </div>
    </div>
  );
}

export default BlogPostDisplay;