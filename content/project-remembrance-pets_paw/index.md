---
emoji: 🐾
title: PET's PAW 프로젝트 회고
date: '2023-01-08 00:00:00'
author: so_ohi
tags: 회고
categories: 프로젝트
---

# 1. PET's PAW 소개

![](https://velog.velcdn.com/images/sohi_5/post/7a8ffc14-e325-4eef-882d-81ea670ec24b/image.png)

> **PET's PAW**는 농림축산식품부 유기동물 정보 오픈 API를 활용한 공고 조회 서비스입니다.

- 사이트 링크: [바로가기](https://helpful-hamster-c8a6a3.netlify.app/)

- Github Repository: https://github.com/soheejang15/PETS-PAW

- 활용 오픈 API: https://www.data.go.kr/data/15098931/openapi.do

- 개발 기간: 2022.12 ~ 2023.01

- 사용 기술스택: next.js, typescript, styled-components, contextAPI, react-query

- 주요 기능: 유기동물 공고 다중 필터링, 상세 정보 조회, 페이지네이션

# 2. 구현 기능

![](https://velog.velcdn.com/images/sohi_5/post/3d06dacb-392e-4c26-8831-3baf47d90f87/image.png)

## 공고 필터링 및 페이지네이션

- 축종 및 품종, 성별, 중성화 여부, 실종일자, 실종지역(발견 예상 지역)의 조건을 선택적으로 지정하여 공고 필터링

- 필터링한 공고 리스트를 페이지네이션으로 구현

![](https://velog.velcdn.com/images/sohi_5/post/97843725-7733-458c-8d44-f135f4fef09f/image.png)

## 공고 상세 정보 조회

- 선택한 공고에 대한 상세 정보를 모달 형태로 구현

# 3. 이슈 및 해결

## (1) CORS 발생

기존의 서비스 구조는 React App(localhost)에서 오픈 API로 request하는 형태로, same-origin이 아니기 때문에 브라우저에서 CORS 에러 메세지가 발생하였습니다. 이를 해결하기 위해 3가지 방법을 고려하였습니다.

### (1-1) 프록시 사이트 이용

모든 출처를 허용하는 프록시 사이트 URL을 모든 Request URL 앞에 붙여 앱과 OPEN API 서버 사이의 중계점으로 활용하는 방법으로, http://cors-anywhere.herokuapp.com/corsdemo 등이 있습니다.

실제로 배포 직전까지 해당 방법을 사용하였으나, 현재 모든 프록시 사이트는 악용 사례로 인해 API 요청 횟수 및 시간 제한을 두고 있기 때문에 개발 당시에는 큰 문제가 없으나 배포 이후에는 적절한 해결 방법이 아닌 것으로 판단되어 다른 해결 방안을 선택하였습니다.

### (1-2) 직접 서버를 띄워 CORS 헤더 세팅

CORS 에러 발생 시 가장 정석적인 방안이 될 수 있으나, 해당 프로젝트는 서버 개발 없이 프론트엔드 앱을 개발하려는 목표가 있었기 때문에 추가적인 공수를 들여 새로운 서버를 개발하고, 프론트엔드 앱과 별개로 서버를 배포해야 한다는 번거로움이 있었기 때문에 선택하지 않았습니다.

### (1-3) React App을 Next App으로 마이그레이션 ⭐️

마지막으로 고려한 방법은 Next App으로 마이그레이션 하여 Next 서버를 Proxy 서버로 활용하는 방법입니다. Next는 결국 React 프레임워크이기 때문에 기존 코드 일부분에 대한 수정을 거치면 어렵지 않게 마이그레이션이 가능하다고 판단했으며, 서버를 따로 배포할 것 없이 Next App만 배포한다면 CORS 에러 해결 가능하기 때문에 가장 적절한 방법이라고 생각되어 해당 방법을 선택하였습니다.

## (2) Next.js 전환 이후 styled-components 미작동

![](https://velog.velcdn.com/images/sohi_5/post/1f63669b-88f3-4164-89e9-38ca548142a9/image.png)

Next App으로 마이그레이션을 하고난 뒤부터 styled-components를 통해 적용한 style이 적용되지 않고, 콘솔에 `Prop 'className' did not match.` 에러가 발생하였습니다. Next의 경우 SSR 방식이기 때문에 서버에서 Pre-rendering 된 react 트리와, 브라우저에서 처음 렌더링되는 트리에 차이가 있어 해당 에러가 발생하였습니다.

해당 프로젝트는 Next.js 13버전이므로, swc를 사용하여 컴파일하기 때문에 next.config.js 에서 `styledComponents` 설정을 수정하여 해당 에러를 수정할 수 있었습니다.

![](https://velog.velcdn.com/images/sohi_5/post/b7166b2d-5a96-4f4d-9363-ea06bc10ef89/image.png)

# 4. 마무리

## 개인 프로젝트 첫 배포!

팀 프로젝트 이외에 개인 프로젝트를 배포한 것은 처음이라 많은 어려움이 있을 줄 알았는데, 최근에는 무료로 손쉽게 배포가 가능하도록 제공되고 있는 서비스가 많았고, Netlify를 활용하여 금방 배포에 성공할 수 있었습니다. 지금까지 '배포' 자체에 두려움이 많아서 프로젝트를 진행하다가 출시할 서비스가 아니니 완성 후엔 외면했던 프로젝트들이 여럿 있었던 것 같습니다.

하지만 목표대로 완성하고 배포까지 하고나니, 내 프로젝트가 세상에 공개되었다는 생각에 더 개선하고 싶은 욕심이 들어 2차 개발을 염두에 두고 있습니다. 개발 당시에는 보지 못했던 아쉬운 점들이 구석구석 눈에 띄기도 하고, 사용자 입장에서 추가되면 더 유용할 것 같은 기능들도 개발하여 배포하고자 합니다. '사용자 입장' 에서 더 자세히 들여다 볼 수 있게 준비가 된 것 같아 한 발자국 더 나가는 기분에 큰 성취감을 받았습니다 😊

## 안타까운 공고 내용들

![](https://velog.velcdn.com/images/sohi_5/post/3958e7fc-8032-4400-b382-99f0732f0473/image.png)

![](https://velog.velcdn.com/images/sohi_5/post/9f1488d1-9903-4070-8177-bd4065181902/image.png)

개발을 진행하며 수많은 유기동물 공고들을 들여다 보게되었고, 여러 동물들의 사진과 보호소 직원분들의 정성을 보며 안타까운 감정을 느꼈습니다. 공고에는 예쁜 장식을 달고 사진에 귀여운 하트, 별을 달아 어떻게든 입양될 수 있게 최선을 다해 사진을 찍고, 특이사항에는 순한 공주님, 멋진 왕자님 등등 멘트를 적어놓았습니다. 슬픈 눈으로 카메라를 바라보는 사진부터 사고를 당해 의식불명인 동물들까지 하루에도 수백 건씩 올라오는 것이 마음 아팠습니다.

집으로 돌아가는 길을 잃은 동물들이 다시 주인에 품에 안기고, 외롭게 밖을 떠돌아 다니던 동물들도 하루 빨리 새로운 가족을 만나 보호기간이 지나 허무하게 목숨을 잃지 않았으면 좋겠습니다🙏
