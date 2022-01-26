import  { SET_CURRENT_USER, ADMIN_GET_GLOBAL_INFO } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  global: {
    lastPost: null,
    posts: 0,
    site: null,
    users: 0,
    tags: [],
    admins:[]
  }
}

export default function( state = initialState, action ){
  switch( action.type ){
    case SET_CURRENT_USER:
      return{
          ...state,
          isAuthenticated: !isEmpty( action.payload ),
          user: action.payload
      }
      case ADMIN_GET_GLOBAL_INFO:
        return{
            ...state,
            global: action.payload
        }
    default:
      return state;
  }
}
