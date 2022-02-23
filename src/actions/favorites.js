// FAVORITES - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as FavoritesActionTypes from './types/favorites';

export function GetFavoritesRequest() {
  return {
    type: FavoritesActionTypes.GET_FAVORITES_REQUEST,
  }
}

export function SetFavoritesRequest(id) {
  return {
    type: FavoritesActionTypes.SET_FAVORITES_REQUEST,
    payload: { cid: id }
  }
}

export function DeleteFavoritesRequest(id) {
  return {
    type: FavoritesActionTypes.DELETE_FAVORITES_REQUEST,
    payload: { cid: id }
  }
}
