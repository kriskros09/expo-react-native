// AUTHOR - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as AuthorArticlesActionTypes from '../actions/types/author';


  export function fetchAuthorArticlesRequest(id) {
    return {
      type: AuthorArticlesActionTypes.FETCH_RELATED_ARTICLES_FROM_ID_REQUEST,
      payload: id,
    }
  }
