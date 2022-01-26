import axios from 'axios';

import {  CLEAR_STATUS,  GET_ERRORS, STOP_GETTING_TRADES, CLEAR_ERRORS, GET_TRADE, GETTING_TRADES, GET_TRADES} from './types';

export const sellVCard =  (data, history) => dispatch => {
  //console.log(userData, history)
  dispatch({type:GETTING_TRADES})
  axios.post('/api/trade/sell_v_card', data)
   .then(res => {
      dispatch({
        type: GET_TRADE,
        payload: res.data
      })
     history.push('/transactions')
   } ) 
   .catch( err =>
      { dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      dispatch({
        type: STOP_GETTING_TRADES,
      })}
     );
};


export const buyFtt = (data) => dispatch => {
  console.log(data)
  dispatch({type:GETTING_TRADES})
  axios.post('/api/trade/buying_ftt', data)
   .then(res => {
      dispatch({
        type: GET_TRADE,
        payload: res.data
      })
   } )
   .catch( err =>
      { dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      dispatch({
        type: STOP_GETTING_TRADES,
      })}
     );
};


export const getAllCards =  () => dispatch => {
  //console.log(userData, history)
  dispatch({type:GETTING_TRADES})
  axios.get('/api/trade/get_all_cards')
    .then(res => {
     //console.log(res.data)
      dispatch({
        type: GET_TRADES,
        payload: res.data
      })
   } )
   .catch( err =>
      { dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      dispatch({
        type: STOP_GETTING_TRADES,
      })}
     );
};


export const clearErrors = () => dispatch => {

  dispatch({
    type: CLEAR_ERRORS,
  })
}

export const clearStatus = () => dispatch => {
  dispatch({
    type: CLEAR_STATUS,
  })
}

