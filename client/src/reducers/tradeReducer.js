import {STOP_GETTING_TRADES, GETTING_TRADES, GET_TRADE, GET_TRADES } from '../actions/types';

const initialState = {
    trades: [],
    trade: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type){
      case STOP_GETTING_TRADES:
        return {
          ...state,
          loading: false
        }
      case GETTING_TRADES:
        return {
          ...state,
          loading: true
            }
      case GET_TRADE:
        return {
            ...state,
            trade: action.payload,
            loading: false
            }
      case GET_TRADES:
        return {
            ...state,
            trades: action.payload,
            loading: false
        }
        default:
            return state;
    }
}