const elem = (domString) => {
  const html = new DOMParser().parseFromString(domString, 'text/html');
  return html.body.firstChild;
};

const leechBadgeDom = `
<li class="reviews leech-badge">
    <a>
      <span class="leech-count">&nbsp;</span> Leeches
    </a>
</li>
`;

const quizPopupDom = `
<div id="ss_quiz" class="kanji reading">
  <div class="quiz-progress"><div class="quiz-progress-bar"></div></div>
  <div class="qwrap">
    <div class="question"></div>
    <div class="help"></div>
    <div class="summary center">
      <h3>Summary - <span class="percent">100%</span> Correct <button class="btn requiz" title="Re-quiz wrong items">Re-quiz</button></h3>
      <ul class="errors"></ul>
    </div>
    <div class="round center"><span class="center">Round 1</span></div>
  </div>
  <div class="qtype"></div>
  <div class="answer"><input type="text" value=""></div>
</div>
`;

const reviewsBadge = document.querySelector('ul.nav > li.reviews');

if (reviewsBadge) {
  reviewsBadge.parentElement.appendChild(elem(leechBadgeDom));
}
