import { useNavigate } from 'react-router-dom';

import { stringToSha1 } from '@utils/hashing';
import { timeStringToKorean } from '@utils/string';
import { isResultPageLocationState } from '@utils/typeGuard';

export function useResultPage(state?: ResultPageLocationState) {
  if (!isResultPageLocationState(state)) {
    throw new Error('잘못된 요청입니다.');
  }

  const navigate = useNavigate();

  const correctAnswerCount = state?.selectedAnswerList.filter(answer => answer.isCorrect).length;
  const wrongAnswerCount = state?.selectedAnswerList.filter(answer => !answer.isCorrect).length;

  const pieChartDatas = [{ title: '틀린 문제', value: wrongAnswerCount, color: '#F44336' }];
  if (correctAnswerCount) {
    pieChartDatas.push({ title: '맞은 문제', value: correctAnswerCount, color: '#4CAF50' });
  }

  const resultInformations = [
    { title: '맞은 문제', value: `${correctAnswerCount} 개` },
    { title: '틀린 문제', value: `${wrongAnswerCount} 개` },
    { title: '걸린 시간', value: timeStringToKorean(state.timer) },
  ];

  const goHome = () => {
    navigate('/', { replace: true });
  };

  const saveWrongNote = async () => {
    const wronAnswers = state?.selectedAnswerList.filter(answer => !answer.isCorrect);

    const wrongCounter = JSON.parse(localStorage.getItem('wrongCounter') ?? '{}');
    const wrongNoteItems = JSON.parse(localStorage.getItem('wrongNoteItems') ?? '{}');

    const wrongAnswerPromises = wronAnswers.map(async wrongAnswer => {
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

    goHome();
  };

  return {
    pieChartDatas,
    resultInformations,
    goHome,
    saveWrongNote,
  };
}
