// AUTHOR - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';

export const getRelatedArticles = (state) => state.author.related
export const isRelatedArticlesFetching = state => state.author.isFetching
