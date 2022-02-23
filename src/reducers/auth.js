// AUTH - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';

// TYPES
import * as AuthActionTypes from '../actions/types/auth';
import * as SessionActionTypes from '../actions/types/session';

export const initialState = {
  _id: null,
  createdAt: null,
  displayname: null,
  feedtype: null,
  gender: null,
  language: null,
  lmltk: null,
  picture: null,
  type: null,
};


export default function authenticationReducer (state = initialState, action) {
  switch (action.type) {
    case AuthActionTypes.LILIUM_TOKEN_REQUEST:
      return state
    case AuthActionTypes.LILIUM_TOKEN_REQUEST_SUCCESS:
      const newAuthState = action.payload || initialState
      return Object.assign({}, state, action.payload)
    case AuthActionTypes.LILIUM_TOKEN_REQUEST_FAILURE:
    case SessionActionTypes.DESTROY_SESSION_DATA_SUCCESS:
      return initialState
    default:
      return state
  }
}

