// SEARCH - ACTIONS
// =============================================================================
import { createAction } from 'redux-actions';

import * as SearchActionTypes from './types/search';


  export function fetchSearchRequest(terms) {
    return {
      type: SearchActionTypes.FETCH_SEARCH_REQUEST,
      payload: {terms},
    }
  }

  export function fetchSearchSuccess() {
    return {
      type: SearchActionTypes.FETCH_SEARCH_SUCCESS
    }
  }

  export function fetchSearchFailure() {
    return {
      type: SearchActionTypes.FETCH_SEARCH_FAILURE
    }
  }

  export function resetSearchResults() {
    return {
      type: SearchActionTypes.RESET_SEARCH_RESULTS
    }
  }
