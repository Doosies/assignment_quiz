import { useState } from 'react';

import { usePagination } from '@hooks/common/usePagination';

import { WrongNoteStore } from '@utils/WrongNoteStore';
import { EmptyError } from '@utils/errors';

export function useWrongNote() {
  const [{ wrongNoteItemList, maxPage }, setPageState] = useState(() => {
    const wrongNoteItemList = WrongNoteStore.getWrongNoteItemList();

    return {
      wrongNoteItemList,
      maxPage: wrongNoteItemList.length ? wrongNoteItemList.length - 1 : 0,
    };
  });

  if (wrongNoteItemList.length === 0) {
    throw new EmptyError('틀린 문제가 없습니다.');
  }

  const { nowPageNum, goNextPage, goPrevPage, isFistPage, isLastPage } = usePagination({ maxIdx: maxPage });

  const nowQuizPageData = wrongNoteItemList[nowPageNum];

  const removeNowWrongNote = () => {
    WrongNoteStore.removeWrongNoteByQustion(nowQuizPageData.question);

    setPageState(prev => ({
      ...prev,
      wrongNoteItemList: prev.wrongNoteItemList.filter((_, idx) => idx !== nowPageNum),
      maxPage: prev.maxPage - 1,
    }));

    if (nowPageNum === maxPage) {
      goPrevPage();
    }
  };

  return { nowPageNum, nowQuizPageData, isFistPage, isLastPage, goNextPage, goPrevPage, removeNowWrongNote };
}
