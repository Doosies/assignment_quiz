import { act } from '@testing-library/react';

export function timer(time: number) {
  act(() => {
    vi.advanceTimersByTime(time);
  });
}
