# 설치 & 실행 & 배포주소
```bash
# pnpm 설치 (없을경우)
> npm install -g pnpm

# 프로젝트 실행
> git clone https://github.com/Doosies/assignment_quiz
> pnpm i && pnpm run dev

# 프로젝트 테스트 실행
> pnpm run test
```
배포: https://assignment-quiz.pages.dev/


# 테스트 대상으로 선정한 이유
단위 테스트는 제일 작은 단위로 빠르게 테스트를 할 수 있어야 한다고 생각합니다.  
그래서 컴포넌트를 작개 쪼개고, 로직이 복잡한 컴포넌트 혹은 훅의 테스트를 진행 해 주었습니다.  
또, Page 컴포넌트의 경우 로직만 훅으로 분리해 테스트를 진행 해 주었습니다.  

- 모킹된 모듈을 사용하기 전 모듈을 검증하기 위한 단위 테스트
  - WrongNoteStore
- 로직을 검증하기 위한 테스트
  - useTimer.spec.ts
  - QuizBody.spec.tsx
- 페이지의 로직을 검증하기 위한 테스트
  - useTakeQuiz.spec.ts
  - useWrongNote.spec.tsx
  - useResultPage.spec.tsx

# 구현사항
## 컴포넌트, 훅
### Quiz
Quiz 컴포넌트의 경우에는 위, 본문, 아래로 책임을 나누어 아래처럼 사용할 수 있도록 구현 해 주었습니다.  
이렇게 분리해둬서 중요한 컴포넌트인 Quiz.Body만 테스트를 진행해도 됩니다.
```tsx

<Quiz>
  <Quiz.Top/>
  <Quiz.Body/>
  <Quiz.Bottom/>
</Quiz>
```
### Timer
useTimer 훅을 구현해 경과 시간을 표시 해 주었습니다.  
new Date().getTime() 을 사용해 시간을 계산한 이유는 setInterval은 정확히 ONE_SECOND_MS마다 실행되는게 보장되지 않기 때문입니다.
```tsx
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
```
### WrongNote
useState에서 처음에 오답노트를 로컬스토리지에서 불러옵니다.  
그 후에 현재 페이지에 맞는 데이터를 리턴 해 줍니다.  
만약 데이터가 0개라면 EmptyError를 throw해 상위의 ErrorBoundary에서 처리 해줍니다.

```tsx
const [{ wrongNoteItemList, maxPage }, setPageState] = useState(() => {
  const wrongNoteItemList = WrongNoteStore.getWrongNoteItemList();

  return {
    wrongNoteItemList,
    maxPage: wrongNoteItemList.length ? wrongNoteItemList.length - 1 : 0,
  };
});

if (wrongNoteItemList.length === 0) {
  throw new EmptyError('틀린 문제가 없습니다.');
}

const { nowPageNum, goNextPage, goPrevPage, isFistPage, isLastPage } = usePagination({ maxIdx: maxPage });

const nowQuizPageData = wrongNoteItemList[nowPageNum];

const removeNowWrongNote = () => {
  WrongNoteStore.removeWrongNoteByQustion(nowQuizPageData.question);

  setPageState(prev => ({
    ...prev,
    wrongNoteItemList: prev.wrongNoteItemList.filter((_, idx) => idx !== nowPageNum),
    maxPage: prev.maxPage - 1,
  }));

  if (nowPageNum === maxPage) {
    goPrevPage();
  }
};

return { nowPageNum, nowQuizPageData, isFistPage, isLastPage, goNextPage, goPrevPage, removeNowWrongNote };

```

## 메인 페이지
[Pull Request Link](https://github.com/Doosies/assignment_quiz/pull/19)

<img width="892" alt="스크린샷 2024-03-11 오전 1 10 03" src="https://github.com/Doosies/assignment_quiz/assets/43428643/08230428-c713-495a-b23d-d593f6f0435b">

## 퀴즈 페이지
[Pull Request Link](https://github.com/Doosies/assignment_quiz/pull/20)

![화면 기록 2024-03-11 오전 1 10 10](https://github.com/Doosies/assignment_quiz/assets/43428643/ca5203b3-06c8-4c04-b9e6-7ec6115707e3)

- 답안을 선택하면 다음 문제를 볼 수 있습니다.
- 답안이 맞았는지 바로 확인 가능합니다.
- 다음문항 버튼을 누르면 다음문항으로 이동합니다.
- 마지막 문제를 풀면 결과보기 버튼이 표시됩니다.


## 결과 페이지
[Pull Request Link](https://github.com/Doosies/assignment_quiz/pull/21)

![화면 기록 2024-03-11 오전 1 10 10](https://github.com/Doosies/assignment_quiz/assets/43428643/46eab67f-b7be-4eaa-ab8d-aaf00ee52dba)

- 퀴즈를 마칠 때까지 소요된 시간이 표시됩니다.
- 정답, 오답 개수가 표시됩니다.
- 정 오답 비율이 차트로 표시됩니다.
- 오답노트 저장하기 버튼을 누르면 로컬 스토리지에 저장됩니다.

## 오답노트 페이지
[Pull Request Link](https://github.com/Doosies/assignment_quiz/pull/22)

![화면 기록 2024-03-11 오전 1 19 56](https://github.com/Doosies/assignment_quiz/assets/43428643/d5a5b61c-967c-49f9-ad59-384b011f0484)

- 로컬스토리지에 저장된 틀린 문제들을 불러옵니다.
- 문항 제거 버튼을 누르면 로컬스토리지에서 제거합니다.
- 만약 틀린 문제가 하나도 없다면 틀린문제가 없다는 화면을 표시합니다.

# Features

## Components

### Timer

- [x] 마운트 되면 0초부터 시작한다.
- [x] 초기값을 props로 받을 수 있다.

### ProgressBar

- [x] min, now, max, type을 props로 받는다.
- [x] type default === 'text' 이다.
- [x] type === 'bar'면 바 형태로 표시한다.
- [x] type === 'text'면 텍스트 형태로 표시한다.

### TopBar

- [x] props로 title을 받는다.
- [x] 왼쪽 상단의 버튼을 누르면 `/`로 이동한다.

### QuizTop 구현

- [x] title, nowQuizPage, maxQuizPage를 props로 받는다.
- [x] 퀴즈 제목, progress bar, timer가 표시된다.

### QuizBody구현

- [x] answers, correctAnswer, userAnswer props로 받는다.
- [x] userAnswer가 있으면 선택한 보기를 표시하는데 선택할 수 없다.
  - [x] answers를 map으로 돌면서 각 보기를 표시한다.
    - [x] 현재 보기가 correctAnswer이면 초록색으로 표시한다.
    - [x] 현재 보기가 userAnswer이면 빨간색으로 표시한다.
- [x] userAnswer가 없으면 선택할 수 있는 보기를 표시한다.
- [x] userAnswer가 있으면 선택할 수 없다.

### Quiz 구현

- 퀴즈의 최상단 Cotainer 컴포넌트이다.

## 메인 페이지

- [x] 메인 페이지에서 버튼을 누르면 다음 페이지로 이동할 수 있다.
  - [x] 퀴즈 풀기: 퀴즈 푸는 페이지로 이동
  - [x] 오답 노트: 오탑노트 페이지로 이동

## 퀴즈 풀기 페이지 (quiz)

- [x] 페이지에 입장하면 서버로부터 퀴즈를 불러온다.
- [x] 현재/전체 문항수를 볼 수있다.
- [x] 퀴즈를 풀기 `시작하면 타이머가 시작`된다.
- [x] 문항에 대한 답을 4개의 보기 중에서 선택할 수 있다.
  - [x] 정답을 한번 고르면 `변경할 수 없다`.
  - [x] 만약 선택한게 `오답`이면
    - [x] 정답인 보기는 초록색으로 표시된다.
    - [x] 선택한 보기는 빨간색으로 표시된다.
    - [x] 임시 오답노트에 추가된다.
  - [x] 만약 선택한게 `정답`이면
    - [x] 선택한 보기는 초록색으로 표시된다.
    - [x] 다음문항 버튼이 활성화된다.
- [x] 다음문항 버튼을 누르면 다음 문항으로 이동된다.
  - [x] 답안중 한개를 선택해야 화면에 다음문제 버튼이 화면에 표시된다.
  - [x] 마지막 문항에서는 다음문제 버튼이 결과보기 버튼으로 변경된다.

## 결과 페이지 (result)

- [x] state로 걸린시간, 정답개수, 오답개수, 임시 오답리스트를 넘겨받는다.
- [x] state를 받지 못했다면 error 페이지로 이동한다.
- [x] 정답률은 차트로 표시한다.
- [x] 임시 오답리스트를 로컬스토리지의 오답노트에 추가한다.

## 오답노트 페이지 (wrong-note)

- [x] 로컬 스토리지에 저장된 오답노트를 불러온다.
- [x] 지금까지 퀴즈를 풀며 틀린 문항을 모두 볼 수 있다.
- [x] 이전문항 버튼을 누르면 이전 오답으로 이동한다.
  - [x] 만약 첫번째 오답이라면 버튼이 표시되지 않는다.
- [x] 다음문항 버튼을 누르면 다음 오답으로 이동한다.
  - [x] 만약 마지막 오답이라면 버튼이 표시되지 않는다.
- [x] 문항 제거 버튼을 누르면 오답노트에서 제거 표시 후 다음 오답으로 이동한다.
- [x] 오답노트에서 모든 문제를 풀었다면 `틀린 문제가 없습니다.` 화면을 띄운다.
