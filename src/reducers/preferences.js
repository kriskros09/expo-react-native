// PREFERENCES - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';
// TYPES
import * as PreferencesActionTypes from '../actions/types/preferences';
import * as SessionActionTypes from '../actions/types/session';

export const initialState = {
  cities: null,
  feedType: null,
  interests: null,
  isLoading: false,
  language: null,
};


export default function preferencesReducer (state = initialState, action) {
  switch (action.type) {
    case PreferencesActionTypes.SET_PREFERENCE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case PreferencesActionTypes.SET_PREFERENCE_LANGUAGE:
      return {
        ...state,
        language: action.payload.language,
      }
    case PreferencesActionTypes.SET_PREFERENCE_FEED_TYPE:
      return {
        ...state,
        feedType: action.payload.feed,
      }
    case PreferencesActionTypes.SET_PREFERENCE_CITIES:
    return {
      ...state,
      cities: action.payload.cities,
    }
    case PreferencesActionTypes.SET_PREFERENCE_INTERESTS:
    return {
      ...state,
      interests: action.payload.interests,
    }
    case PreferencesActionTypes.SET_PREFERENCE_DONE:
      return {
        ...state,
        isLoading: false,
      }
    case SessionActionTypes.DESTROY_SESSION_DATA_SUCCESS:
      return initialState
    default:
      return state
  }
}
