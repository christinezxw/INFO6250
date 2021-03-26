/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => (/* binding */ checkLoginStatus),
/* harmony export */   "performLogin": () => (/* binding */ performLogin),
/* harmony export */   "performLogout": () => (/* binding */ performLogout),
/* harmony export */   "postRanking": () => (/* binding */ postRanking),
/* harmony export */   "deleteRanking": () => (/* binding */ deleteRanking),
/* harmony export */   "getRanking": () => (/* binding */ getRanking),
/* harmony export */   "scoreRanking": () => (/* binding */ scoreRanking)
/* harmony export */ });
var checkLoginStatus = function checkLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogin = function performLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogout = function performLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var postRanking = function postRanking(name) {
  return fetch('/ranking', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      name: name
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var deleteRanking = function deleteRanking(rankingId) {
  return fetch("/ranking/".concat(rankingId), {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var getRanking = function getRanking() {
  return fetch("/ranking", {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var scoreRanking = function scoreRanking(_ref) {
  var rankingId = _ref.rankingId,
      score = _ref.score;
  return fetch("/ranking/".concat(rankingId), {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      score: score
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/ranking.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var rankings = {};
var loginstatus = document.querySelector('#ranking-app .loginstatus');
var operationstatus = document.querySelector('#ranking-app .operationstatus');
var inputEl = document.querySelector('#ranking-app .to-add');
var addButtonEl = document.querySelector('#ranking-app .add');
var listEl = document.querySelector('#ranking-app .rankings');
var sorting = document.querySelector('#ranking-app .sorting');
addLogin();
addLogout();
addAbilityToAddItems();
addAbilityToDeleteItems();
addAbilityToScore();
addAbilityToSort();
disableButtonIfNoInput();
(0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function () {
  pollingUpdate();
})["catch"](function (err) {
  showLogin();
  updateStatus({
    status: loginstatus,
    message: err.error
  });
});

function pollingUpdate() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getRanking)().then(function (userInfo) {
    showContent();
    updateStatus({
      status: loginstatus,
      message: "Hi ".concat(userInfo.username, ", welcome in!")
    });
    rankings = userInfo.rankings;
    renderRankings(rankings);
  }).then(function () {
    setTimeout(pollingUpdate, 5000);
  })["catch"](function (err) {
    showLogin();
    updateStatus({
      status: loginstatus,
      message: err.error
    });
  });
}

function disableButtonIfNoInput() {
  inputEl.addEventListener('input', function () {
    addButtonEl.disabled = !inputEl.value;
  });
}

function updateStatus(_ref) {
  var status = _ref.status,
      message = _ref.message;
  status.innerText = message;
}

function showContent() {
  document.querySelector('#ranking-app .login').classList.add('hidden');
  document.querySelector('#ranking-app .logged-in').classList.remove('hidden');
}

function showLogin() {
  document.querySelector('#ranking-app .login').classList.remove('hidden');
  document.querySelector('#ranking-app .logged-in').classList.add('hidden');
}

function addLogin() {
  document.querySelector('#ranking-app .login button').addEventListener('click', function () {
    var usernameEl = document.querySelector('#ranking-app .login input');
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function () {
      updateStatus({
        status: loginstatus,
        message: "Hi ".concat(username, ", welcome in!")
      });
      pollingUpdate();
    })["catch"](function (err) {
      updateStatus({
        status: loginstatus,
        message: err.error
      });
    });
  });
}

function addLogout() {
  document.querySelector('#ranking-app .logged-in button').addEventListener('click', function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogout)().then(function () {
      updateStatus({
        status: loginstatus,
        message: "You're safely logged out."
      });
      showLogin();
    })["catch"](function (err) {
      updateStatus({
        status: loginstatus,
        message: err.error
      });
    });
  });
}

function addAbilityToAddItems() {
  addButtonEl.addEventListener('click', function (e) {
    var name = inputEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.postRanking)(name).then(function (userInfo) {
      updateStatus({
        status: operationstatus,
        message: "Successfully add."
      });
      inputEl.value = '';
      rankings = userInfo.rankings;
      renderRankings(rankings);
    })["catch"](function (err) {
      updateStatus({
        status: operationstatus,
        message: err.error
      });
    });
  });
}

function addAbilityToDeleteItems() {
  listEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete')) {
      return;
    }

    var rankingId = e.target.dataset.rankingid;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.deleteRanking)(rankingId).then(function (userInfo) {
      updateStatus({
        status: operationstatus,
        message: "Successfully delete."
      });
      rankings = userInfo.rankings;
      renderRankings(rankings);
    })["catch"](function (err) {
      updateStatus({
        status: operationstatus,
        message: err.error
      });
    });
  });
}

function addAbilityToScore() {
  listEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('star')) {
      return;
    }

    var score = e.target.dataset.starid;
    var rankingId = e.target.dataset.rankingid;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.scoreRanking)({
      rankingId: rankingId,
      score: score
    }).then(function (scoredRanking) {
      updateStatus({
        status: operationstatus,
        message: "Successfully score."
      });
      rankings[scoredRanking.rankingId].score = scoredRanking.score;
      renderRankings(rankings);
    })["catch"](function (err) {
      updateStatus({
        status: operationstatus,
        message: err.error
      });
    });
  });
}

function addAbilityToSort() {
  sorting.addEventListener('click', function (e) {
    if (!e.target.classList.contains('sortradio')) {
      return;
    }

    renderRankings(rankings);
    updateStatus({
      status: operationstatus,
      message: "Successfully sort."
    });
  });
}

function renderRankings(rankings) {
  var rankingsArray = sortRankings(rankings);
  var listEl = document.querySelector('#ranking-app .rankings');
  var html = rankingsArray.map(function (rankingArray) {
    var ranking = rankingArray[0];
    return "<li class=\"ranking\">\n      <div class=\"ranking-container\">\n        <span class=\"ranking-name\">".concat(ranking.name, "</span>\n        <div class=\"score\">\n          <span class=\"star\" data-starid=\"1\" data-rankingid=\"").concat(ranking.rankingId, "\">").concat(ranking.score > 0 ? "&#9733;" : "&#9734;", " </span>\n          <span class=\"star\" data-starid=\"2\" data-rankingid=\"").concat(ranking.rankingId, "\">").concat(ranking.score > 1 ? "&#9733;" : "&#9734;", " </span>\n          <span class=\"star\" data-starid=\"3\" data-rankingid=\"").concat(ranking.rankingId, "\">").concat(ranking.score > 2 ? "&#9733;" : "&#9734;", " </span>\n          <span class=\"star\" data-starid=\"4\" data-rankingid=\"").concat(ranking.rankingId, "\">").concat(ranking.score > 3 ? "&#9733;" : "&#9734;", " </span>\n          <span class=\"star\" data-starid=\"5\" data-rankingid=\"").concat(ranking.rankingId, "\">").concat(ranking.score > 4 ? "&#9733;" : "&#9734;", " </span>\n        </div>\n        <button class=\"delete\" data-rankingid=\"").concat(ranking.rankingId, "\">X Delete</button>\n      </div>\n      </li>");
  }).join("\n");
  listEl.innerHTML = html;
  addButtonEl.disabled = !inputEl.value;
}

function sortRankings(rankings) {
  var sortable = [];

  for (var key in rankings) {
    sortable.push([rankings[key], rankings[key].score]);
  }

  var sortingRadios = document.getElementsByName('sorting');
  var sortAlg = null;

  for (var i = 0, length = sortingRadios.length; i < length; i++) {
    if (sortingRadios[i].checked) {
      sortAlg = sortingRadios[i].value;
      break;
    }
  }

  if (sortAlg && sortAlg === 'asc') {
    sortable.sort(sortAscending);
  } else if (sortAlg && sortAlg === 'des') {
    sortable.sort(sortDescending);
  }

  return sortable;
}

function sortAscending(r1, r2) {
  return r1[1] - r2[1];
}

function sortDescending(r1, r2) {
  return r2[1] - r1[1];
}
})();

/******/ })()
;
//# sourceMappingURL=ranking.js.map