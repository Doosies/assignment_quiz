import { useState } from 'react';

import { ProgressBar } from '@components/common';
import { Button } from '@components/common';

export function HomePage() {
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
      <Button onClick={() => setNow(now + 1)}>Increment</Button>
    </div>
  );
}
