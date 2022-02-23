// GOOGLE - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as GoogleActionTypes from './types/google';


  export function GoogleLoginRequest() {
    return {
      type: GoogleActionTypes.GOOGLE_LOGIN_REQUEST
    }
  }

  export function GoogleLoginSuccess() {
    return {
      type: GoogleActionTypes.GOOGLE_LOGIN_SUCCESS
    }
  }

  export function GoogleLoginCancel() {
    return {
      type: GoogleActionTypes.GOOGLE_LOGIN_CANCEL
    }
  }

  export function GoogleLoginFailure() {
    return {
      type: GoogleActionTypes.GOOGLE_LOGIN_FAILURE
    }
  }
