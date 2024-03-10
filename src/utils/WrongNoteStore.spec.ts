/* eslint-disable @typescript-eslint/no-explicit-any */
import { WrongNoteStore } from './WrongNoteStore';

vi.mock('./hashing');

describe('WrongNoteStore', () => {
  const getItem = vi.fn();
  const setItem = vi.fn();

  beforeAll(() => {
    window.localStorage = {
      getItem,
      setItem,
    } as any;
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getFromLocalStorage 함수는 localStorage에서 wrongCounter와 wrongNoteItems를 가져온다.', () => {
    getItem
      // 첫번째 get은 wrongCounter
      .mockReturnValueOnce(JSON.stringify({ ABCD: 20 }))
      // 두번째 get은 wrongNoteItems
      .mockReturnValueOnce(
        JSON.stringify({
          ABCD: {
            question: '다음 중 가장 큰 숫자는?',
            answers: ['1', '2', '3', '4'],
            correctAnswer: '4',
            userAnswer: '3',
            count: 20,
          },
        }),
      );

    const result = WrongNoteStore.getFromLocalStorage();

    expect(getItem).toBeCalledWith('wrongCounter');
    expect(getItem).toBeCalledWith('wrongNoteItems');

    expect(result).toEqual({
      wrongCounter: { ABCD: 20 },
      wrongNoteItems: {
        ABCD: {
          question: '다음 중 가장 큰 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '4',
          userAnswer: '3',
          count: 20,
        },
      },
    });
  });

  it('set 함수는 wrongCounter와 wrongNoteItems를 localStorage에 저장한다.', async () => {
    await WrongNoteStore.set([
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '4',
        userAnswer: '3',
        isCorrect: false,
      },
    ]);

    expect(getItem).toBeCalledWith('wrongCounter');
    expect(getItem).toBeCalledWith('wrongNoteItems');

    expect(setItem).toBeCalledWith('wrongCounter', JSON.stringify({ ABCD: 1 }));
    expect(setItem).toBeCalledWith(
      'wrongNoteItems',
      JSON.stringify({
        ABCD: {
          question: '다음 중 가장 큰 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '4',
          userAnswer: '3',
          count: 1,
        },
      }),
    );
  });

  it('getWrongNoteItemList 함수는 wrongNoteItems를 배열로 반환한다.', () => {
    getItem.mockReturnValueOnce(JSON.stringify({ ABCD: 30 })).mockReturnValueOnce(
      JSON.stringify({
        ABCD: {
          question: '다음 중 가장 큰 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '4',
          userAnswer: '3',
          count: 30,
        },
      }),
    );

    const result = WrongNoteStore.getWrongNoteItemList();

    expect(result).toEqual([
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '4',
        userAnswer: '3',
        count: 30,
      },
    ]);
  });

  it('removeWrongNoteByQustion 함수는 wrongNoteItems에서 해당 문제를 삭제한다.', async () => {
    getItem.mockReturnValueOnce(JSON.stringify({ ABCD: 30 })).mockReturnValueOnce(
      JSON.stringify({
        ABCD: {
          question: '다음 중 가장 큰 숫자는?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '4',
          userAnswer: '3',
          count: 30,
        },
      }),
    );

    await WrongNoteStore.removeWrongNoteByQustion('다음 중 가장 큰 숫자는?');

    expect(setItem).toBeCalledWith('wrongNoteItems', JSON.stringify({}));
  });
});
