---
emoji: 👾
title: Pic_co 프로젝트 회고
date: '2023-01-08 00:00:00'
author: so_ohi
tags: 회고
categories: 프로젝트
---

# 1. Pic_co 소개

![](https://velog.velcdn.com/images/sohi_5/post/7155e85b-7ed2-4a5a-83a0-339a4b577de9/image.png)

> 비슷한 블록 사이 다른 색의 블록을 찾는 캐주얼 게임

- 사이트 링크: [바로가기](https://astonishing-mochi-c62a6b.netlify.app/)

- Github Repository: https://github.com/soheejang15/PIC_CO

- 개발 기간: 2022.07

- 사용 기술스택: react, typescript, styled-components

# 2. 기능 (룰) 소개

![](https://velog.velcdn.com/images/sohi_5/post/6af17b6f-be2c-4a76-8d7e-4e8b2483138e/image.png)

![](https://velog.velcdn.com/images/sohi_5/post/bbafca5b-08ef-4cf4-95ef-5514ca89e5dc/image.png)

- 각 stage는 n\*n 형태로 block들이 생성되며, 그 중 한 개의 block 색만 다름

- 각 stage는 15초의 시간을 가지며, 올바르지 않은 block을 클릭할 경우 3초가 줄어듦

- 타이머가 0초에 도달하는 경우, 게임은 즉시 종료됨

- 5 stage 마다, `한 줄의 블록 수 +1` / `GAP -5` 발생함

- `GAP`은 난이도 조절을 위한 요소로, 50~5 의 범위를 가지며 `GAP`이 줄어들 수록 색이 비슷해져 난이도가 상승함

- `GAP`이 5에 도달한 경우 더 이상 줄어들지 않음

# 3. 이슈 및 해결

## (1) Custom hook 활용하기

프로젝트 규모가 매우 작아 Main page을 기준으로 하위 컴포넌트 depth가 1에 가까웠기 때문에 별다른 상태관리 없이도 props drilling이 일어나지 않았으므로 자연스럽게 상태들이 Main page에 모이게 되었습니다. 상태 관리 측면에서는 문제가 없었으나, Main page에 비즈니스 로직이 모여 파일이 방대해지고, 가독성이 떨어지는 문제가 발생하였습니다.

이를 해결하기 위해 useTimer와 useGameStatus, 두 가지 Custom hook을 추가하여 관심사를 분리하였습니다. useTimer를 통해 Main page는 view 렌더링에 집중하고, timer 작동 내부 로직을 알 필요없이 상황에 맞춰 타이머 시작/중지/시간 조정 메서드를 호출할 수 있게 만들었습니다. useGameStatus는 앱의 흐름을 결정하는 gameStatus 상태를 관리할 수 있고, gameStatus 변경에 따른 다음 동작은 hook 내부에서 다루지 않고 useGameStatus 호출 시 콜백함수로 넘어오도록 만들어 재사용성을 높였습니다.

### 추가적인 고민

이 글을 정리하면서 다른 개발자들은 비즈니스 로직을 어떻게 관리하고 있는지 궁금해져서 구글링을 해보았고 크게 3가지 분류로 나누어보자면,

> 1. Page가 뷰와 로직을 모두 포함

- 서비스가 클 수록 파일 규모 또한 증가
- 관심사 분리가 되지 않아 코드 복잡도 증가
- 컴포넌트를 더 세분화하여 방대해지는 것을 방지

> 2. 비즈니스 로직을 Custom hook으로 분리

- View는 렌더링에 집중
- Custom hook에서 비즈니스 로직을 관리하여 관심사 분리
- hook은 반복되는 State 관련 코드를 모듈화하여 사용하기 위함이나, 반복되지 않는 로직을 Custom hook에 담는 것은 hook의 취지에 어긋날 수 있음

> 3. 비즈니스 로직을 일반 함수(Class)로 분리

- Custom hook의 역할과 분리하여 비즈니스 로직을 일관적이게 관리

각 방법마다 장단점이 다르기 때문에 팀에서 정한 코드 스타일 및 상황에 맞게 선택하면 될 것 같습니다. 이번 프로젝트에는 2번 방법을 채택하였지만 다른 프로젝트에서는 다른 방법도 적용해보면서 적당한 해결 방식을 익혀 봐야겠다고 생각했습니다.

## (2) useCallback과 useMemo 적절하게 사용하기

> 현진 님의 [React Rendering Optimization ] 참고(https://velog.io/@hyunjine/React-Rendering-Optimization)

이전까지 Functional Component를 작성하면 내부의 함수나 값은 항상 useCallback과 useMemo를 필수적으로 사용하여 작성하는 습관이 있었습니다. React를 사용하면서 당연스럽게 여기며 깊이 생각해보지 않은 부분이었습니다. 그러나 코드리뷰를 통해 오히려 성능 저하를 가져올 수 있는 잘못된 습관임을 알게되었습니다.

### useCallback

동일 함수에 대해 useCallback으로 감싼 것과 감싸지 않은 렌더링 시간을 비교해보았을 때, useCallback으로 감싼 경우에 코드 실행 비용(의존성 배열 참조 동일성 체크)이 증가하게 되어 렌더링 시간이 늘어납니다. 렌더링 마다 "함수 재생성"과 "참조 동일성 비교" 소요 시간을 비교한다면 거의 차이가 없기 때문에 무엇이 빠른지 비교하는 것은 의미가 없습니다.

오히려 useCallback으로 감싼 경우 초기 렌더링을 느리게하고 코드 복잡도를 증가시켜 버그의 요인이 되고, 가독성이 저하 되기 때문에 일반적인 경우에는 useCallback을 사용하는 것은 좋지 않습니다.

### useMemo

useMemo 또한 더욱 신중하게 사용할 필요가 있습니다. useMemo는 렌더링마다 고비용의 연산을 피하기 위해 사용하는 것으로, React에서 "고비용 연산"이란 컴포넌트의 리렌더링이 가장 일반적인 경우라고 할 수 있습니다. 따라서 컴포넌트 내부에서 이뤄지는 모든 연산에 useMemo를 적용할 필요는 없다는 것입니다.

### 결론

성능 향상을 목적으로 메모이제이션 처리했던 값과 함수는 유의미하지 않은 영향 또는 오히려 앱의 성능을 저하시키는 영향을 끼칠 수 있기 때문에 주의하여 사용해야 한다는 것을 알 수 있었습니다. 적절한 사용방법을 습관화하여 성능 향상 작업을 유의미하게 만들어야겠다고 생각했습니다.

# 4. 마무리

해당 프로젝트는 현재 2년차 프론트엔드 개발자 지인에게 코드리뷰를 받아볼 수 있었고, 미처 생각하지 못했던 디테일들을 수정하면서 평소에 짜던 것보다 훨씬 정리된 코드를 짤 수 있었고, 습관이 들어 당연한 듯이 작성했던 코드들을 자세한 근거를 들어 설명해보면서 의미있는 코드가 중요하다는 것을 배웠습니다. 또한 경험이 적은 주니어 개발자인만큼 스스로 코드 짜는 것 뿐만 아니라 다른 사람들의 코드, 구현 방식 등등 많이 찾아 봐야겠다고 느꼈습니다.

2022년 여름에 완성하여 손을 놓고 있다가, 2023년 1월에 PET's PAW 프로젝트를 배포하며 배포가 별로 어려운 것이 아님을 깨닫고 배포하였습니다.

평소에 CRA나 package 설치하는 시간 등등 컴퓨터를 하던 도중 잠깐의 비는시간이 나면 Pic_co 같은 캐주얼 게임을 하곤 했는데, 어렵지 않게 만들 수 있을 것 같아 도전해보았습니다. 평소에 하던 게임을 직접 만드니 꽤 즐겁게 작업할 수 있었습니다. 개발하면서 테스트도 하는 겸 잠깐씩 플레이 할 수도 있어서 좋았습니다 😼

색깔 찾기 게임인 `Pic_co` 뿐만 아니라 2048, 테트리스, 사과게임 등등 다른 게임도 시간이 나면 사이드 프로젝트로 진행하면 좋겠다고 생각했습니다 😆
