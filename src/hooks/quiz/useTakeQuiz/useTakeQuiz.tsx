import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePagination } from '@hooks/common/usePagination';

interface useTakeQuizParams {
  quiz?: Quiz[];
  timer?: string;
}

export function useTakeQuiz({ quiz, timer = '00:00' }: useTakeQuizParams) {
  const navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedAnswerList, setSelectedAnswerList] = useState<SelectedAnswer[]>([]);

  const maxPage = quiz?.length ? quiz.length - 1 : 0;
  const { nowPageNum, isLastPage, goNextPage } = usePagination({ maxIdx: maxPage });
  const nowQuizPageData = quiz?.[nowPageNum];

  const buttonAvailable = selectedAnswer !== '';
  const buttonLabel = isLastPage ? '결과 확인' : '다음 문항';

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
    if (isLastPage) {
      navigate('/result', { state: { selectedAnswerList, timer }, replace: true });
    } else {
      setSelectedAnswer('');
      goNextPage();
    }
  };

  return {
    nowQuizPage: nowPageNum,
    maxQuizPage: maxPage,
    selectedAnswer,
    nowQuizPageData,
    buttonAvailable,
    buttonLabel,
    changeSelectedAnswer,
    goNextQuizPage,
  };
}
