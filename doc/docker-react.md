# * 리액트 설치
리액트를 설치하기 전, node(nodejs)가 설치되어있어야한다.
- ```$ node -v```로 확인이 가능하다.

## 리액트를 설치하기 위한 명령어
- 설치할 폴더로 이동
  - ```$ cd backend\docker_react_app```
- 리액트 설치
  - ```$ npx create-react-app [리액트를 설치하고자 하는 디렉토리 이름]```
  - ```$ npx create-react-app ./``` // 현재 디렉토리에 설치

## 리액트를 실행하기 위한 명령어
- ```$ npm run start```

## 리액트를 테스트하기 위한 명령어
- ```$ npm run test```

## 리액트를 빌드하기 위한 명령어
- ```$ npm run build```
- build 폴더에 빌드된다.

<br><br>

# * 도커를 이용하여 도커에서 리액트 실행하기
## 1. 개발하기 위한 dockerfile만들기 (dockerfile.dev)
```docker
# docker_react_app\dockerfile.dev


# 베이스 이미지 설정
FROM node:alpine

# ./을 /usr/src/app으로 설정
WORKDIR /usr/src/app

# package.json을 ./으로 복사
COPY package.json ./

# 종속성 다운로드
RUN npm install

#  ./으로 복사
COPY ./ ./

# 실행 명령 추가
CMD ["npm", "run", "start"]
```

<br>

## 2. dockerfile.dev로 이미지 만들기
- 원래는 dockerfile로 이미지를 만들 수 있었으나, 현재는 dockerfile.dev라는 파일로 만드는 것이기에
- build를 할 때 어떤 파일로 할지 알려줘야한다.
- 이전:
    - ``` $ docker build ./ ```
- 다른 파일로 이미지 만들기
    - -f 옵션 : 어떤 포맷으로 할지 결정
    - -t 옵션 : 이미지 이름 붙이기
    - ``` $ docker build -f dockerfile.dev -t devscof/docker-react-app ./```

<br>

## 3. node_modules에 대해
- 도커 환경이 아닌 경우 react 앱을 실행시키기 위해서는 node_modules가 필요하다.
- 하지만 "도커 환경"의 경우 node_modules가 필요하지 않다.
  - 게다가 node_modules가 있을 경우 용량이 큰 node_modules까지 빌드하기 때문에 빌드 시간도 더욱 늘어난다.
- > 도커환경의 경우 node_modules은 삭제하자

<br>

## 4. 포트 매핑
```
$ docker build -f dockerfile.dev -t devscof/docker-react-app ./
$ docker run devscof/docker-react-app
```
으로 도커를 실행시킨 후 react 앱은 3000번 포트를 사용하기에 localhost:3000을 접속하지만

로컬호스트와 컨테이너 간의 포트매핑을 하지 않았기에 접속할 수 없다.

해결 : 포트매핑 옵션을 준다.

``` $ docker run -it -p 7000:3000 devscof/docker-react-app ```

<br>

## 5. 접속
위에서 7000번 포트를 3000번(react)에 연결시켜줬으므로

'localhost:7000'으로 접속을 시도하면 다음과 같이 접속이 된다.

<img src="imgs/react_index.jpg">

<br><br>

# 6. 볼륨(Volume)을 이용한 소스코드 변경
개발시 소스코드 변경이 잦은데, 소스코드가 변경될 때마다 이미지를 빌드하고 실행시키는 것은 매우 번거롭다.

그렇기에 소스코드 변경시, 바로 소스코드가 적용되게 하는 것이 중요하다.

이를 위해서는 docker의 volume을 사용한다.

## 볼륨을 사용하여 어플리케이션을 실행하는 방법
```
# 리눅스
docker -p [외부포트]:[내부포트] -v /usr/src/app/node_modules -v $(pwd):/usr/src/app [이미지 아이디]

# 윈도우
docker -p [외부포트]:[내부포트] -v /usr/src/app/node_modules -v %cd%:/usr/src/app [이미지 아이디]
```
- 현재 디렉토리에는 node_modules가 없기에 ```-v /usr/src/app/node_modules```를 통해 node_modules를 참조하지 않도록 설정한다.

<br><br>

## 7. react의 핫로딩 작동을 위한 package.json 파일 수정
- react의 핫로딩 : 코드가 변경되었을 때 페이지를 새로고침하지 않고 바뀐부분만 빠르게 교체해주는 것
- 리눅스나 맥에서는 핫로딩이 작동할 수 있으나, 윈도우 운영체제에서 개발할 경우 핫로딩이 적용이 되지않는다.
- 이를 해결하기 위해서는 package.json 파일을 수정해야한다. [문제해결 참고](https://stackoverflow.com/questions/71297042/react-hot-reload-doesnt-work-in-docker-container)
  
  ++) CHOKIDAR_USEPOLLING=true의 환경변수를 적용하는 방법이 있다고 하여 시도해봤지만 실패했다.<br>
  > Windows에서 react-scripts 5.xx 이상을 사용하는 경우 CHOKIDAR_USEPOLLING이 작동하지 않습니다.
- 하지만 "새로고침"을 해야 수정된다는 점이 아쉽다.
```json
// package.json

{
  "name": "docker_react_app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    // WATCHPACK_POLLING=true을 추가한다.
    "start": "WATCHPACK_POLLING=true react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

실행 명령어(윈도우)
- ```docker run -it -p 7000:3000 -v /usr/src/app/node_modules -v %cd%:/usr/src/app devscof/docker-react-app```

<br><br>

# * 명령어가 길어서 싫어... (docker-compose)
위의 마지막 단계는 ```매우 긴 도커 실행 명령어```를 입력함으로써 끝이난다.

하지만, 매번 이렇게 긴 명령어를 써야할까? 아니다.

docker-compose를 사용한다면 간단하게 어플리케이션을 실행시킬 수 있다.

<br>

## docker-compose.yml 파일 작성
작성해야할 것
```docker
┌ version : "3"         # 도커 컴포즈의 버전
└ services :            # 실행하려는 컴테이너들을 정의
  └ [container name] :  # 컨테이너 이름
    ├ build :           # 
    │ ├ context : .     # 도커 이미지를 구성하기 위한 파일과 폴더들이 있는 위치, (.으로 현재 위치로 지정)
    │ └ dockerfile : dockerfile.dev # 어떤 도커 파일을 빌드할 것인지 지정, (dockerfile.dev 파일로 지정)
    ├ ports : "7000:3000" # 포트 매핑
    ├ volumnes:         # 볼륨 세팅
    │ ├ /usr/src/app/node_modules # /usr/src/app/node_modules는 참조하지 않겠다.
    │ └ ./:/usr/src/app # ./:/usr/src/app은 참조하겠다.
    └ stdin_open : true # 리액트 앱을 끌 때 사용
```
<br>

## docker-compose 명령어로 실행하기
- ```$ docker-compose up```

<br>

## 볼륨이 잘 적용되었는지 확인
src/App.js 부분을 변경하여 소스코드 변경시 잘 적용이 되는지 확인한다.

윈도우에서는 변경된 소스코드가 적용되는데까지 시간이 좀 걸린다.

<br>

# * 리액트 어플리케이션 테스트하기
리액트를 테스트 하기 전에, 먼저 이전에 변경해왔던 소스코드를 원상태로 복구해야한다. (node_modules도 있어야한다..)

리액트 테스트하기
- ```$ npm run test```

<br>

## 도커환경에서 리액트 어플리케이션 테스트하기
- ```$ docker run -it [이미지 이름] npm run test```
  - 이 명령어는 빌드된 이미지에 대한 테스트이다.
  - 볼륨이 적용될 수 없기에, 소스코드를 변경했어도 적용되지 않는다.
  - 즉, 빌드를 통해서 제대로 이미지를 테스트할 수 있다.

## 테스트에서도 볼륨을 적용하고 싶다.
```$ docker run -it [이미지 이름] npm run test``` 명령어의 경우,<br>
소스코드를 변경해도 이미지를 빌드하지 않는 이상,<br>
변경된 소스코드를 적용시킬 수 없었다.<br>

소스코드 변경을 적용시키기 위해 volume을 사용한 것과 같이 test를 위한 컨테이너를 compose파일에 만들어주면 된다.

## docker-compose.yml에 test 컨테이너 추가
```yml
...
tests:
  build:
    context: .
    dockerfile: dockerfile.dev
  volumes:
    - /usr/src/app/node_modules
    - ./:/usr/src/app
  command: ["npm", "run", "test"]
```

## docker-compose 빌드하기
- ```$ docker-compose up --build```