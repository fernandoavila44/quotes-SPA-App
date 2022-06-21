import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {

  const {sendRequest, status, error } = useHttp(addComment);
  const commentTextRef = useRef();
  const params = useParams();

  const { onAddedComment } = props;
  
  useEffect(() => {
    if(status === 'completed' && !error){
      onAddedComment();
    }
  }, [onAddedComment, status, error])
  

  const submitFormHandler = (event) => {
    event.preventDefault();

    const requestData = {
      quoteId: params.quoteid,
      commentData: commentTextRef.current.value
    }

    // optional: Could validate here

    sendRequest(requestData)
    // send comment to server

    commentTextRef.current.value = ''
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
    {status === 'pending' && (<div className='centered'>
      <LoadingSpinner/>
    </div>) }
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
