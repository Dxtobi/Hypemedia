import { GET_MARKETS, SET_MARKET, SET_MARKETS } from '../actions/types';

const initialState = {
    products: [],
    product: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type){
      case SET_MARKETS:
        return {
          ...state,
            loading: false,
            products:action.payload
        }
        case SET_MARKET:
          return {
            ...state,
            loading: false
        }
      case GET_MARKETS:
        return {
          ...state,
          loading: true
            }
        default:
            return state;
    }
}