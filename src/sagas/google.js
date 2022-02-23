import { put, call } from 'redux-saga/effects'

// TYPES
import * as GoogleActionTypes from '../actions/types/google';
import * as AuthActionTypes from '../actions/types/auth';

// SERVICES
import { googleLogin } from '../services/google'

export function* GoogleLoginSaga () {
  try {
      const response = yield call(googleLogin);
      if (response) {
        if (response.type && response.type === 'cancel') {
          yield put({ type: GoogleActionTypes.GOOGLE_LOGIN_CANCEL })
        }

        if (response.type && response.type === 'success' && response.accessToken) {
          yield put({ type: GoogleActionTypes.GOOGLE_LOGIN_SUCCESS, payload: response })
          yield put({ type: AuthActionTypes.LILIUM_TOKEN_REQUEST, payload: response })
        }
      }
  } catch (error) {
    yield put({ type: GoogleActionTypes.GOOGLE_LOGIN_FAILURE })
  }
}
