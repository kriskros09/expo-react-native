// ARTICLE - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as ArticleActionTypes from './types/article';


  export function fetchArticleRequest(id) {
    return {
      type: ArticleActionTypes.FETCH_ARTICLE_FROM_ID_REQUEST,
      payload: id,
    }
  }

  export function fetchArticleSuccess() {
    return {
      type: ArticleActionTypes.FETCH_ARTICLE_FROM_ID_SUCCESS
    }
  }

  export function fetchArticleFailure() {
    return {
      type: ArticleActionTypes.FETCH_ARTICLE_FROM_ID_FAILURE
    }
  }
