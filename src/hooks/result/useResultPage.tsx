import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { timeStringToKorean } from '@utils/string';
import { isResultPageLocationState } from '@utils/typeGuard';

export function useResultPage(state: ResultPageLocationState) {
  const navigate = useNavigate();

  const correctAnswerCount = state?.selectedAnswerList.filter(answer => answer.isCorrect).length;
  const wrongAnswerCount = state?.selectedAnswerList.filter(answer => !answer.isCorrect).length;

  const pieChartDatas = [
    correctAnswerCount ? { title: '맞은 문제', value: correctAnswerCount, color: '#4CAF50' } : {},
    wrongAnswerCount ? { title: '틀린 문제', value: wrongAnswerCount, color: '#F44336' } : {},
  ].filter(data => Object.keys(data).length);

  const resultInformations = [
    { title: '맞은 문제', value: `${correctAnswerCount} 개` },
    { title: '틀린 문제', value: `${wrongAnswerCount} 개` },
    { title: '걸린 시간', value: timeStringToKorean(state.timer) },
  ];

  useEffect(() => {
    if (!isResultPageLocationState(state)) {
      throw new Error('잘못된 요청입니다.');
    }
  }, []);

  const goHome = () => {
    navigate('/', { replace: true });
  };

  const saveWrongNote = () => {
    // TODO: localStorage에 오답노트 저장하기
    goHome();
  };

  return {
    pieChartDatas,
    resultInformations,
    goHome,
    saveWrongNote,
  };
}
