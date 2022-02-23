// GOOGLE - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';


export const getAccessToken = (state) => state.google.access_token;
