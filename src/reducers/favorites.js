// FAVORITES - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';
// TYPES
import * as FavoritesActionTypes from '../actions/types/favorites';

export const initialState = {
  posts: null,
  isFetching: true,
};


export default function favoritesReducer (state = initialState, action) {
  switch (action.type) {
    case FavoritesActionTypes.GET_FAVORITES_REQUEST:
    case FavoritesActionTypes.SET_FAVORITES_REQUEST:
    case FavoritesActionTypes.DELETE_FAVORITES_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FavoritesActionTypes.GET_FAVORITES_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        isFetching: false,
      }
    case FavoritesActionTypes.GET_FAVORITES_FAILURE:
      return {
        ...state,
        articleIds: null,
        isFetching: false,
      }
    default:
      return state
  }
}
