import leechBadgeDom from './html/leech-badge.html';
import elem from './element';
import * as wk from './wk-account';
import * as leechStore from './leech-store';
import leechCountObserver from './leech-count-observer';
import Popup from './show-leeches-popup';

const reviewsBadge = document.querySelector('ul.nav > li.reviews');

if (reviewsBadge) {
  const leechBadgeNode = reviewsBadge.parentElement.appendChild(elem(leechBadgeDom));
  const availableLeeches = leechBadgeNode.querySelector('.available_leeches');
  const updateLeeches = () => wk.getApiKey()
    .then(leechStore.refresh)
    .then(() => {
      availableLeeches.textContent = leechStore.count();
    });

  const popup = new Popup();
  popup.onHide(updateLeeches);

  const observer = new MutationObserver(leechCountObserver(
    leechBadgeNode,
    () => popup.show(leechStore.lessonItems())
  ));

  observer.observe(availableLeeches, {
    characterData: false,
    attributes: false,
    childList: true,
    subtree: false
  });

  updateLeeches();
  chrome.runtime.sendMessage({ action: 'displayPageIcon' });
}
