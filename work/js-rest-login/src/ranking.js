import {
  checkLoginStatus,
  performLogin,
  performLogout,
  postRanking,
  deleteRanking,
  scoreRanking,
  getRanking
} from './services';

let rankings = {};
const loginstatus = document.querySelector('#ranking-app .loginstatus');
const operationstatus = document.querySelector('#ranking-app .operationstatus');
const inputEl = document.querySelector('#ranking-app .to-add');
const addButtonEl = document.querySelector('#ranking-app .add');
const listEl = document.querySelector('#ranking-app .rankings');
const sorting = document.querySelector('#ranking-app .sorting');

addLogin();
addLogout();
addAbilityToAddItems();
addAbilityToDeleteItems();
addAbilityToScore();
addAbilityToSort();
disableButtonIfNoInput();

checkLoginStatus()
  .then(() => {
    pollingUpdate();
  })
  .catch(err => {
    showLogin();
    updateStatus({ status: loginstatus, message: err.error });
  });

function pollingUpdate() {
  getRanking()
    .then((userInfo) => {
      showContent();
      updateStatus({ status: loginstatus, message: `Hi ${userInfo.username}, welcome in!` });
      rankings = userInfo.rankings;
      renderRankings(rankings);
    })
    .then(() => {
      setTimeout(pollingUpdate, 5000);
    })
    .catch(err => {
      showLogin();
      updateStatus({ status: loginstatus, message: err.error });
    });
}

function disableButtonIfNoInput() {
  inputEl.addEventListener('input', () => {
    addButtonEl.disabled = !inputEl.value;
  });
}

function updateStatus({ status, message }) {
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
  document.querySelector('#ranking-app .login button').addEventListener('click', () => {
    const usernameEl = document.querySelector('#ranking-app .login input');
    const username = usernameEl.value;
    performLogin(username)
      .then(() => {
        updateStatus({ status: loginstatus, message: `Hi ${username}, welcome in!` });
        pollingUpdate();
      })
      .catch(err => {
        updateStatus({ status: loginstatus, message: err.error });
      })
  });
}

function addLogout() {
  document.querySelector('#ranking-app .logged-in button').addEventListener('click', () => {
    performLogout()
      .then(() => {
        updateStatus({ status: loginstatus, message: `You're safely logged out.` });
        showLogin();
      })
      .catch(err => {
        updateStatus({ status: loginstatus, message: err.error });
      })
  });
}

function addAbilityToAddItems() {
  addButtonEl.addEventListener('click', (e) => {
    const name = inputEl.value;
    postRanking(name)
      .then(userInfo => {
        updateStatus({ status: operationstatus, message: `Successfully add.` });
        inputEl.value = '';
        rankings = userInfo.rankings;
        renderRankings(rankings);
      })
      .catch(err => {
        updateStatus({ status: operationstatus, message: err.error });
      });

  });
}

function addAbilityToDeleteItems() {
  listEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('delete')) {
      return;
    }
    const rankingId = e.target.dataset.rankingid;
    deleteRanking(rankingId)
      .then(userInfo => {
        updateStatus({ status: operationstatus, message: `Successfully delete.` });
        rankings = userInfo.rankings;
        renderRankings(rankings);
      })
      .catch(err => {
        updateStatus({ status: operationstatus, message: err.error });
      });
  });
}


function addAbilityToScore() {
  listEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('star')) {
      return;
    }
    const score = e.target.dataset.starid;
    const rankingId = e.target.dataset.rankingid;
    scoreRanking({ rankingId: rankingId, score: score })
      .then(scoredRanking => {
        updateStatus({ status: operationstatus, message: `Successfully score.` });
        rankings[scoredRanking.rankingId].score = scoredRanking.score;
        renderRankings(rankings);
      })
      .catch(err => {
        updateStatus({ status: operationstatus, message: err.error });
      });
  });
}

function addAbilityToSort() {
  sorting.addEventListener('click', (e) => {
    if (!e.target.classList.contains('sortradio')) {
      return;
    }
    renderRankings(rankings);
    updateStatus({ status: operationstatus, message: `Successfully sort.` });
  });
}

function renderRankings(rankings) {
  const rankingsArray = sortRankings(rankings);
  const listEl = document.querySelector('#ranking-app .rankings');
  const html = rankingsArray.map(rankingArray => {
    const ranking = rankingArray[0];
    return `<li class="ranking">
      <div class="ranking-container">
        <span class="ranking-name">${ranking.name}</span>
        <div class="score">
          <span class="star" data-starid="1" data-rankingid="${ranking.rankingId}">${ranking.score > 0 ? `&#9733;` : `&#9734;`} </span>
          <span class="star" data-starid="2" data-rankingid="${ranking.rankingId}">${ranking.score > 1 ? `&#9733;` : `&#9734;`} </span>
          <span class="star" data-starid="3" data-rankingid="${ranking.rankingId}">${ranking.score > 2 ? `&#9733;` : `&#9734;`} </span>
          <span class="star" data-starid="4" data-rankingid="${ranking.rankingId}">${ranking.score > 3 ? `&#9733;` : `&#9734;`} </span>
          <span class="star" data-starid="5" data-rankingid="${ranking.rankingId}">${ranking.score > 4 ? `&#9733;` : `&#9734;`} </span>
        </div>
        <button class="delete" data-rankingid="${ranking.rankingId}">X Delete</button>
      </div>
      </li>`;
  }).join("\n");
  listEl.innerHTML = html;
  addButtonEl.disabled = !inputEl.value;
}

function sortRankings(rankings) {
  let sortable = [];
  for (var key in rankings) {
    sortable.push([rankings[key], rankings[key].score]);
  }
  const sortingRadios = document.getElementsByName('sorting');
  let sortAlg = null;
  for (let i = 0, length = sortingRadios.length; i < length; i++) {
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