// AUTHENTICATION - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';

export const getFaceBookAccessToken = (state) => state.facebook.access_token;
export const getGoogleAccessToken = (state) => state.google.access_token;
export const isFacebookAuthFetching = state => state.facebook.isFetching
export const isGoogleAuthFetching = state => state.google.isFetching
export const getLmlToken = (state) => state.auth.lmltk;

export const getAccessToken = createSelector(
  getFaceBookAccessToken,
  getGoogleAccessToken,
  (facebookToken, googleToken) =>
  facebookToken || googleToken || null,
);

export const getLoggedIn = (state) => {
  return state.auth._id &&
  state.auth._id !== null &&
  state.auth.lmltk &&
  state.auth.lmltk !== null ? true : false;
}

export const getIsAuthenticated = state => state.auth.isAuthenticated

export const getDisplayName = (state) => state.auth.displayname;
export const getProfilePicture = (state) => state.auth.picture;

export const getIsAuthFetching = createSelector(
  isFacebookAuthFetching,
  isGoogleAuthFetching,
  (isFacebookFetching, isGoogleFetching) => isFacebookFetching || isGoogleFetching
)
