import { useState } from 'react';

interface usePaginationParams {
  nowIdx?: number;
  maxIdx?: number;
}
export function usePagination({ nowIdx = 0, maxIdx = 0 }: usePaginationParams = {}) {
  const [nowPageNum, setNowPageNum] = useState(nowIdx);

  const isLastPage = nowPageNum === maxIdx;

  const goNextPage = () => {
    setNowPageNum(prevPage => prevPage + 1);
  };

  return { nowPageNum, isLastPage, goNextPage };
}
