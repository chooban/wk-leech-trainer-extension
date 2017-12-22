import leechBadgeDom from './leech-badge.html';
import * as wk from './wk-account';
// import quizPopupDom from './quiz-popup.html';
import * as leechStore from './leech-store';
import * as observers from './leech-count-observer';

const elem = (domString) => {
  const html = new DOMParser().parseFromString(domString, 'text/html');
  return html.body.firstChild;
};

const reviewsBadge = document.querySelector('ul.nav > li.reviews');

if (reviewsBadge) {
  const leechBadgeNode = reviewsBadge.parentElement.appendChild(elem(leechBadgeDom));
  const availableLeeches = leechBadgeNode.querySelector('.available_leeches');
  const observer = new MutationObserver(observers.leechCount);
  observer.observe(availableLeeches, {
    characterData: false,
    attributes: false,
    childList: true,
    subtree: false
  });

  wk.getApiKey()
    .then(leechStore.refresh)
    .then(() => {
      availableLeeches.textContent = leechStore.count();
    });
}
