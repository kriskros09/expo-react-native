import { put, call, select } from 'redux-saga/effects'

// ACTIONS
import { GetFavoritesRequest } from '../actions/favorites';

// TYPES
import * as AuthActionTypes from '../actions/types/auth';

// SERVICES
import { getLiliumToken } from '../services/api'

// SELECTOR
import { getAccessToken, getLmlToken } from '../selectors/auth';
import { getFavorites } from '../selectors/favorites';

export function* RequestAuthTokenSaga () {
  try {
    const accessToken = yield select(getAccessToken);
    if (accessToken) {
      const response = yield call(getLiliumToken, accessToken);
      if (response && response.data && response.data.lmltk) {
        yield put({ type: AuthActionTypes.LILIUM_TOKEN_REQUEST_SUCCESS, payload: response.data })
      }

    }
  } catch (error) {
    yield put({ type: AuthActionTypes.LILIUM_TOKEN_REQUEST_FAILURE })
  }
}

export function* StateSyncWithServerSaga () {
  try {
    const lmltk = yield select(getLmlToken)

    if(lmltk) {
      // Listener to refetch favorites on certain events, see index file
      yield put(GetFavoritesRequest())
    }
  } catch (error) {

  }
}
