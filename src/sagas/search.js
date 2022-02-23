import { put, takeLatest, call, select } from 'redux-saga/effects'

// TYPES
import * as fetchSearchTypes from '../actions/types/search';

// SERVICES
import { fetchSearchResults } from '../services/api'

// SELECTORS
import { getLmlToken } from '../selectors/auth'

export function* fetchSearchSaga (action) {
  try {

    const { terms } = action.payload
    const lmltk = yield select(getLmlToken)

    if (terms && lmltk) {
      const response = yield call(fetchSearchResults, {lmltk, terms})

      if (response &&
          response.status &&
          response.status === 200 &&
          response.data &&
          response.data.posts
        ) {
          yield put({ type: fetchSearchTypes.FETCH_SEARCH_SUCCESS, payload: { posts: response.data.posts } })
        }
    }
  } catch (error) {
    yield put({ type: fetchSearchTypes.FETCH_SEARCH_FAILURE, payload: error })
  }
}
