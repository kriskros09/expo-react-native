// ARTICLES - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';
// TYPES
import * as fetchArticlesTypes from '../actions/types/articles';

export const initialState = {
  results: null,
  isFetching: false,
};


export default function articlesReducer (state = initialState, action) {
  switch (action.type) {
    case fetchArticlesTypes.FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        results: null,
        isFetching: true
      }
    case fetchArticlesTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.payload.data
      }
    case fetchArticlesTypes.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        results: null
      }
    default:
      return state
  }
}
