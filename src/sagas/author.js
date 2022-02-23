import { put, takeLatest, call, select } from 'redux-saga/effects'

// TYPES
import * as AuthorArticlesActionTypes from '../actions/types/author';

// SERVICES
import { fetchRelatedArticles } from '../services/api'

// SELECTORS
import { getLmlToken } from '../selectors/auth'

export function* fetchRelatedArticlesSaga (action) {
  try {
      const { id } = action.payload || {};
      const lmltk = yield select(getLmlToken)
      if (id && lmltk) {
        const response = yield call(fetchRelatedArticles, { id, lmltk });
        if (response && response.status && response.data) {
          yield put({ type: AuthorArticlesActionTypes.FETCH_RELATED_ARTICLES_FROM_ID_SUCCESS, payload: response.data })
        }
      }
  } catch (error) {
    yield put({ type: AuthorArticlesActionTypes.FETCH_RELATED_ARTICLES_FROM_ID_FAILURE })
  }
}
