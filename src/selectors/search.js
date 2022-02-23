// SEARCH - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';

export const getSearchResults = (state) => state.search.posts;
