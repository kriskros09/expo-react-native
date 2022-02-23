import { put, takeLatest, call } from 'redux-saga/effects'

// TYPES
import * as featArticlesTypes from '../actions/types/articles';

// SERVICES
import { fetchArticles } from '../services/api'

export function* fetchArticlesSaga (action) {
  try {
    const payload = yield call(fetchArticles);

    yield put({ type: featArticlesTypes.FETCH_ARTICLES_SUCCESS, payload })
  } catch (error) {
    yield put({ type: featArticlesTypes.FETCH_ARTICLES_FAILURE })
  }
}
