class Question {
  public name: any

  public type: any

  public trainingType: any

  public correctAnswers: any

  public closeAnswers: any

  public constructor(data: any) {
    this.name = data.name
    this.type = data.type
    this.trainingType = data.train_type
    this.correctAnswers = data.correct_answers
    this.closeAnswers = data.try_again_answers
  }
}

export { Question }
