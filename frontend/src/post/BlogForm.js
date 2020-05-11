import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addPostToApi, editPostInApi } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import './BlogForm.css';


function BlogForm({ setInEditMode, post, postId }) {
  const INITIAL_STATE = post ?
    {
      title: post.title,
      description: post.description,
      body: post.body
    }
    :
    {
      title: '',
      description: '',
      body: ''
    };

  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(oldData => ({
      ...oldData,
      [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      if (post) {
        dispatch(editPostInApi(postId, formData));
        setInEditMode(false);
      } else {
        dispatch(addPostToApi(formData));
        history.push('/');
      }
    }
  }

  const isValid = Object.values(formData).every(val => val);

  return (
    <Container className="BlogForm">
      <h2>New Post</h2>
      <Form>
        <Form.Group >
          <Form.Label>Title: </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Description: </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter description / subtitle"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Body: </Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Enter the meaty core of your deepest ruminations"
            rows="5"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </Form.Group>
        <Button disabled={!isValid} onClick={handleSubmit}>Save</Button>
        <Button variant="secondary" onClick={() => history.push('/')} className="ml-2">Cancel</Button>
      </Form>
    </Container>
  )
}

export default BlogForm;