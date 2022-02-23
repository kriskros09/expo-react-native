// FACEBOOK - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';
// TYPES
import * as facebookLoginTypes from '../actions/types/facebook';
import * as SessionActionTypes from '../actions/types/session';

export const initialState = {
  full_name: null,
  isFetching: false,
  picture: null,
  access_token: null,
};


export default function facebookLoginReducer (state = initialState, action) {
  switch (action.type) {
    case facebookLoginTypes.FACEBOOK_LOGIN_REQUEST:
      return {
        ...state,
        full_name: null,
        isFetching: true,
        picture: null,
        access_token: null,
      }
    case facebookLoginTypes.FACEBOOK_LOGIN_SUCCESS:
      return {
        ...state,
        //isFetching: false,
        access_token: action.payload.token
      }
    case facebookLoginTypes.FACEBOOK_LOGIN_FAILURE:
    case facebookLoginTypes.FACEBOOK_LOGIN_CANCEL:
    case SessionActionTypes.DESTROY_SESSION_DATA_SUCCESS:
      return initialState
    default:
      return state
  }
}
