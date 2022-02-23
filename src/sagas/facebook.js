import { put, call } from 'redux-saga/effects'

// TYPES
import * as FacebookActionTypes from '../actions/types/facebook';
import * as AuthActionTypes from '../actions/types/auth';

// SERVICES
import { facebookLogin } from '../services/facebook';

export function* FacebookLoginSaga () {
  try {
      const response = yield call(facebookLogin);
      if (response) {
        if (response.type && response.type === 'cancel') {
          yield put({ type: FacebookActionTypes.FACEBOOK_LOGIN_CANCEL })
        }

        if (response.type && response.type === 'success' && response.token) {
          yield put({ type: FacebookActionTypes.FACEBOOK_LOGIN_SUCCESS, payload: response })
          yield put({ type: AuthActionTypes.LILIUM_TOKEN_REQUEST, payload: response })
        }
      }
  } catch (error) {
    yield put({ type: FacebookActionTypes.FACEBOOK_LOGIN_FAILURE })
  }
}
