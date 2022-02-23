import { fork, takeEvery, takeLatest, all} from 'redux-saga/effects'

// TYPES
import * as AuthActionTypes from '../actions/types/auth';
import * as facebookLoginTypes from '../actions/types/facebook';
import * as FavoritesActionTypes from '../actions/types/favorites';
import * as fetchArticlesTypes from '../actions/types/articles';
import * as fetchArticleTypes from '../actions/types/article';
import * as fetchSearchTypes from '../actions/types/search';
import * as googleLoginTypes from '../actions/types/google';
import * as PreferencesActionTypes from '../actions/types/preferences';
import * as SearchActionTypes from '../actions/types/search';
import * as SessionActionTypes from '../actions/types/session';
import * as AuthorArticlesActionTypes from '../actions/types/author';

// SAGAS
import { FacebookLoginSaga } from './facebook';
import { fetchArticleSaga } from './article';
import { fetchArticlesSaga } from './articles';
import { fetchSearchSaga } from './search';
import { GetFavoritesSaga,  SetFavoriteSaga, DeleteFavoriteSaga } from './favorites';
import { GoogleLoginSaga } from './google';
import { RequestAuthTokenSaga, StateSyncWithServerSaga } from './auth';
import { SetPreferencesSaga, SavePreferencesSaga } from './preferences';
import { DeleteSessionDataSaga } from './session';
import { fetchRelatedArticlesSaga } from './author'


// ROOT SAGA
export default function* sagas() {
  yield all([
    takeLatest(AuthActionTypes.LILIUM_TOKEN_REQUEST, RequestAuthTokenSaga),
    takeLatest(facebookLoginTypes.FACEBOOK_LOGIN_REQUEST, FacebookLoginSaga),
    takeLatest(FavoritesActionTypes.DELETE_FAVORITES_REQUEST, DeleteFavoriteSaga),
    takeLatest(FavoritesActionTypes.GET_FAVORITES_REQUEST, GetFavoritesSaga),
    takeLatest(FavoritesActionTypes.SET_FAVORITES_REQUEST, SetFavoriteSaga),
    takeLatest(fetchArticlesTypes.FETCH_ARTICLES_REQUEST, fetchArticlesSaga),
    takeLatest(fetchArticleTypes.FETCH_ARTICLE_FROM_ID_REQUEST, fetchArticleSaga),
    takeLatest(googleLoginTypes.GOOGLE_LOGIN_REQUEST, GoogleLoginSaga),
    takeLatest(PreferencesActionTypes.SAVE_PREFERENCES_REQUEST, SavePreferencesSaga),
    takeLatest(PreferencesActionTypes.SET_PREFERENCE_REQUEST, SetPreferencesSaga),
    takeLatest(SearchActionTypes.FETCH_SEARCH_REQUEST, fetchSearchSaga),
    takeLatest(SessionActionTypes.DESTROY_SESSION_DATA_REQUEST, DeleteSessionDataSaga),
    takeLatest(AuthorArticlesActionTypes.FETCH_RELATED_ARTICLES_FROM_ID_REQUEST, fetchRelatedArticlesSaga),
    takeLatest(
      [
        AuthActionTypes.LILIUM_TOKEN_REQUEST_SUCCESS,
        'persist/REHYDRATE',
        FavoritesActionTypes.SET_FAVORITES_SUCCESS,
        FavoritesActionTypes.DELETE_FAVORITES_SUCCESS
      ],
      StateSyncWithServerSaga
    )
  ]);
}
