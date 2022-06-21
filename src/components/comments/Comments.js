import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, status, data: loadedComments} = useHttp(getAllComments, true);

  const params = useParams();

  useEffect(() => {
    sendRequest(params.quoteid)
  }, [sendRequest, params])
  
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(params.quoteid)
  }, [sendRequest, params.quoteid])

  let comments;

  if(status === 'pending'){
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if(status === 'completed' && (loadedComments || loadedComments.length > 0)){
    comments = <CommentsList comments={loadedComments}/>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className='centered'>No comments were added yet!</p>
  }


  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
