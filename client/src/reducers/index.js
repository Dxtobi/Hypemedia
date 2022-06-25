import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import statusReduces from './statusReduces';
import tradeReducer from './tradeReducer';
import market from './market';


export default combineReducers( {
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  requestStatus: statusReduces,
  trade: tradeReducer,
  market:market
} );
