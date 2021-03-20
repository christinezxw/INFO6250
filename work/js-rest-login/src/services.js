export const checkLoginStatus = function () {
  return fetch('/session', {
    method: 'GET',
  })
    .catch(() => {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const performLogin = function (username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username: username }),
  })
    .catch(() => {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const performLogout = function () {
  return fetch('/session', {
    method: 'DELETE',
  })
    .catch(() => {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const postRanking = function (name) {
  return fetch('/ranking', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ name: name }),
  })
    .catch(() => {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const deleteRanking = function (rankingId) {
  return fetch(`/ranking/${rankingId}`, {
    method: 'DELETE',
  })
    .catch(() => {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const getRanking = function () {
  return fetch(`/ranking`, {
    method: 'GET',
  })
    .catch(() => {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const scoreRanking = function ({ rankingId, score }) {
  return fetch(`/ranking/${rankingId}`, {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      score: score
    })
  })
    .catch(() => {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};