import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_USER_DETAILS,
  PROFILE_LOADING_STOP,
  GET_TRANSACTION
} from '../actions/types';

const initialState = {
  profile: {},
  profiles: {},
  transaction:[],
  loading: false
};

export default function( state = initialState, action ){
  switch( action.type ){
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading:  false
      }
    case GET_PROFILES:
      return{
        ...state,
        profiles: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: {}
      }
    case GET_USER_DETAILS:
      return {
          ...state,
        profiles: action.payload,
        loading: false
      }
    case PROFILE_LOADING_STOP:
      return {
        ...state,
        loading: false
      }
    case GET_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
        loading: false
        }
    default:
      return state;
  }
}
