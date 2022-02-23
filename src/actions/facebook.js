// FACEBOOK - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as FacebookActionTypes from './types/facebook';


  export function FacebookLoginRequest() {
    return {
      type: FacebookActionTypes.FACEBOOK_LOGIN_REQUEST
    }
  }

  export function FacebookLoginSuccess() {
    return {
      type: FacebookActionTypes.FACEBOOK_LOGIN_SUCCESS
    }
  }

  export function FacebookLoginCancel() {
    return {
      type: FacebookActionTypes.FACEBOOK_LOGIN_CANCEL
    }
  }

  export function FacebookLoginFailure() {
    return {
      type: FacebookActionTypes.FACEBOOK_LOGIN_FAILURE
    }
  }
