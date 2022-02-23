// FAVORITES - SELECTORS
// =============================================================================
import { createSelector } from 'reselect';

// CONSTANTS
import { cities } from '../constants/cities';
import { interests } from '../constants/interests';

// SELECTORS
import { getArticleId } from './article';

export const getFavorites = (state) => state.favorites.posts;
export const getFavoritesIsFetching = (state) => state.favorites.isFetching;
export const getIsFavorite = createSelector(
  getArticleId,
  getFavorites,
  (id, posts) => {
    let isFavorite
    if(id && posts && posts.length > 0) {
      isFavorite = posts.find(post => {
        return post._id == id
      })
    }
    return (typeof isFavorite !== 'undefined')
  }
)
