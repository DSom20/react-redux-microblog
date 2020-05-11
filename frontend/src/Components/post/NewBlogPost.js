import React from 'react';
import Container from 'react-bootstrap/Container'
import BlogForm from './BlogForm';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPostToApi } from '../../redux/actions';



function NewBlogPost(props) {
  const history = useHistory();
  const dispatch = useDispatch();


  function add({ title, description, body }) {
    dispatch(addPostToApi({title, description, body}));
    history.push("/");
  };

  function cancel() {
    history.push("/");
  };

  return (
    <Container className="BlogForm">
      <h2>New Post</h2>
      <BlogForm save={add} cancel={cancel}/>
    </Container>
  );
}

export default NewBlogPost;