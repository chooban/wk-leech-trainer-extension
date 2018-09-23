class Question {
  constructor(data) {
    this.name = data.name
    this.type = data.type
    this.trainingType = data.train_type
    this.correctAnswers = data.correct_answers
    this.closeAnswers = data.try_again_answers
  }
}

const factory = (data) => new Question(data)

export default factory
