/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWrongNote } from '.';

import { act, renderHook } from '@testing-library/react';

import { WrongNoteStore } from '@utils/WrongNoteStore';
import { EmptyError } from '@utils/errors';

vi.mock('@utils/WrongNoteStore');

describe('useWrongNote', () => {
  beforeAll(() => {
    // 해당 훅에서 던지는 error boundary 에러를 없애기 위한 코드
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('처음에 훅을 호출하면 틀린 문제 리스트를 가져와서 상태로 저장한다.', () => {
    const wrongNoteItemList: WrongNoteItem[] = [
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '4',
        userAnswer: '3',
        count: 20,
        isCorrect: false,
      },
    ];
    vi.spyOn(WrongNoteStore, 'getWrongNoteItemList').mockReturnValue(wrongNoteItemList);

    const { result } = renderHook(() => useWrongNote());

    expect(result.current.nowQuizPageData).toEqual(wrongNoteItemList[0]);
    expect(result.current.isFistPage).toBe(true);
    expect(result.current.isLastPage).toBe(true);
    expect(result.current.nowPageNum).toBe(0);
  });

  it('틀린 문제가 없으면 에러를 던진다.', () => {
    vi.spyOn(WrongNoteStore, 'getWrongNoteItemList').mockReturnValue([]);

    expect(() => {
      renderHook(() => useWrongNote());
    }).toThrowError(new EmptyError('틀린 문제가 없습니다.'));
  });

  it('페이지가 바뀌면 바뀐 페이지의 데이터를 리턴한다.', () => {
    const wrongNoteItemList: WrongNoteItem[] = [
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '4',
        userAnswer: '3',
        count: 20,
        isCorrect: false,
      },
      {
        question: '다음 중 가장 작은 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '1',
        userAnswer: '1',
        count: 20,
        isCorrect: true,
      },
    ];
    vi.spyOn(WrongNoteStore, 'getWrongNoteItemList').mockReturnValue(wrongNoteItemList);

    const { result } = renderHook(() => useWrongNote());

    expect(result.current.nowQuizPageData).toEqual(wrongNoteItemList[0]);
    expect(result.current.isFistPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);
    expect(result.current.nowPageNum).toBe(0);

    act(() => {
      result.current.goNextPage();
    });

    expect(result.current.nowQuizPageData).toEqual(wrongNoteItemList[1]);
    expect(result.current.isFistPage).toBe(false);
    expect(result.current.isLastPage).toBe(true);
    expect(result.current.nowPageNum).toBe(1);
  });
  it('현재 페이지의 문제를 제거하면 다음 페이지로 넘어간다.', () => {
    const wrongNoteItemList: WrongNoteItem[] = [
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '4',
        userAnswer: '3',
        count: 20,
        isCorrect: false,
      },
      {
        question: '다음 중 가장 작은 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '1',
        userAnswer: '1',
        count: 20,
        isCorrect: true,
      },
    ];
    vi.spyOn(WrongNoteStore, 'getWrongNoteItemList').mockReturnValue(wrongNoteItemList);

    const { result } = renderHook(() => useWrongNote());

    act(() => {
      result.current.removeNowWrongNote();
    });

    expect(result.current.nowQuizPageData).toEqual(wrongNoteItemList[1]);
    expect(result.current.isFistPage).toBe(true);
    expect(result.current.isLastPage).toBe(true);
    expect(result.current.nowPageNum).toBe(0);
  });

  it('페이지를 제거했는데 남아있지 않다면 에러를 던진다.', () => {
    const wrongNoteItemList: WrongNoteItem[] = [
      {
        question: '다음 중 가장 큰 숫자는?',
        answers: ['1', '2', '3', '4'],
        correctAnswer: '4',
        userAnswer: '3',
        count: 20,
        isCorrect: false,
      },
    ];
    vi.spyOn(WrongNoteStore, 'getWrongNoteItemList').mockReturnValue(wrongNoteItemList);

    const { result } = renderHook(() => useWrongNote());

    expect(() => {
      act(() => {
        vi.spyOn(WrongNoteStore, 'getWrongNoteItemList').mockReturnValue([]);
        result.current.removeNowWrongNote();
      });
    }).toThrowError(new EmptyError('틀린 문제가 없습니다.'));
  });
});
