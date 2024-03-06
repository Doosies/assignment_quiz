import { useEffect, useRef, useState } from 'react';

import { toTimeString } from '@utils/string';
import { ONE_SECOND_MS } from '@utils/time';

export function useTimer(initialTime = 0) {
  const startTime = useRef(0);
  const [nowTime, setNowTime] = useState(initialTime);

  useEffect(() => {
    startTime.current = new Date().getTime();

    const interval = setInterval(() => {
      const timeDiff = new Date().getTime() - startTime.current;
      const timeDiffInSeconds = Math.floor(timeDiff / ONE_SECOND_MS);
      setNowTime(timeDiffInSeconds);
    }, ONE_SECOND_MS);

    return () => clearInterval(interval);
  }, []);

  return toTimeString(nowTime);
}
