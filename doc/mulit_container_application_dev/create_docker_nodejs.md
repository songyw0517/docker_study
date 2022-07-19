# 노드 앱을 위한 도커 파일 만들기
## 1. 노드 앱을 위한 dockerfile, dockerfile.dev 만들기
- backend 디렉토리 안에 dockerfile, dockerfile.dev를 생성한다.

## 2. 개발환경을 위한 도커 파일 작성하기
- CMD의 부분에서 start가 아닌 dev를 사용하는 이유
    - 코드가 변경될 때 바로 반영시켜줄 수 있도록 nodemon을 사용하고 싶기 때문에 사용한다.
    - package.json에 "dev":"nodemon server.js"를 설정했기에 npm run dev를 사용할 수 있다.
    ```docker
    FROM node:alpine

    WORKDIR /app

    COPY ./package.json ./

    RUN npm install

    COPY . .

    CMD ["npm", "run", "dev"]
    ```
## 3. 운영 환경을 위한 도커 파일 작성하기
- 운영환경에서는 dev가 아닌, start를 사용하면 된다.
    ```docker
    FROM node:alpine

    WORKDIR /app

    COPY ./package.json ./

    RUN npm install

    COPY . .

    CMD ["npm", "run", "start"]
    ```