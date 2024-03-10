import { stringToSha1 } from './hashing';

export class WrongNote {
  static getFromLocalStorage() {
    const wrongCounter: Record<string, number> = JSON.parse(localStorage.getItem('wrongCounter') ?? '{}');
    const wrongNoteItems: Record<string, WrongNoteItem> = JSON.parse(localStorage.getItem('wrongNoteItems') ?? '{}');

    return {
      wrongCounter,
      wrongNoteItems,
    };
  }
  static async set(wrongAnswers: SelectedAnswer[]) {
    const { wrongCounter, wrongNoteItems } = WrongNote.getFromLocalStorage();

    const wrongAnswerPromises = wrongAnswers.map(async wrongAnswer => {
      const qustionHash = await stringToSha1(wrongAnswer.question);

      // 전에 푼적이 있으면 count를 더해준다.
      wrongCounter[qustionHash] = (wrongCounter?.[qustionHash] ?? 0) + 1;

      wrongNoteItems[qustionHash] = {
        ...wrongNoteItems[qustionHash],
        question: wrongAnswer.question,
        answers: wrongAnswer.answers,
        correctAnswer: wrongAnswer.correctAnswer,
        userAnswer: wrongAnswer.userAnswer,
        count: wrongCounter[qustionHash],
      };
    });

    await Promise.all(wrongAnswerPromises);

    localStorage.setItem('wrongCounter', JSON.stringify(wrongCounter));
    localStorage.setItem('wrongNoteItems', JSON.stringify(wrongNoteItems));
  }
}
