import { put, call, select } from 'redux-saga/effects'
import { purgeStoredState } from 'redux-persist'

import { persistConfig } from '../store';

// TYPES
import * as SessionActionTypes from '../actions/types/session';

// SERVICES
import { deleteSessionAndData } from '../services/api'

// SELECTOR
import { getLmlToken } from '../selectors/auth';

export function* DeleteSessionDataSaga () {
  try {
    const lmltk = yield select(getLmlToken);
    if (lmltk) {
      const response = yield call(deleteSessionAndData, {lmltk});

      if (response && response.data && response.data.deleted) {

        yield put({ type: SessionActionTypes.DESTROY_SESSION_DATA_SUCCESS })
      }

    }
  } catch (error) {
    yield put({ type: SessionActionTypes.DESTROY_SESSION_DATA_FAILURE, payload: error })
  }
}
