import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import NotFound from '../main/NotFound'
import BlogForm from './BlogForm';
import Comments from '../../comment/Comments';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostFromApi, getPostFromApi, voteForPost } from '../redux/actions';
import { Container, Card } from 'react-bootstrap';
import './BlogPost.css';


function BlogPost() {
  const history = useHistory();
  const [inEditMode, setInEditMode] = useState(false);
  const [postNotFound, setPostNotFound] = useState(false);
  const [ranDispatch, setRanDispatch] = useState(false);
  const { postId } = useParams()
  let post = useSelector(st => st.posts[postId]);
  const dispatch = useDispatch();
  // console.log({ranDispatch})
  // console.log({post})

  // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  // Above error getting triggered when try to delete blog post, prior to adding
  // "mounted" logic. If had initially loaded post from redux and not from api call,
  // then if you delete it, the dispatch(deletePostFromApi(+postId)) will cause 
  // a state change and component rerender BEFORE the history.push('/') gets run
  // (need to look into event loop...history.push is inside async function, thus 
  // maybe takes a back seat? microtasks vs macrotasks?). Anyway, now there's 
  // no post in redux, so !store is true, and we never ranDispatch in the first place,
  // so useEffect triggers runDispatch, which sets off an async data fetch. At
  // the end of that data fetch, we setRanDispatch -> changes state of this component.
  // BUT, by then history.push('/') has ran and the component has unmounted, hence
  // the console warning React gave me.
  // So, can fix it with the mounted variable as shown. Could also redo the
  // ranDispatch logic probably. See https://www.debuggr.io/react-update-unmounted-component/
  useEffect(() => {
    let mounted = true;
    const runDispatch = async () => {
      // console.log("in blogPost runDispatch")
      await dispatch(getPostFromApi(+postId));
      // console.log("in blogPost runDispatch after api call awaited");
      if (mounted) {
        setRanDispatch(true);
      }
    }

    if (!post && !ranDispatch) runDispatch();
    if (!post && ranDispatch) setPostNotFound(true);

    return () => mounted = false;

  }, [ranDispatch, dispatch, post, postId]);


  const handleDelete = async () => {
    // console.log("in handle delete")
    await dispatch(deletePostFromApi(+postId))
    // console.log("in handle delete after awaited api")
    history.push('/');
  };

  const handleVote = (direction) => {
    dispatch(voteForPost(+postId, direction));
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