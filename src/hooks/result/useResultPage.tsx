import { useNavigate } from 'react-router-dom';

import { WrongNote } from '@utils/WrongNote';
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

    await WrongNote.set(wronAnswers);

    goHome();
  };

  return {
    pieChartDatas,
    resultInformations,
    goHome,
    saveWrongNote,
  };
}
