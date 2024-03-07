import { QuizBody } from '.';

import { render } from '@testing-library/react';

import { CORRECT_ANSWER_STRING, WRONG_ANSWER_STRING } from '@constants/quiz';

import { circledNumber } from '@utils/string';

describe('QuizBody', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('화면에 선택지가 표시된다.', () => {
    const answers = ['t1', 'tt2', 'ttt3', 'ttt4'];

    const { getByText } = render(
      <QuizBody
        answers={answers}
        correctAnswer={'t1'}
      />,
    );

    answers.forEach(answer => {
      expect(getByText(answer)).toBeInTheDocument();
    });
  });

  [
    {
      scenario: 'userAnswer가 있을경우 클릭할 수 있다.',
      correctAnswer: 't1',
      userAnswer: 't1',
    },
    {
      scenario: 'userAnswer가 없을경우 클릭할 수 없다.',
      correctAnswer: 't1',
    },
  ].forEach(({ scenario, correctAnswer, userAnswer }) => {
    it(scenario, () => {
      const answers = ['t1', 'tt2', 'ttt3', 'ttt4'];
      const onClick = vi.fn();

      const { getByText } = render(
        <QuizBody
          answers={answers}
          correctAnswer={correctAnswer}
          userAnswer={userAnswer}
          onClick={onClick}
        />,
      );

      // userAnswer가 있으면 클릭할 수 있다.
      const firstAnswerElement = getByText(answers[0]);
      if (userAnswer) {
        firstAnswerElement.click();
        expect(onClick).toBeCalledWith(answers[0]);
      }
      // userAnswer가 없으면 클릭할 수 없다.
      else {
        expect(onClick).not.toBeCalled();
      }
    });
  });

  [
    {
      scenario: 'userAnswer가 틀릴경우 하단에 틀렸다는 문구가 표시된다.',
      correctAnswer: 't1',
      userAnswer: 'tt2',
      expected: `${WRONG_ANSWER_STRING}${circledNumber(1)} t1`,
    },
    {
      scenario: 'userAnswer가 맞을경우 하단에 맞았다는 문구가 표시된다.',
      correctAnswer: 't1',
      userAnswer: 't1',
      expected: CORRECT_ANSWER_STRING,
    },
  ].forEach(({ scenario, correctAnswer, userAnswer, expected }) => {
    it(scenario, () => {
      const answers = ['t1', 'tt2', 'ttt3', 'ttt4'];

      const { getByText } = render(
        <QuizBody
          answers={answers}
          correctAnswer={correctAnswer}
          userAnswer={userAnswer}
        />,
      );

      const expectedElement = getByText(expected);
      expect(expectedElement).toBeInTheDocument();
    });
  });

  [
    {
      scenario: '답을 맞췄을 경우 정답에 해당하는 선택지만 파란색으로 표시된다.',
      correctAnswer: 't1',
      userAnswer: 't1',
    },
    {
      scenario: '답을 틀렸을 경우 정답에 해당하는 선택지는 파란색, 오답은 빨간색으로 표시된다.',
      correctAnswer: 't1',
      userAnswer: 'tt2',
    },
  ].forEach(({ scenario, correctAnswer, userAnswer }) => {
    it(scenario, () => {
      const answers = ['t1', 'tt2', 'ttt3', 'ttt4'];
      const correctColor = 'text-blue';
      const wrongColor = 'text-red';

      const { getByText } = render(
        <QuizBody
          answers={answers}
          correctAnswer={correctAnswer}
          userAnswer={userAnswer}
        />,
      );

      answers.forEach(answer => {
        const answerElement = getByText(answer);
        // 정답이 입력되면 기본적으로 정답색으로 표시된다.
        if (answer === correctAnswer) {
          expect(answerElement).toHaveClass(correctColor);
        }
        // 만약 유저가 틀린 답을 선택했다면 그 답은 오답색으로 표시된다.
        if (answer === userAnswer && answer !== correctAnswer) {
          expect(answerElement).toHaveClass(wrongColor);
        }
      });
    });
  });
});
