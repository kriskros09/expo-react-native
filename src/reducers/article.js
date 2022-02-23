// ARTICLES - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';
// TYPES
import * as fetchArticleTypes from '../actions/types/article';

export const initialState = {
  details: null,
  isFetching: true,
};


export default function articleReducer (state = initialState, action) {
  switch (action.type) {
    case fetchArticleTypes.FETCH_ARTICLE_FROM_ID_REQUEST:
      return {
        ...state,
        details: null,
        isFetching: true
      }
    case fetchArticleTypes.FETCH_ARTICLE_FROM_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        details: action.payload
      }
    case fetchArticleTypes.FETCH_ARTICLE_FROM_ID_FAILURE:
      return {
        ...state,
        isFetching: false,
        details: null
      }
    default:
      return state
  }
}
