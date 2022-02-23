// ARTICLES - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as ArticlesActionTypes from './types/articles';


  export function fetchArticlesRequest() {
    return {
      type: ArticlesActionTypes.FETCH_ARTICLES_REQUEST
    }
  }

  export function fetchArticlesSuccess() {
    return {
      type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS
    }
  }

  export function fetchArticlesFailure() {
    return {
      type: ArticlesActionTypes.FETCH_ARTICLES_FAILURE
    }
  }
