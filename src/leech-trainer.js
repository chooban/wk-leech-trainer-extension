import leechBadgeDom from './leech-badge.html';
import * as wk from './wk-account';
// import quizPopupDom from './quiz-popup.html';
import * as leechStore from './leech-store';

const elem = (domString) => {
  const html = new DOMParser().parseFromString(domString, 'text/html');
  return html.body.firstChild;
};

const reviewsBadge = document.querySelector('ul.nav > li.reviews');

if (reviewsBadge) {
  reviewsBadge.parentElement.appendChild(elem(leechBadgeDom));

  wk.getApiKey()
    .then(leechStore.refresh)
    .then(() => {
      document.querySelector('span.available_leeches').innerHTML = leechStore.count();
    });
}
