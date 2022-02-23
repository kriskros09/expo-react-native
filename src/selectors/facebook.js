// FACEBOOK - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';


export const getAccessToken = (state) => state.facebook.access_token;
export const getIsAuthLoading = (state) => state.facebook.isFetching
