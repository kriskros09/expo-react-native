// PREFERENCES - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as PreferencesActionTypes from './types/preferences';

export function SetPreferencesRequest(type, value) {
  return {
    type: PreferencesActionTypes.SET_PREFERENCE_REQUEST,
    payload: { type, value }
  }
}

export function SetPreferencesLanguage() {
  return {
    type: PreferencesActionTypes.SET_PREFERENCE_LANGUAGE
  }
}

export function SetPreferencesFeedType() {
  return {
    type: PreferencesActionTypes.SET_PREFERENCE_FEED_TYPE
  }
}

export function SetPreferencesCities() {
  return {
    type: PreferencesActionTypes.SET_PREFERENCE_CITIES
  }
}

export function SetPreferencesInterests() {
  return {
    type: PreferencesActionTypes.SET_PREFERENCE_INTERESTS
  }
}

export function SetPreferencesDone() {
  return {
    type: PreferencesActionTypes.SET_PREFERENCE_DONE
  }
}

export function SavePreferencesRequest(preferences) {
  return {
    type: PreferencesActionTypes.SAVE_PREFERENCES_REQUEST,
    payload: { preferences },
  }
}

export function SavePreferencesSuccess() {
  return {
    type: PreferencesActionTypes.SAVE_PREFERENCES_SUCCESS,
  }
}

export function SavePreferencesFailure() {
  return {
    type: PreferencesActionTypes.SAVE_PREFERENCES_FAILURE,
  }
}
