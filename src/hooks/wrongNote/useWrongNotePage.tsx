import { useState } from 'react';

import { usePagination } from '@hooks/common/usePagination';

import { WrongNote } from '@utils/WrongNote';

export function useWrongNotePage() {
  const [{ wrongNoteItemList, maxPage }] = useState(() => {
    const wrongNoteItemList = WrongNote.getWrongNoteItemList();

    return {
      wrongNoteItemList,
      maxPage: wrongNoteItemList.length ? wrongNoteItemList.length - 1 : 0,
    };
  });

  const { nowPageNum, goNextPage, goPrevPage, isFistPage, isLastPage } = usePagination({ maxIdx: maxPage });

  const nowQuizPageData = wrongNoteItemList[nowPageNum];

  return { nowPageNum, nowQuizPageData, isFistPage, isLastPage, goNextPage, goPrevPage };
}
