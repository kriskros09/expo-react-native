import { combineReducers } from 'redux';

// ACTIONS
import * as SessionActionTypes from '../actions/types/session';

import article from './article';
import articles from './articles';
import auth from './auth';
import facebook from './facebook';
import favorites from './favorites';
import google from './google';
import language from './language';
import preferences from './preferences';
import search from './search';
import author from './author';

const appReducer = combineReducers({
	article,
	articles,
	auth,
	author,
	facebook,
	favorites,
	google,
	language,
	preferences,
	search,
})

const initialState = appReducer({}, {})

export const rootReducer = (state, action) => {
  // if (action.type === SessionActionTypes.DESTROY_SESSION_DATA_SUCCESS) {
  //   state = initialState
  // }

  return appReducer(state, action)
}
