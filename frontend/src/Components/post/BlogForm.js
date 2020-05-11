import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './BlogForm.css';


function BlogForm({ post, save, cancel }) {
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
      save(formData);
    }
  }

  const isValid = Object.values(formData).every(val => val);

  return (
    <Form className="BlogForm" onSubmit={handleSubmit}>
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
      <Button disabled={!isValid} type="submit">Save</Button>
      <Button variant="secondary" onClick={cancel} className="ml-2">Cancel</Button>
    </Form>
  )
}

export default BlogForm;