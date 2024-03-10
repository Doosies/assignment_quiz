import { useState } from 'react';

interface usePaginationParams {
  nowIdx?: number;
  maxIdx?: number;
}
export function usePagination({ nowIdx = 0, maxIdx = 0 }: usePaginationParams = {}) {
  const [nowPageNum, setNowPageNum] = useState(nowIdx);

  const isFistPage = nowPageNum === 0;
  const isLastPage = nowPageNum === maxIdx;

  const goNextPage = () => {
    if (isLastPage) {
      return;
    }
    setNowPageNum(prevPage => prevPage + 1);
  };

  const goPrevPage = () => {
    if (isFistPage) {
      return;
    }
    setNowPageNum(prevPage => prevPage - 1);
  };

  return { nowPageNum, isLastPage, isFistPage, goPrevPage, goNextPage };
}
