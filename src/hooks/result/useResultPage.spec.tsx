/* eslint-disable @typescript-eslint/no-explicit-any */
import { useResultPage } from '.';

import { renderHook } from '@testing-library/react';

// import { stringToSha1 } from '';

const useNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  useNavigate: () => useNavigate,
}));
vi.mock('@utils/hashing', () => ({
  stringToSha1: vi.fn().mockReturnValue('ABCD'),
}));

describe('useResultPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('state가 주어지지 않으면 에러를 던진다', () => {
    expect(() => useResultPage()).toThrow('잘못된 요청입니다.');
  });

  it('올바른 state가 주어지면 PieChart에 넣을 값이 리턴된다.', () => {
    const state = {
      selectedAnswerList: [
        {
          question: '다음 중 가장 큰 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '4',
          userAnswer: '3',
          isCorrect: false,
        },
        {
          question: '다음 중 가장 작은 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '1',
          userAnswer: '1',
          isCorrect: true,
        },

        {
          question: '다음 중 영어는?',
          answers: ['1', '2', 'b', '4'],
          correctAnswer: 'b',
          userAnswer: '1',
          isCorrect: false,
        },
      ],
      timer: '00:10',
    };

    const { result } = renderHook(() => useResultPage(state));

    expect(result.current.pieChartDatas).toEqual([
      { title: '틀린 문제', value: 2, color: '#F44336' },
      { title: '맞은 문제', value: 1, color: '#4CAF50' },
    ]);

    expect(result.current.resultInformations).toEqual([
      { title: '맞은 문제', value: '1 개' },
      { title: '틀린 문제', value: '2 개' },
      { title: '걸린 시간', value: '00분 10초' },
    ]);
  });

  it('goHome 함수를 호출하면 "/"로 이동한다.', () => {
    const state = {
      selectedAnswerList: [
        {
          question: '다음 중 가장 큰 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '4',
          userAnswer: '3',
          isCorrect: false,
        },
      ],
      timer: '00:15',
    };
    const { result } = renderHook(() => useResultPage(state));

    result.current.goHome();

    expect(useNavigate).toBeCalledWith('/', { replace: true });
  });

  it('saveWrongNote 를 호출하고 이전에 푼문제면 count를 더해 로컬스토리지에 저장한다.', async () => {
    // 첫번째 get은 wrongCounter, 두번째 get은 wrongNoteItems
    const getItem = vi.fn().mockReturnValueOnce('{"ABCD":20}').mockReturnValueOnce('{}');
    const setItem = vi.fn();

    window.localStorage = {
      getItem,
      setItem,
    } as any;

    const { result } = renderHook(() =>
      useResultPage({
        selectedAnswerList: [
          {
            question: '다음 중 가장 큰 숫자는?',
            answers: ['1', '2', '3', '4'],
            correctAnswer: '4',
            userAnswer: '3',
            isCorrect: false,
          },
        ],
        timer: '00:15',
      }),
    );

    await result.current.saveWrongNote();

    expect(getItem).toBeCalledWith('wrongCounter');
    expect(getItem).toBeCalledWith('wrongNoteItems');

    expect(setItem).toHaveBeenCalledWith('wrongCounter', JSON.stringify({ ABCD: 21 }));
    expect(setItem).toHaveBeenCalledWith(
      'wrongNoteItems',
      JSON.stringify({
        ABCD: {
          question: '다음 중 가장 큰 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '4',
          userAnswer: '3',
          count: 21,
        },
      }),
    );
  });
});
