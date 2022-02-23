// AUTHOR - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';

// TYPES
import * as AuthorArticlesActionTypes from '../actions/types/author';

export const initialState = {
  related: null,
  isFetching: true,
};


export default function relatedArticlesReducer (state = initialState, action) {
  switch (action.type) {
    case AuthorArticlesActionTypes.FETCH_RELATED_ARTICLES_FROM_ID_REQUEST:
      return {
        ...state,
        related: null,
        isFetching: true
      }
    case AuthorArticlesActionTypes.FETCH_RELATED_ARTICLES_FROM_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        related: action.payload.posts
      }
    case AuthorArticlesActionTypes.FETCH_RELATED_ARTICLES_FROM_ID_FAILURE:
      return {
        ...state,
        isFetching: false,
        related: null
      }
    default:
      return state
  }
}
