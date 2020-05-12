import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { voteForPost } from '../../redux/actions';
import Card from 'react-bootstrap/Card';
import './BlogPostCard.css';




function BlogPostCard({ id, title, description, votes, ...restOfProps }) {
  const dispatch = useDispatch();

  const handleVote = (direction) => {
    dispatch(voteForPost(id, direction));
  }

  // Should maybe use Col instead of div technically, but then have to mess more with margins...
  return (
    <div {...restOfProps} className="BlogPostCard-wrapper mb-4">
      <Card className="BlogPostCard h-100 text-left">
        <Card.Body className='position-relative'>
          <Link to={`/posts/${id}`} className="title d-inline-block mb-2 stretched-link">{title}</Link>
          <div className="font-italic">{description}</div>
        </Card.Body>
        <Card.Footer>
          <div className="voteWrapper">
            <span className="votes">{votes} Votes:</span>
            <i onClick={() => handleVote("up")} className="ml-3 text-success fas fa-thumbs-up"></i>
            <i onClick={() => handleVote("down")} className="ml-2 align-middle text-danger fas fa-thumbs-down"></i>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default BlogPostCard;