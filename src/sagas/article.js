import { put, takeLatest, call, select } from 'redux-saga/effects'

// TYPES
import * as fetchArticleTypes from '../actions/types/article';

// SERVICES
import { fetchArticle } from '../services/api'

// SELECTORS
import { getLmlToken } from '../selectors/auth'

export function* fetchArticleSaga (action) {
  try {
      const { id } = action.payload || {};
      const lmltk = yield select(getLmlToken)

      if (!id || !lmltk) return new Error('Param id or lmltk is missing');

      const response = yield call(fetchArticle, { lmltk, id });

      if (response && response.status === 200 && response.data) {
        yield put({ type: fetchArticleTypes.FETCH_ARTICLE_FROM_ID_SUCCESS, payload: response.data })
      }
  } catch (error) {
    yield put({ type: fetchArticleTypes.FETCH_ARTICLE_FROM_ID_FAILURE })
  }
}
