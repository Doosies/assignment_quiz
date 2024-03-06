# Features

## Components

### BottomBar

- [ ] 페이지 하단에 위치한다.
- [ ] 홈으로, 퀴즈풀기, 오답노트 버튼을 표시한다.

### Timer

- [ ] 마운트 되면 0초부터 시작한다.
- [ ] 초기값을 props로 받을 수 있다.

### ProgressBar

- [ ] min, now, max, type을 props로 받는다.
- [ ] type default === 'text' 이다.
- [ ] type === 'bar'면 바 형태로 표시한다.
- [ ] type === 'text'면 텍스트 형태로 표시한다.

### QuizTop 구현

- [ ] title을 props로 받는다.
- [ ] 만약 childen이 있다면 title 하단에 표시한다.

### QuizItem 구현

- [ ] answers, correctAnswer, userAnswer props로 받는다.
- [ ] userAnswer가 있으면 선택한 보기를 표시하는데 선택할 수 없다.
  - [ ] answers를 map으로 돌면서 각 보기를 표시한다.
    - [ ] 현재 보기가 correctAnswer이면 초록색으로 표시한다.
    - [ ] 현재 보기가 userAnswer이면 빨간색으로 표시한다.
- [ ] useAnswer가 있으면 선택할 수 있는 보기를 표시한다.

### Quiz 구현

- 퀴즈의 최상단 Cotainer 컴포넌트이다.

## 메인 페이지

- [ ] 메인 페이지에서 버튼을 누르면 다음 페이지로 이동할 수 있다.
  - [ ] 퀴즈 풀기: 퀴즈 푸는 페이지로 이동
  - [ ] 결과 페이지:
  - [ ] 오답 노트: 오탑노트 페이지로 이동

## 퀴즈 풀기 페이지 (quiz)

- [ ] 페이지에 입장하면 서버로부터 퀴즈를 불러온다.
- [ ] 현재/전체 문항수를 볼 수있다.
- [ ] 퀴즈를 풀기 `시작하면 타이머가 시작`된다.
- [ ] 문항에 대한 답을 4개의 보기 중에서 선택할 수 있다.
  - [ ] 정답을 한번 고르면 `변경할 수 없다`.
  - [ ] 만약 선택한게 `오답`이면
    - [ ] 정답인 보기는 초록색으로 표시된다.
    - [ ] 선택한 보기는 빨간색으로 표시된다.
    - [ ] 임시 오답노트에 추가된다.
  - [ ] 만약 선택한게 `정답`이면
    - [ ] 선택한 보기는 초록색으로 표시된다.
    - [ ] 다음문항 버튼이 활성화된다.
- [ ] 다음문항 버튼을 누르면 다음 문항으로 이동된다.
  - [ ] 답안중 한개를 선택해야 화면에 다음문제 버튼이 화면에 표시된다.
  - [ ] 마지막 문항에서는 다음문제 버튼이 결과보기 버튼으로 변경된다.

## 결과 페이지 (result)

- [ ] state로 걸린시간, 정답개수, 오답개수, 임시 오답리스트를 넘겨받는다.
- [ ] state를 받지 못했다면 error 페이지로 이동한다.
- [ ] 정답률은 차트로 표시한다.
- [ ] 임시 오답리스트를 로컬스토리지의 오답노트에 추가한다.

## 오답노트 페이지 (wrong-note)

- [ ] 로컬 스토리지에 저장된 오답노트를 불러온다.
  - [ ] 이 때 제거 표시된 오답노트는 제거한다.
- [ ] 지금까지 퀴즈를 풀며 틀린 문항을 모두 볼 수 있다.
- [ ] 만약 문제를 틀렸다면 내가 선택한 오답과 정답이 표시된다.
- [ ] 만약 문제를 맞았다면 정답만 표시된다.
- [ ] 이전문항 버튼을 누르면 이전 오답으로 이동한다.
  - [ ] 만약 첫번째 오답이라면 버튼이 표시되지 않는다.
- [ ] 다음문항 버튼을 누르면 다음 오답으로 이동한다.
  - [ ] 만약 마지막 오답이라면 버튼이 표시되지 않는다.
- [ ] 또 풀지않기 버튼을 누르면 오답노트에서 제거 표시 후 다음 오답으로 이동한다.
- [ ] 오답노트에서 모든 문제를 풀었다면 `오답 노트를 모두 확인했어요! 메인 페이지로 이동할까요?` 모달을 띄운다.
