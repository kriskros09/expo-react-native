// USER - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';

export const getProfileName = (state) => state.auth.displayName;
export const getProfilePicture = (state) => state.auth.picture;
