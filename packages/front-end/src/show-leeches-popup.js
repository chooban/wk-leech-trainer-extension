import quizPopupDom from './html/quiz-popup.html'
import elem from './element'
import Quiz from './quiz'

NodeList.prototype.forEach = Array.prototype.forEach

class Popup {
  constructor() {
    this.quizPopupNode = document.body.appendChild(elem(quizPopupDom))
    this.abortNode = this.quizPopupNode.appendChild(elem('<div class="ss_quiz_abort hidden"/>'))
    this.onHide = () => {}
    this.quiz = undefined
  }

  onHide(fn) {
    this.onHide = fn
  }

  show(lessons) {
    this.quizPopupNode.classList.remove('hidden')
    this.abortNode.classList.remove('hidden')
    document.querySelectorAll('.navbar, #search, .dashboard, footer')
      .forEach((el) => el.classList.add('ss_blur'))
    document.querySelector('.quiz-progress-bar').style.width = '0%'
    this.abortNode.addEventListener('click', () => {
      this.hide()
    })

    this.quiz = new Quiz(lessons)
    console.log(this.quiz.items())
  }

  hide() {
    this.quizPopupNode.classList.add('hidden')
    this.abortNode.classList.add('hidden')
    document.querySelectorAll('.navbar, #search, .dashboard, footer')
      .forEach((el) => el.classList.remove('ss_blur'))
    this.onHide.apply(this)
  }
}

export default Popup
