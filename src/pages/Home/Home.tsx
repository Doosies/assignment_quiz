import { useState } from 'react';

import { ProgressBar } from '@components/common';

export function Home() {
  const [now, setNow] = useState(0);

  return (
    <div>
      <ProgressBar
        now={now}
        max={7}
        onlyText
      />
      <ProgressBar
        now={now}
        max={7}
      />
      <br />
      <button onClick={() => setNow(now + 1)}>Increment</button>
    </div>
  );
}
