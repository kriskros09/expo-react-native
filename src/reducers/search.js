// SEARCH - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';
// TYPES
import * as fetchSearchTypes from '../actions/types/search';

export const initialState = {
  isFetching: false,
  posts: null,
};


export default function searchReducer (state = initialState, action) {
  switch (action.type) {
    case fetchSearchTypes.FETCH_SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case fetchSearchTypes.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload.posts
      }
    case fetchSearchTypes.FETCH_SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        posts: null,
      }
    case fetchSearchTypes.RESET_SEARCH_RESULTS:
      return {
        ...state,
        posts: null,
      }
    default:
      return state
  }
}
