import questionFactory from './question-factory'

class Quiz {
  constructor(leechItems) {
    this.questions = leechItems.map((lesson) => questionFactory(lesson))
  }

  items() {
    return this.questions.length
  }
}

export default Quiz
