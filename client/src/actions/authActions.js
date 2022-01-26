import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {  GET_USER_DETAILS, CLEAR_STATUS, ADMIN_GET_GLOBAL_INFO, GET_ERRORS, SET_CURRENT_USER,PROFILE_LOADING, CLEAR_ERRORS, GET_PROFILE, SET_STATUS } from './types';

export const getGlobalInfo = () => dispatch => {
  //console.log('hit getGlobalInfo()')
  dispatch({type:PROFILE_LOADING})
  axios.get('/api/users/admin/get_all_info')
   .then(res => {
      dispatch({
        type: ADMIN_GET_GLOBAL_INFO,
        payload: res.data
      })
   } )
   .catch( err =>
      { dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
     );
};



 export const getProfileId = (id) => dispatch => {
  dispatch({type:PROFILE_LOADING})
  axios
    .get( '/api/users/get_profile_id/'+id)
    .then(res => {
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data
      })
      dispatch({
        type: SET_STATUS,
        payload: res.status
      })
    })
    .catch(err => {
     // console.log(err.response.data)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
};


export const registerUser = (userData, history) => dispatch => {
  //console.log(userData, history)
  axios
    .post( '/api/users/register', userData )
    .then(res => { //console.log(res)
      history.push('/login')
    })
    .catch(err => {
      console.log(err.response.data)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
};

export const loginUser = (userData) => dispatch => {
  console.log(userData)
  axios
    .post('/api/users/login', userData)
    .then(res => {
      console.log(res)
      //Save to localStorage
      dispatch(setAuth(res))

    })
    .catch( err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const creatTags = ( tag ) => dispatch => {
  axios
    .post('/api/users/admin/tag', tag)
    .then(res => {
     // console.log(res)
     dispatch(getGlobalInfo())
    })
    .catch(err =>{
      console.log(err.response.data)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};
export const deleteTags = ( tagid ) => dispatch => {
  axios
    .delete('/api/users/admin/tag/'+tagid, tagid)
    .then(res => {
      console.log(res)
      dispatch(getGlobalInfo())

    })
    .catch(err =>{
      console.log(err.response.data)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

export const changePassword = ( userData ) => dispatch => {
  axios
    .post('/api/users/change_password', userData)
    .then(res => {
      dispatch(setAuth(res))
      dispatch({
        type: SET_STATUS,
        payload: res.status
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.user
      })

    })
    .catch( err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem( 'blogerman' );
  // Remove auth header for future requests
  setAuthToken( false );
  // Set the current user to {} which will set isAuthenticated to false
  dispatch( setCurrentUser( { } ) );
}
export const clearErrors = () => dispatch => {
  //console.log('cleard')
  dispatch({
    type: CLEAR_ERRORS,
  })
}

export const clearStatus = () => dispatch => {
  dispatch({
    type: CLEAR_STATUS,
  })
}

export const setAuth = (res) => dispatch => {
  const { token } = res.data;
      //Set token to localStorage
      localStorage.setItem('blogerman', token );
      //Set token to Auth header
      setAuthToken( token );
      //Decode token to get user data
      const decoded = jwt_decode( token );
      //Set current user
      dispatch( setCurrentUser( decoded ) );
}