// PREFERENCES - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';

// CONSTANTS
import { cities } from '../constants/cities';
import { interests } from '../constants/interests';

export const getIsPreferencesLoading = (state) => state.preferences.isLoading;
export const getPreferedLanguage = (state) => state.preferences.language;
export const getPreferedCities = (state) => state.preferences.cities;
export const getPreferedInterests = (state) => state.preferences.interests;
export const getPreferedFeedType = (state) => state.preferences.feedType;

export const getAvailableCities = createSelector(
  getPreferedLanguage,
  (language) => {

    let availableCities = [];

    if (language === 'all') {
      Object.keys(cities).forEach(lang => {
        cities[lang].forEach(city => availableCities.push(city))
      });
    } else {
      availableCities = cities[language];
    }
    return availableCities;
  }
);

export const getAvailableInterests = createSelector(
  getPreferedLanguage,
  (language) => {
    let availableInterests = [];
    if(language === 'all') {
      Object.keys(interests).forEach(lang => {
        interests[lang].forEach(interest => availableInterests.push(interest))
      });
    } else {
      availableInterests = interests[language];
    }
    return availableInterests;
  }
);

export const getHasPreferences = (state) =>
  state.preferences &&
  state.preferences.cities &&
  state.preferences.cities.length > 0 &&
  state.preferences.interests &&
  state.preferences.interests.length > 0 ?
  true :
  false;

export const getPreferences = state => state.preferences
