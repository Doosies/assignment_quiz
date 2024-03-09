import { useTakeQuiz } from '.';

import { act, renderHook } from '@testing-library/react';

const useNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  useNavigate: () => useNavigate,
}));

describe('useTakeQuiz', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('최초 렌더링시 초기값을 반환한다.', () => {
    const quizData = [
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '4',
      },
      {
        question: '다음 중 가장 작은 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '1',
      },
    ];

    const { result } = renderHook(() => useTakeQuiz({ quiz: quizData }));

    expect(result.current.nowQuizPage).toBe(0);
    expect(result.current.selectedAnswer).toBe('');
    expect(result.current.nowQuizPageData).toEqual(quizData[0]);
    expect(result.current.maxQuizPage).toBe(2);
    expect(result.current.buttonAvailable).toBe(false);
    expect(result.current.buttonLabel).toBe('다음 문항');
  });

  it('사용자가 정답을 한개 고르면 버튼이 활성화된다.', () => {
    const quizData = [
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        // 4개중 랜덤하게 선택
        correctAnswer: Math.floor(Math.random() * 4).toString(),
      },
    ];

    const { result } = renderHook(() => useTakeQuiz({ quiz: quizData }));

    // 정답을 선택하지 않은 상태
    expect(result.current.buttonAvailable).toBe(false);
    expect(result.current.selectedAnswer).toBe('');

    // 정답을 선택한다.
    act(() => {
      result.current.changeSelectedAnswer('4');
    });

    // 정답을 선택한 상태
    expect(result.current.buttonAvailable).toBe(true);
    expect(result.current.selectedAnswer).toBe('4');
  });

  [
    {
      scenario: '사용자가 정답을 고르고 다음 문항 버튼을 누르면 다음 문항으로 이동한다.',
      correctAnswer: '4',
      selectedAnswer: '4',
    },
    {
      scenario: '사용자가 오답을 고르고 다음 문항 버튼을 누르면 다음 문항으로 이동한다.',
      correctAnswer: '4',
      selectedAnswer: '3',
    },
  ].forEach(({ scenario, selectedAnswer, correctAnswer }) => {
    it(scenario, () => {
      const quizData = [
        {
          question: '다음 중 가장 큰 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer,
        },
        {
          question: '다음 중 가장 작은 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer,
        },
      ];

      const { result } = renderHook(() => useTakeQuiz({ quiz: quizData }));

      // 정답을 선택한다.
      act(() => {
        result.current.changeSelectedAnswer(selectedAnswer);
      });
      // 다음 문항 버튼을 누른다.
      act(() => {
        result.current.goNextQuizPage();
      });

      expect(result.current.nowQuizPage).toBe(1);
      expect(result.current.nowQuizPageData).toEqual(quizData[1]);
    });
  });

  it('사용자가 마지막 문항에서 결과 확인 버튼을 누르면 결과 페이지로 이동한다.', () => {
    const quizData = [
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '1',
      },
    ];

    const { result } = renderHook(() => useTakeQuiz({ quiz: quizData }));

    // 정답을 선택한다.
    act(() => {
      result.current.changeSelectedAnswer('4');
    });
    // 결과 확인 버튼을 누른다.
    act(() => {
      result.current.goNextQuizPage();
    });

    expect(useNavigate).toHaveBeenCalledWith('/result', {
      state: {
        selectedAnswerList: [
          {
            ...quizData[0],
            userAnswer: '4',
            isCorrect: false,
          },
        ],
      },
    });
  });

  it('결과 페이지로 이동하면 선택한 답안 목록을 전달한다.', () => {
    const quizData = [
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '1',
      },
      {
        question: '다음 중 가장 작은 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '4',
      },
      {
        question: '다음중 영어는?',
        answers: ['1', '2', '', '4'],
        correctAnswer: 'b',
      },
    ];

    const { result } = renderHook(() => useTakeQuiz({ quiz: quizData }));

    // 유저가 답안을 고른 후 마지막 문항에서 결과 확인 버튼을 누른다.
    ['2', '4', 'b'].forEach(selectedAnswer => {
      // 정답을 선택한다.
      act(() => {
        result.current.changeSelectedAnswer(selectedAnswer);
      });

      // 마지막 문항이 아니라면 다음 문항 버튼을 누른다.
      // 마지막 문항에서 결과 확인 버튼을 누른다.
      act(() => {
        result.current.goNextQuizPage();
      });
    });

    // 유저가 성택한 답안 목록이 결과 페이지로 전달된다.
    expect(useNavigate).toHaveBeenCalledWith('/result', {
      state: {
        selectedAnswerList: [
          {
            ...quizData[0],
            userAnswer: '2',
            isCorrect: false,
          },
          {
            ...quizData[1],
            userAnswer: '4',
            isCorrect: true,
          },
          {
            ...quizData[2],
            userAnswer: 'b',
            isCorrect: true,
          },
        ],
      },
    });
  });
});
