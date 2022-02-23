// ARTICLE - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';

export const getArticleTitle = (state) =>
  state.article &&
  state.article.details &&
  state.article.details.title || '';
export const getArticleDetails = (state) => state.article.details;
export const getArticleId = (state) =>
state.article &&
state.article.details &&
state.article.details.id || '';

export const isArticleDetailsFetching = state => state.article.isFetching

