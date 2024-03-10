interface Quiz {
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface SelectedAnswer extends Quiz {
  userAnswer: string;
  isCorrect: boolean;
}

interface WrongNoteItem extends SelectedAnswer {
  count: number;
}

interface QuizResponse {
  response_code: number;
  results: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}
