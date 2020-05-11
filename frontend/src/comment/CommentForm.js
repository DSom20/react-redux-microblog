import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToApi } from '../Components/redux/actions';
import { Form, Button } from 'react-bootstrap';

function CommentForm ({ postId }) {
  const INITIAL_STATE = {text: ''};
  const [formData, setFormData] = useState(INITIAL_STATE);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFormData({text: value});
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formData.text) {
      dispatch(addCommentToApi(postId, formData.text))
      setFormData(INITIAL_STATE);
    }
  }

  // Noticed that with a single input form, if press enter while focused on
  // input, and have onSubmit on Form, it will submit, regardless of whether a
  // button exists. Multi-input forms dont seem to do this...
  // Also, the button wasn't triggering onSubmit. Had own onClick handler at first,
  // but that seems excessive/redundant. Found out explicitly setting type="submit"
  // works...
  return (
      <Form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="flex-grow-1" >
            <Form.Control 
            type="text"
            placeholder="New Comment"
            value={formData.text}
            onChange={handleChange}
            style={{borderBottomRightRadius: "0", borderTopRightRadius: "0"}}
            />
          </div>
          <div className="flex-grow-0">
            <Button type="submit" disabled={!formData.text} style={{borderBottomLeftRadius: "0", borderTopLeftRadius: "0"}}>Add</Button>
          </div>
        </div>
      </Form>
  )
}

export default CommentForm;