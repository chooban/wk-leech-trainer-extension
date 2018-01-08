import quizPopupDom from './quiz-popup.html';
import elem from './element';

NodeList.prototype.forEach = Array.prototype.forEach;

class Popup {
  constructor() {
    this.quizPopupNode = document.body.appendChild(elem(quizPopupDom));
    this.abortNode = this.quizPopupNode.appendChild(elem('<div class="ss_quiz_abort hidden"/>'));
  }
  onHide(fn) {
    this.onHide = fn;
  }

  show() {
    this.quizPopupNode.classList.remove('hidden');
    this.abortNode.classList.remove('hidden');
    document.querySelectorAll('.navbar, #search, .dashboard, footer')
      .forEach((el) => el.classList.add('ss_blur'));

    this.abortNode.addEventListener('click', () => {
      this.hide();
    });
  }

  hide() {
    this.quizPopupNode.classList.add('hidden');
    this.abortNode.classList.add('hidden');
    document.querySelectorAll('.navbar, #search, .dashboard, footer')
      .forEach((el) => el.classList.remove('ss_blur'));
    this.onHide.apply(this);
  }
}

export default Popup;
