import { put, call, select } from 'redux-saga/effects'

// TYPES
import * as PreferencesActionTypes from '../actions/types/preferences'

// SERVICES
import { setPreferences } from '../services/api'

// SELECTORS
import { getPreferedFeedType, getPreferedLanguage } from '../selectors/preferences';
import { getLmlToken } from '../selectors/auth'

export function* SetPreferencesSaga (action) {
  try {
    const { type, value } = action.payload || {}

    if (type && value) {
      switch(type) {
        case 'language':
          yield put({ type: PreferencesActionTypes.SET_PREFERENCE_LANGUAGE, payload: {language: value} })
          break
        case 'feed':
          yield put({ type: PreferencesActionTypes.SET_PREFERENCE_FEED_TYPE, payload: {feed: value} })
          break
        case 'cities':
          yield put({ type: PreferencesActionTypes.SET_PREFERENCE_CITIES, payload: {cities: value} })
          break
        case 'interests':
          yield put({ type: PreferencesActionTypes.SET_PREFERENCE_INTERESTS, payload: {interests: value} })
          break
      }

      yield put({ type: PreferencesActionTypes.SET_PREFERENCE_DONE })
    }
  } catch (error) {
    // no error emit, reducer resets state as fallback
  }
}

export function* SavePreferencesSaga (action) {
  try {
    const feedType = yield select(getPreferedFeedType)
    const language = yield select(getPreferedLanguage)
    const lmltk = yield select(getLmlToken)

    const { preferences } = action.payload || {}

    if (feedType && language && preferences && lmltk) {
      // TODO: Check this again to emit succes action as api is down
      const response = yield call(setPreferences, {feedType, language, preferences, lmltk})
    }
  } catch (error) {
    yield put({ type: PreferencesActionTypes.SAVE_PREFERENCES_FAILURE, payload: error })
  }
}
