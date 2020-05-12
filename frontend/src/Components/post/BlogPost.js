import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import NotFound from '../main/NotFound'
import BlogForm from './BlogForm';
import Comments from '../comment/Comments';
import BlogPostDisplay from './BlogPostDisplay';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostFromApi, getPostFromApi, voteForPost, editPostInApi } from '../../redux/actions';
import Container from 'react-bootstrap/Container';
import './BlogPost.css';


function BlogPost() {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [postNotFound, setPostNotFound] = useState(false);
  const [ranDispatch, setRanDispatch] = useState(false);
  // Caused hidden bugs in reducer comparing int Id to string Id if don't convert postId to number here
  const postId = Number(useParams().postId);  
  let post = useSelector(st => st.posts[postId]);
  const dispatch = useDispatch();

  function toggleEdit() {
    setIsEditing(edit => !edit);
  }
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
  // So, can fix it with the mounted variable as shown. If component gets unmounted
  // before the api request is done, then the cleanup fx will run and set mounted=false,
  // which will prevent the runDispathc fx from running setRanDispatch once api request
  // finishes. See https://www.debuggr.io/react-update-unmounted-component/
  // Really...should just redo the ranDispatch logic probably. 
  useEffect(() => {
    let mounted = true;
    const runDispatch = async () => {
      // console.log("in blogPost runDispatch")
      await dispatch(getPostFromApi(postId));
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
    await dispatch(deletePostFromApi(postId))
    // console.log("in handle delete after awaited api")
    history.push('/');
  };

  const handleVote = (direction) => {
    dispatch(voteForPost(postId, direction));
  }

  const edit = ({title, description, body}) => {
    dispatch(editPostInApi(post.id, {title, description, body}));
    toggleEdit();
  }

  if (postNotFound) return <NotFound />;

  return (
    <Container className="BlogPost">
      { !post ? 
          <p>Loading Post...</p> 
        : 
          <>
          { isEditing ?
              <BlogForm save={edit} cancel={toggleEdit} post={post} />
            :
              <BlogPostDisplay post={post} toggleEdit={toggleEdit} 
                handleVote={handleVote} handleDelete={handleDelete}/>
          }
          <hr/>
          <Comments postId={postId} comments={post.comments} />
          </>
      }
    </Container>
  );
}

export default BlogPost;