import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  //DELETE_POST,
  GET_POST,
  CLEAR_ERRORS,
  GET_POSTS_TAGS,
  GET_MESSAGE,
  ADD_MESSAGE,
  CLEAR_POSTS,
  GET_TAGS,
  RELATED_POST
} from './types';

export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload:res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const search = data => dispatch => {
  dispatch(setPostLoading());
  axios
      .get('/api/posts/search/'+data)
      .then(res =>
          dispatch({
              type: GET_POSTS,
              payload:res.data
          })
      )
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
};

export const getTags = data => dispatch => {
  
  axios
      .get('/api/posts/tags/')
      .then(res =>
          dispatch({
              type: GET_TAGS,
              payload:res.data
          })
      )
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err
          })
      );
};

export const getMessage = () => dispatch => {
  dispatch(clearErrors());
  axios
      .get('/api/posts/messages', )
      .then(res =>
          dispatch({
              type: GET_MESSAGE,
              payload:res.data
          })
      )
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
};

export const addMessage = message => dispatch => {
  dispatch(clearErrors());
  axios
      .post('/api/posts/messages', message)
      .then(res =>
          dispatch({
              type: ADD_MESSAGE,
              payload:res.data
          })
      )
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
};

export const getPosts = (skip) => dispatch => {

  dispatch(setPostLoading());

  axios
    .get(`/api/posts/${skip}`)
    .then(res => {
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const getPostsTagged = (skip, tag) => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/posts/tagged/${skip}/${tag}`)
    .then(res => {
        dispatch({
          type: GET_POSTS_TAGS,
          payload: res.data
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const getPost = id => dispatch => {

  dispatch(setPostLoading());

  axios
    .get(`/api/posts/one/${id}`)
    .then(res => {
     // console.log(res)
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch(getPosts(0))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPost(id)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getRelatedPost = (tagID, )  => dispatch => {
  
  console.log("hit related")
  axios
    .get(`/api/posts/related/${tagID}`)
    .then(res =>
      dispatch({
        type: RELATED_POST,
        payload:res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addComment = (postId, commentData)  => dispatch => {
  dispatch(setPostLoading());
  console.log("hit")
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload:res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteComment = (postId, commentId)  => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload:res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
export const clearPost = () => {
  return {
    type: CLEAR_POSTS
  }
}
