import {CLEAR_STATUS, SET_STATUS} from '../actions/types';

const initialState = { };

export default function( state = initialState, action ){
  switch( action.type ){
    case SET_STATUS:
        return action.payload;
    case CLEAR_STATUS:
        return {};
    default:
      return state;
  }
}
