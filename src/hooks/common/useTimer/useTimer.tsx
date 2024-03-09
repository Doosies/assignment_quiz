import { useEffect, useRef, useState } from 'react';

import { toTimeString } from '@utils/string';
import { ONE_SECOND_MS } from '@utils/time';

export function useTimer(initialMilliseconds = 0) {
  const startTime = useRef(0);
  const [nowTime, setNowTime] = useState(0);

  useEffect(() => {
    startTime.current = new Date().getTime();

    const interval = setInterval(() => {
      const timeDiff = new Date().getTime() - startTime.current;
      const timeDiffInSeconds = Math.floor(timeDiff / ONE_SECOND_MS);
      setNowTime(timeDiffInSeconds);
    }, ONE_SECOND_MS);

    return () => clearInterval(interval);
  }, []);

  const { hours, minutes, seconds } = toTimeString(nowTime + initialMilliseconds);

  if (Number(hours) > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
