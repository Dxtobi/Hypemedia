import axios from 'axios';

import {
  GET_ERRORS,
  GET_MARKETS,
  SET_MARKET,
  SET_MARKETS,
 //SET_MARKETS,
} from './types';

export const addProduct = postData => dispatch => {
    let result = false
    dispatch({
        type: GET_MARKETS,
    })
    axios
        .post('/api/market', postData)
        .then(res =>{
            dispatch({
                type: SET_MARKET,
                payload: res.data
            });
            return result  = true
        }
            
        )
        .catch(err => {
            
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            return result = false
        });
        return result 
};

export const getProducts = skip => dispatch => {
    //let result = false
    dispatch({
        type: GET_MARKETS,
    })
    axios
    .get(`/api/market/products/${skip}`)
        .then(res => {
       // console.log(res.data)
        dispatch({
          type: SET_MARKETS,
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
  
  