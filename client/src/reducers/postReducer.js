import {GET_POSTS_TAGS, ADD_POST,  CLEAR_POSTS, GET_POSTS, DELETE_POST, POST_LOADING, GET_POST, GET_MESSAGE, GET_TAGS} from '../actions/types';

const initialState = {
  posts: [],
    post: { comments: [],
      date: "",
      header: "",
      htmlText: "",
      likes: 0,
      postImage: [],
      tags: "",
      text: "",
      user: "",
      videoLink: "",
      views: 0,},
  loading: false,
    messages:[],
    tags:[]
};

export default function(state = initialState, action) {
    switch (action.type){
      case POST_LOADING:
        return {
          ...state,
          loading: true
        }
        case CLEAR_POSTS:
          return {
            ...state,
            posts:[]
        }
        case GET_TAGS:
          return {
            ...state,
            tags:action.payload,
          }
        case GET_MESSAGE:
          return {
            ...state,
            loading: false,
            messages:action.payload,
          }
        case GET_POSTS_TAGS:
          return {
            ...state,
            loading: false,
            posts: [...action.payload]
          }
      case GET_POSTS:
        return {
          ...state,
          posts: [...state.posts, ...action.payload],
          loading: false
        }
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== action.payload)
        };
      case GET_POST:
        return {
          ...state,
          post: action.payload,
          loading: false
        }
        default:
            return state;
    }
}