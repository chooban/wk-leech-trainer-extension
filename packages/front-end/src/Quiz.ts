import { Question } from './Question'

class Quiz {
  private questions: Question[]

  constructor(leechItems) {
    this.questions = leechItems.map((lesson) => new Question(lesson))
  }

  public items() {
    return this.questions.length
  }
}

export { Quiz }
