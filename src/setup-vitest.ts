import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';

// test 간 DOM 상태를 초기화
afterEach(() => {
  cleanup();
});
