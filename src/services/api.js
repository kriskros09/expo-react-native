// SERVICES - API
// =============================================================================
import axios from 'axios';

export function fetchArticles() {
  return axios({
    method: 'get',
    url: 'https://latestapi.narcity.com/all'
  });
}

export function fetchArticle(params) {
  return axios({
    method: 'get',
    url: `https://latestapi.narcity.com/content/${params.id}`,
    headers: {
      lmltk: params.lmltk,
    },
  });
}

export function fetchRelatedArticles(params) {
  return axios({
    method: 'get',
    url: `https://latestapi.narcity.com/author`,
    headers: {
      lmltk: params.lmltk,
      author: params.id,
    },
  });
}

export function getLiliumToken(access_token) {
  return axios({
    method: 'post',
    url: `https://latestapi.narcity.com/introduce`,
    headers: { t: access_token }
  });
}

export function setPreferences(params) {
  return axios({
    method: 'put',
    url: `https://latestapi.narcity.com/pref`,
    headers: {
      lmltk: params.lmltk,
      feedtype: params.feedType,
      language: params.language
    },
    data: params.preferences,
  });
}

export function fetchFavorites(params) {
  return axios({
    method: 'get',
    url: `https://latestapi.narcity.com/fav`,
    headers: {
      lmltk: params.lmltk,
    }
  });
}

export function saveFavorite(params) {
  return axios({
    method: 'post',
    url: `https://latestapi.narcity.com/fav`,
    headers: {
      lmltk: params.lmltk,
      cid: params.cid,
    }
  });
}

export function deleteFavorite(params) {
  return axios({
    method: 'delete',
    url: `https://latestapi.narcity.com/fav`,
    headers: {
      lmltk: params.lmltk,
      cid: params.cid,
    }
  });
}

export function fetchSearchResults(params) {
  return axios({
    method: 'get',
    url: `https://latestapi.narcity.com/search`,
    headers: {
      lmltk: params.lmltk,
      terms: params.terms,
    }
  });
}

export function deleteSessionAndData(params) {
  return axios({
    method: 'delete',
    url: `https://latestapi.narcity.com/me`,
    headers: {
      lmltk: params.lmltk,
    }
  });
}
