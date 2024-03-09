import axios from 'axios';

import { useEffect, useState } from 'react';

import { QUIZ_API_URL } from '@constants/APIs';

import { promiseWrapper } from '@utils/async';

async function fetchQuiz(maxQuizPage: number) {
  const response = await axios.get<QuizResponse>(`${QUIZ_API_URL}&amount=${maxQuizPage}`);

  const results = response.data.results;

  const quiz = results.map(result => {
    const { question, correct_answer, incorrect_answers } = result;
    const sortedAnswers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
    return {
      question,
      answers: sortedAnswers,
      correctAnswer: correct_answer,
    };
  });

  return quiz;
}

export function useQuizFetch(maxQuizPage = 4) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Quiz[] | undefined>();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>();

  if (isError && error) {
    throw error;
  }

  const refetch = async () => {
    setIsLoading(true);
    setError('');
    setIsError(false);

    try {
      const promise = fetchQuiz(maxQuizPage);
      setData(promiseWrapper(promise));
    } catch (error: unknown) {
      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { isLoading, isError, data, error, refetch };
}
