import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import NotFound from '../NotFound'
import BlogForm from './BlogForm';
import Comments from '../comment/Comments';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostFromApi, getPostFromApi, voteForPost } from '../redux/actions';
import { Container, Card, CardDeck, Row } from 'react-bootstrap';
import './BlogPost.css';


function BlogPost() {
  const history = useHistory();
  const [inEditMode, setInEditMode] = useState(false);
  const [postNotFound, setPostNotFound] = useState(false);
  const [ranDispatch, setRanDispatch] = useState(false);
  const { postId } = useParams()
  let post = useSelector(st => st.posts[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    const runDispatch = async () => {
      console.log("in blogPost runDispatch")
      await dispatch(getPostFromApi(postId));
      console.log("in blogPost runDispatch after api call awaited")
      setRanDispatch(true);
    }

    if (!post && !ranDispatch) runDispatch();
    if (!post && ranDispatch) setPostNotFound(true);

  }, [ranDispatch, dispatch, post, postId]);


  const handleDelete = async () => {
    console.log("in handle delete")
    await dispatch(deletePostFromApi(+postId))
    console.log("in handle delete after awaited api")
    history.push('/');
  };

  const handleVote = (direction) => {
    dispatch(voteForPost(postId, direction));
  }

  if (postNotFound) return <NotFound />;
  // if (!post) return <p>Loading...</p>;

  return (
    <Container className="BlogPost">
      { !post ? 
          <p>Loading Post...</p> 
        : 
          inEditMode ?
            <BlogForm setInEditMode={setInEditMode} post={post} postId={postId} />
            :
            <>
            <div className="mb-4">
              <h2>{post.title}</h2>
              <h5 className="font-italic mb-4">{post.description}</h5>
              <p className="mb-4">{post.body}</p>
              <div className="d-flex">
                <Card className="p-2 flex-row justify-content-center align-items-center" style={{width: "90px"}}>
                  <div>
                    <i onClick={() => setInEditMode(true)} className=" text-primary fas fa-edit"></i>
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
            <hr/>
            <Comments postId={postId} comments={post.comments} />
            </>
      }
    </Container>
  );
}

export default BlogPost;