import {
    checkLoginStatus,
    performLogin,
    performLogout,
    postRecipe,
    getRecipeById,
    getRecipes,
} from './services';
import {
    unescape,
    escape
} from './helpers';

let recipeList = {};
let recipeDetail = {};
//pages
const loginPage = document.querySelector('#recipe-app .login');
const homePage = document.querySelector('#recipe-app .home');
const detailsPage = document.querySelector('#recipe-app .details');
const newRecipePage = document.querySelector('#recipe-app .newrecipe');
//login
const loginstatusEl = document.querySelector('#recipe-app .loginstatus');
const loginButtonEl = document.querySelector('#recipe-app .loginbutton');
const usernameEl = document.querySelector('#recipe-app .login input');
//home
const recipeListEl = document.querySelector('#recipe-app .recipes');
const recipeListTitleEl = document.querySelector('#recipe-app .recipes-titles');
const recipeListAuthorEl = document.querySelector('#recipe-app .recipes-authors');
const loginredirectbuttonlEl = document.querySelector('#recipe-app .loginredirectbutton');
const logoutbuttonEl = document.querySelector('#recipe-app .logoutbutton');
const newrecipebuttonEl = document.querySelector('#recipe-app .newrecipebutton');
//details
const recipeDetailsEl = document.querySelector('#recipe-app .recipedetailscontainer');
const tohomebuttonEl = document.querySelector('#recipe-app .tohomebutton');
//new recipe
const titleInputEl = document.querySelector('#recipe-app .title');
const ingredientsInputEl = document.querySelector('#recipe-app .ingredients');
const instructionInputEl = document.querySelector('#recipe-app .instruction');
const submitButtonEl = document.querySelector('#recipe-app .submit');
const operationstatusEl = document.querySelector('#recipe-app .operationstatus');

routeToHome();
routeToDetails();
routeToLogin();
routeToNewRecipe();
addLogin();
addLogout();
addNewRecipe();
renderHome();

function updateHomeButton() {
    checkLoginStatus()
        .then((response) => {
            logoutbuttonEl.classList.remove('hidden');
            newrecipebuttonEl.classList.remove('hidden');
            loginredirectbuttonlEl.classList.add('hidden');
            updateStatus({ status: loginstatusEl, message: `You're logged-in as ${response.username}.` });
        })
        .catch(() => {
            loginredirectbuttonlEl.classList.remove('hidden');
            logoutbuttonEl.classList.add('hidden');
            newrecipebuttonEl.classList.add('hidden');
        });
}

function renderHome() {
    getRecipes()
        .then((recipes) => {
            showHome();
            updateHomeButton();
            recipeList = recipes;
            renderRecipeList(recipeList);
        })
        .catch(err => {
            updateStatus({ status: operationstatusEl, message: err.error });
        });
}

function updateStatus({ status, message }) {
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
    tohomebuttonEl.addEventListener('click', () => {
        renderHome();
        updateStatus({ status: operationstatusEl, message: '' });
    });
}

function routeToDetails() {
    recipeListTitleEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('recipe-title')) {
            return;
        }
        const recipeId = e.target.dataset.recipeid;
        getRecipeById(recipeId)
            .then(recipe => {
                showDetails();
                recipeDetail = recipe;
                renderRecipeDetail(recipeDetail);
            })
            .catch(err => {
                updateStatus({ status: operationstatusEl, message: err.error });
            });
    });
}

function routeToLogin() {
    loginredirectbuttonlEl.addEventListener('click', () => {
        checkLoginStatus()
            .then((response) => {
                updateStatus({ status: loginstatusEl, message: `You're logged-in as ${response.username}, please log out first!` });
            })
            .catch(error => {
                showLogin();
            });

    });
}

function routeToNewRecipe() {
    newrecipebuttonEl.addEventListener('click', () => {
        checkLoginStatus()
            .then((response) => {
                showNewRecipe();
                updateStatus({ status: loginstatusEl, message: `You're logged-in as ${response.username}.` });
            })
            .catch(err => {
                updateStatus({ status: loginstatusEl, message: err.error });
            });
    });
}

function addLogin() {
    loginButtonEl.addEventListener('click', () => {
        const username = usernameEl.value;
        performLogin(username)
            .then(() => {
                console.log("login");
                renderHome();

            })
            .catch(err => {
                updateStatus({ status: loginstatusEl, message: err.error });
            })
    });
}

function addLogout() {
    logoutbuttonEl.addEventListener('click', () => {
        performLogout()
            .then(() => {
                renderHome();
                updateStatus({ status: loginstatusEl, message: `You're safely logged out.` });
            })
            .catch(err => {
                updateStatus({ status: loginstatusEl, message: err.error });
            })
    });
}

function renderRecipeList(recipes) {
    const htmlTitles = Object.values(recipes).map(recipe => {
        return `<li class="recipe-title-li">
            <span class="recipe-title" data-recipeid="${recipe.recipeId}">${recipe.title}</span>
        </li>`;
    }).join("\n");
    recipeListTitleEl.innerHTML = htmlTitles;

    const htmlAuthors = Object.values(recipes).map(recipe => {
        return `<li class="recipe-author-li">
            <span class="recipe-author">${recipe.author}</span>
        </li>`;
    }).join("\n");
    recipeListAuthorEl.innerHTML = htmlAuthors;
}

function renderRecipeDetail(recipe) {
    const html = `
    <div class="detail-attribute">Title</div>
    <span class="recipe-title">${unescape(recipe.title)}</span><br>
    <div class="detail-attribute">Author</div>
    <span class="recipe-author">${unescape(recipe.author)}</span><br>
    <div class="detail-attribute">Ingredients</div>
    <span class="recipe-ingredients">${unescape(recipe.ingredients)}</span><br>
    <div class="detail-attribute">Instruction</div>
    <span class="recipe-instruction">${unescape(recipe.instruction)}</span><br>
    `;
    recipeDetailsEl.innerHTML = html;
}

function addNewRecipe() {
    submitButtonEl.addEventListener('click', () => {
        checkLoginStatus()
            .then(() => {
                const title = escape(titleInputEl.value);
                const ingredients = escape(ingredientsInputEl.value);
                const instruction = escape(instructionInputEl.value);
                postRecipe({ title: title, ingredients: ingredients, instruction: instruction })
                    .then(response => {
                        titleInputEl.value = '';
                        ingredientsInputEl.value = '';
                        instructionInputEl.value = '';
                        const recipeId = response.recipeId;
                        getRecipeById(recipeId)
                            .then(recipe => {
                                showDetails();
                                recipeDetail = recipe;
                                renderRecipeDetail(recipeDetail);
                                updateStatus({ status: operationstatusEl, message: '' });
                            })
                            .catch(err => {
                                updateStatus({ status: operationstatusEl, message: err.error });
                            });
                    })
                    .catch(err => {
                        updateStatus({ status: operationstatusEl, message: err.error });
                    });
            })
            .catch(err => {
                updateStatus({ status: loginstatusEl, message: err.error });
            });
    });
}