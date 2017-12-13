import leechBadgeDom from './leech-badge.html';
import * as wk from './wk-account';
// import quizPopupDom from './quiz-popup.html';

const elem = (domString) => {
  const html = new DOMParser().parseFromString(domString, 'text/html');
  return html.body.firstChild;
};

const reviewsBadge = document.querySelector('ul.nav > li.reviews');

if (reviewsBadge) {
  reviewsBadge.parentElement.appendChild(elem(leechBadgeDom));

  wk.getApiKey()
    .then((key) => fetch(`https://wanikanitools-golang.curiousattemptbunny.com/leeches/lesson?api_key=${key}`))
    .then((leeches) => leeches.text())
    .then((l) => {
      const leeches = JSON.parse(l);
      document.querySelector('span.available_leeches').innerHTML = leeches.leeches_available;
    });
}
