import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Quiz } from '@hooks/fetch';

interface useTakeQuizParams {
  quiz?: Quiz[];
}

interface SelectedAnswer {
  question: string;
  answers: string[];
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}
export function useTakeQuiz({ quiz }: useTakeQuizParams) {
  const [nowQuizPage, setNowQuizPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const [selectedAnswerList, setSelectedAnswerList] = useState<SelectedAnswer[]>([]);

  const nowQuizPageData = quiz?.[nowQuizPage];
  const maxQuizPage = quiz?.length ?? 0;

  const buttonAvailable = selectedAnswer !== '';
  const isLastQuiz = nowQuizPage === maxQuizPage - 1;
  const buttonLabel = isLastQuiz ? '결과 확인' : '다음 문항';

  const navigate = useNavigate();

  const changeSelectedAnswer = (userAnswer: string) => {
    setSelectedAnswer(userAnswer);
    checkWrongAnswer(userAnswer);
  };

  const checkWrongAnswer = (userAnswer: string) => {
    if (!nowQuizPageData) return;

    const { correctAnswer, question, answers } = nowQuizPageData;
    const isCorrect = userAnswer === correctAnswer;

    const nowAnswerWithQuestion: SelectedAnswer = {
      question,
      answers,
      correctAnswer,
      userAnswer,
      isCorrect,
    };

    setSelectedAnswerList(prevList => [...prevList, nowAnswerWithQuestion]);
  };

  const goNextQuizPage = () => {
    if (isLastQuiz) {
      navigate('/result', { state: { selectedAnswerList } });
    } else {
      setSelectedAnswer('');
      setNowQuizPage(prevQuizPage => prevQuizPage + 1);
    }
  };

  return {
    nowQuizPage,
    maxQuizPage,
    selectedAnswer,
    nowQuizPageData,
    buttonAvailable,
    buttonLabel,
    changeSelectedAnswer,
    goNextQuizPage,
  };
}
