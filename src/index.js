import leechBadgeDom from './leech-badge.html';
import quizPopupDom from './quiz-popup.html';
import elem from './element';
import * as wk from './wk-account';
import * as leechStore from './leech-store';
import leechCountObserver from './leech-count-observer';
import showPopup from './show-leeches-popup';

NodeList.prototype.forEach = Array.prototype.forEach;

const reviewsBadge = document.querySelector('ul.nav > li.reviews');

if (reviewsBadge) {
  const leechBadgeNode = reviewsBadge.parentElement.appendChild(elem(leechBadgeDom));
  const quizPopupNode = document.body.appendChild(elem(quizPopupDom));
  const popupCallback = showPopup(quizPopupNode);
  const availableLeeches = leechBadgeNode.querySelector('.available_leeches');
  const observer = new MutationObserver(leechCountObserver(
    leechBadgeNode,
    (node) => {
      popupCallback(node);
      document.querySelectorAll('.navbar, #search, .dashboard, footer')
        .forEach((el) => {
          el.classList.add('ss_blur');
        });
    }
  ));

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
