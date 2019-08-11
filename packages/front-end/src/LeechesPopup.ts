import { makeElement } from './element'
import { Quiz } from './Quiz'

const dom = `
<div id="ss_quiz" class="kanji reading hidden">
  <div class="quiz-progress"><div class="quiz-progress-bar"></div></div>
  <div class="qwrap">
    <div class="question"></div>
    <div class="help"></div>
    <div class="summary center">
      <h3>Summary - <span class="percent">100%</span> Correct
      <button class="btn requiz" title="Re-quiz wrong items">Re-quiz</button></h3>
      <ul class="errors"></ul>
    </div>
    <div class="round center"><span class="center">Round 1</span></div>
  </div>
  <div class="qtype"></div>
  <div class="answer"><input type="text" value=""></div>
</div>

`
class Popup {
  private quizPopupNode: HTMLElement

  private abortNode: HTMLElement

  private quiz: Quiz

  public constructor() {
    this.quizPopupNode = document.body.appendChild(makeElement(dom))
    this.abortNode = this.quizPopupNode.appendChild(makeElement('<div class="ss_quiz_abort hidden"/>'))
    this.onHide = () => { // no-op
    }
    this.quiz = undefined
  }

  public onHide(fn) {
    this.onHide = fn
  }

  public show(lessons) {
    this.quizPopupNode.classList.remove('hidden')
    this.abortNode.classList.remove('hidden')
    document.querySelectorAll('.navbar, #search, .dashboard, footer')
      .forEach((el) => el.classList.add('ss_blur'))

    const progressBar: HTMLElement = document.querySelector('.quiz-progress-bar')
    progressBar.style.width = '0%'

    this.abortNode.addEventListener('click', () => {
      this.hide()
    })

    this.quiz = new Quiz(lessons)
  }

  public hide() {
    this.quizPopupNode.classList.add('hidden')
    this.abortNode.classList.add('hidden')
    document.querySelectorAll('.navbar, #search, .dashboard, footer')
      .forEach((el) => el.classList.remove('ss_blur'))
    this.onHide.apply(this)
  }
}

export default Popup
