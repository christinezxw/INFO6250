/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unescape": () => (/* binding */ unescape),
/* harmony export */   "escape": () => (/* binding */ escape)
/* harmony export */ });
var unescape = function unescape(text) {
  return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
var escape = function escape(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

/***/ }),

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
/* harmony export */   "postRecipe": () => (/* binding */ postRecipe),
/* harmony export */   "getRecipeById": () => (/* binding */ getRecipeById),
/* harmony export */   "getRecipes": () => (/* binding */ getRecipes)
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
var postRecipe = function postRecipe(_ref) {
  var title = _ref.title,
      ingredients = _ref.ingredients,
      instruction = _ref.instruction;
  return fetch('/recipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      instruction: instruction
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
var getRecipeById = function getRecipeById(recipeId) {
  return fetch("/recipe/".concat(recipeId), {
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
var getRecipes = function getRecipes() {
  return fetch("/recipe", {
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
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");


var recipeList = {};
var recipeDetail = {}; //pages

var loginPage = document.querySelector('#recipe-app .login');
var homePage = document.querySelector('#recipe-app .home');
var detailsPage = document.querySelector('#recipe-app .details');
var newRecipePage = document.querySelector('#recipe-app .newrecipe'); //login

var loginstatusEl = document.querySelector('#recipe-app .loginstatus');
var loginButtonEl = document.querySelector('#recipe-app .loginbutton');
var usernameEl = document.querySelector('#recipe-app .login input'); //home

var recipeListEl = document.querySelector('#recipe-app .recipes');
var recipeListTitleEl = document.querySelector('#recipe-app .recipes-titles');
var recipeListAuthorEl = document.querySelector('#recipe-app .recipes-authors');
var loginredirectbuttonlEl = document.querySelector('#recipe-app .loginredirectbutton');
var logoutbuttonEl = document.querySelector('#recipe-app .logoutbutton');
var newrecipebuttonEl = document.querySelector('#recipe-app .newrecipebutton'); //details

var recipeDetailsEl = document.querySelector('#recipe-app .recipedetailscontainer');
var tohomebuttonEl = document.querySelector('#recipe-app .tohomebutton'); //new recipe

var titleInputEl = document.querySelector('#recipe-app .title');
var ingredientsInputEl = document.querySelector('#recipe-app .ingredients');
var instructionInputEl = document.querySelector('#recipe-app .instruction');
var submitButtonEl = document.querySelector('#recipe-app .submit');
var operationstatusEl = document.querySelector('#recipe-app .operationstatus');
routeToHome();
routeToDetails();
routeToLogin();
routeToNewRecipe();
addLogin();
addLogout();
addNewRecipe();
renderHome();

function updateHomeButton() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (response) {
    logoutbuttonEl.classList.remove('hidden');
    newrecipebuttonEl.classList.remove('hidden');
    loginredirectbuttonlEl.classList.add('hidden');
    updateStatus({
      status: loginstatusEl,
      message: "You're logged-in as ".concat(response.username, ".")
    });
  })["catch"](function () {
    loginredirectbuttonlEl.classList.remove('hidden');
    logoutbuttonEl.classList.add('hidden');
    newrecipebuttonEl.classList.add('hidden');
  });
}

function renderHome() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getRecipes)().then(function (recipes) {
    showHome();
    updateHomeButton();
    recipeList = recipes;
    renderRecipeList(recipeList);
  })["catch"](function (err) {
    updateStatus({
      status: operationstatusEl,
      message: err.error
    });
  });
}

function updateStatus(_ref) {
  var status = _ref.status,
      message = _ref.message;
  status.innerText = message;
}

function showHome() {
  loginPage.classList.add('hidden');
  detailsPage.classList.add('hidden');
  newRecipePage.classList.add('hidden');
  homePage.classList.remove('hidden');
  tohomebuttonEl.classList.add('hidden');
}

function showLogin() {
  loginPage.classList.remove('hidden');
  detailsPage.classList.add('hidden');
  newRecipePage.classList.add('hidden');
  homePage.classList.add('hidden');
  tohomebuttonEl.classList.remove('hidden');
}

function showDetails() {
  loginPage.classList.add('hidden');
  detailsPage.classList.remove('hidden');
  newRecipePage.classList.add('hidden');
  homePage.classList.add('hidden');
  tohomebuttonEl.classList.remove('hidden');
}

function showNewRecipe() {
  loginPage.classList.add('hidden');
  detailsPage.classList.add('hidden');
  newRecipePage.classList.remove('hidden');
  homePage.classList.add('hidden');
  tohomebuttonEl.classList.remove('hidden');
}

function routeToHome() {
  tohomebuttonEl.addEventListener('click', function () {
    renderHome();
    updateStatus({
      status: operationstatusEl,
      message: ''
    });
  });
}

function routeToDetails() {
  recipeListTitleEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('recipe-title')) {
      return;
    }

    var recipeId = e.target.dataset.recipeid;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.getRecipeById)(recipeId).then(function (recipe) {
      showDetails();
      recipeDetail = recipe;
      renderRecipeDetail(recipeDetail);
    })["catch"](function (err) {
      updateStatus({
        status: operationstatusEl,
        message: err.error
      });
    });
  });
}

function routeToLogin() {
  loginredirectbuttonlEl.addEventListener('click', function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (response) {
      updateStatus({
        status: loginstatusEl,
        message: "You're logged-in as ".concat(response.username, ", please log out first!")
      });
    })["catch"](function (error) {
      showLogin();
    });
  });
}

function routeToNewRecipe() {
  newrecipebuttonEl.addEventListener('click', function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (response) {
      showNewRecipe();
      updateStatus({
        status: loginstatusEl,
        message: "You're logged-in as ".concat(response.username, ".")
      });
    })["catch"](function (err) {
      updateStatus({
        status: loginstatusEl,
        message: err.error
      });
    });
  });
}

function addLogin() {
  loginButtonEl.addEventListener('click', function () {
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function () {
      console.log("login");
      renderHome();
    })["catch"](function (err) {
      updateStatus({
        status: loginstatusEl,
        message: err.error
      });
    });
  });
}

function addLogout() {
  logoutbuttonEl.addEventListener('click', function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogout)().then(function () {
      renderHome();
      updateStatus({
        status: loginstatusEl,
        message: "You're safely logged out."
      });
    })["catch"](function (err) {
      updateStatus({
        status: loginstatusEl,
        message: err.error
      });
    });
  });
}

function renderRecipeList(recipes) {
  var htmlTitles = Object.values(recipes).map(function (recipe) {
    return "<li class=\"recipe-title-li\">\n            <span class=\"recipe-title\" data-recipeid=\"".concat(recipe.recipeId, "\">").concat(recipe.title, "</span>\n        </li>");
  }).join("\n");
  recipeListTitleEl.innerHTML = htmlTitles;
  var htmlAuthors = Object.values(recipes).map(function (recipe) {
    return "<li class=\"recipe-author-li\">\n            <span class=\"recipe-author\">".concat(recipe.author, "</span>\n        </li>");
  }).join("\n");
  recipeListAuthorEl.innerHTML = htmlAuthors;
}

function renderRecipeDetail(recipe) {
  var html = "\n    <div class=\"detail-attribute\">Title</div>\n    <span class=\"recipe-title\">".concat((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.unescape)(recipe.title), "</span><br>\n    <div class=\"detail-attribute\">Author</div>\n    <span class=\"recipe-author\">").concat((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.unescape)(recipe.author), "</span><br>\n    <div class=\"detail-attribute\">Ingredients</div>\n    <span class=\"recipe-ingredients\">").concat((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.unescape)(recipe.ingredients), "</span><br>\n    <div class=\"detail-attribute\">Instruction</div>\n    <span class=\"recipe-instruction\">").concat((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.unescape)(recipe.instruction), "</span><br>\n    ");
  recipeDetailsEl.innerHTML = html;
}

function addNewRecipe() {
  submitButtonEl.addEventListener('click', function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function () {
      var title = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.escape)(titleInputEl.value);
      var ingredients = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.escape)(ingredientsInputEl.value);
      var instruction = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.escape)(instructionInputEl.value);
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.postRecipe)({
        title: title,
        ingredients: ingredients,
        instruction: instruction
      }).then(function (response) {
        titleInputEl.value = '';
        ingredientsInputEl.value = '';
        instructionInputEl.value = '';
        var recipeId = response.recipeId;
        (0,_services__WEBPACK_IMPORTED_MODULE_0__.getRecipeById)(recipeId).then(function (recipe) {
          showDetails();
          recipeDetail = recipe;
          renderRecipeDetail(recipeDetail);
          updateStatus({
            status: operationstatusEl,
            message: ''
          });
        })["catch"](function (err) {
          updateStatus({
            status: operationstatusEl,
            message: err.error
          });
        });
      })["catch"](function (err) {
        updateStatus({
          status: operationstatusEl,
          message: err.error
        });
      });
    })["catch"](function (err) {
      updateStatus({
        status: loginstatusEl,
        message: err.error
      });
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=recipe.js.map