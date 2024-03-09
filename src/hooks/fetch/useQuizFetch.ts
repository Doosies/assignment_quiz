import axios from 'axios';

import { useEffect, useState } from 'react';

import { QUIZ_API_URL } from '@constants/APIs';

interface Quiz {
  question: string;
  answers: string[];
  correctAnswer: string;
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

async function fetchQuiz(maxQuizPage: number) {
  const response = await axios.get<QuizResponse>(`${QUIZ_API_URL}&amount=${maxQuizPage}`);
  console.log(response);

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

const promiseWrapper = <T>(promise: Promise<T>): (() => T | never) => {
  let status: string = 'pending';
  let result: T;

  const suspender = promise.then(
    value => {
      status = 'success';
      result = value;
    },
    error => {
      status = 'error';
      result = error;
    },
  );

  return () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'success':
        return result;
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status');
    }
  };
};

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
      // const response =  ;
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
    console.log('!#!@#*&!@(*#@&');
    refetch();
  }, []);

  return { isLoading, isError, data, error, refetch };
}
