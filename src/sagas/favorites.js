import { put, call, select } from 'redux-saga/effects'

// TYPES
import * as FavoritesActionTypes from '../actions/types/favorites'

// SERVICES
import { fetchFavorites, deleteFavorite, saveFavorite } from '../services/api'

// SELECTORS
import { getLmlToken } from '../selectors/auth'

export function* GetFavoritesSaga () {
  try {
    const lmltk = yield select(getLmlToken)

    if (lmltk) {
      const response = yield call(fetchFavorites, {lmltk})

      if (response && response.status && response.status === 200) {
        yield put({ type: FavoritesActionTypes.GET_FAVORITES_SUCCESS, payload: {posts: response.data.posts} })
      }
    }
  } catch (error) {
    yield put({ type: FavoritesActionTypes.GET_FAVORITES_FAILURE, payload: error })
  }

}

export function* SetFavoriteSaga (action) {
  try {
    const lmltk = yield select(getLmlToken)
    const { cid } = action.payload;

    if (lmltk && cid) {
      const response = yield call(saveFavorite, {lmltk, cid})

      if (response && response.status && response.status === 200) {
        yield put({ type: FavoritesActionTypes.SET_FAVORITES_SUCCESS })
      }
    }

  } catch (error) {
    yield put({ type: FavoritesActionTypes.SET_FAVORITES_FAILURE, payload: error })
  }
}

export function* DeleteFavoriteSaga (action) {
  try {
    const lmltk = yield select(getLmlToken)
    const { cid } = action.payload;

    if (lmltk && cid) {
      const response = yield call(deleteFavorite, {lmltk, cid})

      if (response && response.status && response.status === 200) {
        yield put({ type: FavoritesActionTypes.DELETE_FAVORITES_SUCCESS })
      }

    }
  } catch (error) {
    yield put({ type: FavoritesActionTypes.DELETE_FAVORITES_FAILURE, payload: error })
  }

}
