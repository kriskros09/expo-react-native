// AUTH - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as AuthActionTypes from './types/auth';


  export function LiliumTokenRequest() {
    return {
      type: AuthActionTypes.LILIUM_TOKEN_REQUEST
    }
  }

  export function LiliumTokenRequestSuccess() {
    return {
      type: AuthActionTypes.LILIUM_TOKEN_REQUEST_SUCCESS
    }
  }

  export function LiliumTokenRequestFailure() {
    return {
      type: AuthActionTypes.LILIUM_TOKEN_REQUEST_FAILURE
    }
  }
