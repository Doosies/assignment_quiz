import { renderHook } from '@testing-library/react';

import { timer } from '@utils/test/time';
import { ONE_HOUR_MS, ONE_MINUTE_MS, ONE_SECOND_MS } from '@utils/time';

import { useTimer } from './useTimer';

vi.useFakeTimers();

describe('useTimer', () => {
  afterAll(() => {
    vi.useRealTimers();
  });

  [
    {
      scenario: '최초 렌더링시 00:00로 표시된다.',
      time: 0,
      expected: '00:00',
    },
    {
      scenario: '1초가 지나면 00:01로 표시된다.',
      time: ONE_SECOND_MS,
      expected: '00:01',
    },
    {
      scenario: '1분 1초가 지나면 01:01로 표시된다.',
      time: ONE_MINUTE_MS + ONE_SECOND_MS,
      expected: '01:01',
    },
    {
      scenario: '1시간 1분이 지나면 01:01:00로 표시된다.',
      time: ONE_HOUR_MS + ONE_MINUTE_MS,
      expected: '01:01:00',
    },
    {
      scenario: '1시간 1초가 지나면 01:00:01로 표시된다.',
      time: ONE_HOUR_MS + ONE_SECOND_MS,
      expected: '01:00:01',
    },
    {
      scenario: '1시간 1분 1초가 지나면 01:01:01로 표시된다.',
      time: ONE_HOUR_MS + ONE_MINUTE_MS + ONE_SECOND_MS,
      expected: '01:01:01',
    },
    {
      scenario: '23시간 59분 59초가 지나면 23:59:59로 표시된다.',
      time: ONE_HOUR_MS * 23 + ONE_MINUTE_MS * 59 + ONE_SECOND_MS * 59,
      expected: '23:59:59',
    },
    {
      scenario: '25시간이 지나면 25:00:00으로 표시된다.',
      time: ONE_HOUR_MS * 25,
      expected: '25:00:00',
    },
  ].forEach(({ scenario, time, expected }) => {
    it(scenario, () => {
      const { result } = renderHook(() => useTimer());

      timer(time);

      expect(result.current).toBe(expected);
    });
  });
});
