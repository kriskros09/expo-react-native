// GOOGLE - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';
// TYPES
import * as GoogleLoginTypes from '../actions/types/google';
import * as SessionActionTypes from '../actions/types/session';

export const initialState = {
  full_name: null,
  isFetching: false,
  picture: null,
  access_token: null,
};


export default function GoogleLoginReducer (state = initialState, action) {
  switch (action.type) {
    case GoogleLoginTypes.GOOGLE_LOGIN_REQUEST:
      return {
        ...state,
        full_name: null,
        isFetching: true,
        picture: null,
        access_token: null,
      }
    case GoogleLoginTypes.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        access_token: action.payload.accessToken
      }
    case GoogleLoginTypes.GOOGLE_LOGIN_FAILURE:
    case GoogleLoginTypes.GOOGLE_LOGIN_CANCEL:
    case SessionActionTypes.DESTROY_SESSION_DATA_SUCCESS:
      return initialState
    default:
      return state
  }
}
