# ERIC-A-web-backend

실내 자율주행 배송 로봇 ERIC-A의 웹 애플리케이션

## 프로젝트 설치 및 실행

```bash
$ npm install
$ npm start

```


## 사용 기술

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white">
<img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">

## 주요 기능

### 사용자 페이지

- 로그인
- 회원가입
- 배송 접수하기
- 배송 조회하기
- 배송 상세 조회하기
  - 접수 요청 - 접수지로 출발 - 접수지 도착 - 배송 출발 - 배송지 도착 - 배송 완료
- 로봇 뚜껑 열기

### 관리자 페이지
- 로그인
- 접수 조회하기
- 접수 수락/거절하기
- 배송 조회하기
  - 접수 요청 - 접수지로 출발 - 접수지 도착 - 배송 출발 - 배송지 도착 - 배송 완료
- 로봇 뚜껑 열기/닫기
- 로봇 배송지로 출발시키기

## 디렉토리 구조

```
📂ERIC-A-web-backend-expressjs
├─ .gitignore
├─ README.md
├─ app.js
├─ 📂bin
│  └─ www
├─ 📂config
│  └─ config.js
├─ 📂controllers
│  ├─ adminController.js
│  ├─ controlController.js
│  ├─ deliveryController.js
│  └─ userController.js
├─ 📂dto
│  └─ ResponseDto.js
├─ 📂models
│  ├─ delivery.js
│  ├─ index.js
│  └─ user.js
├─ package-lock.json
├─ package.json
├─ 📂routes
│  ├─ adminRoute.js
│  ├─ controlRoute.js
│  ├─ deliveryRoute.js
│  └─ userRoute.js
└─ 📂services
   ├─ adminService.js
   ├─ deliveryService.js
   └─ userService.js
```

## 사용 흐름

<img width="523" alt="209927234-fd644c19-fefb-4b4a-8ae4-0bc33c15ecf4" src="https://user-images.githubusercontent.com/68257716/235360686-be5867cc-4d57-4346-bca0-ed8e4ca78df8.png">
