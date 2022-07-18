# 리액트 앱을 위한 도커 파일 만들기
- '개발환경'과 '운영환경'을 나누자
## 1. 리액트를 위한 dockerfile, dockerfile.dev 만들기
- frontend 디렉토리 안에 dockerfile, dockerfile.dev 만들기
## 2. 개발환경을 위한 dockerfile.dev 작성하기
```docker
# dockerfile.dev

FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]
```
## 3. 운영환경을 위한 dockerfile 작성하기
- 개발환경과 달리 Nginx를 사용한다는 점 고려하기(frontend내의 nginx)
- 개발환경과 달리 빌드 파일을 만들어야 한다는 점 고려하기
```docker
# dockerfile

# 1. Nginx가 제공해줄 build 파일 생성
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run builder

# 2. Nginx를 통해 생성한 builde 파일을 제공
# default.conf에서의 설정을 nginx 컨테이너 안에서 설정이 될 수 있도록 복사
FROM nginx
EXPOSE 3000
# ./nginx/default.conf를 /etc/nginx/conf.d/default.conf에 복사
# /etc/nginx/conf.d/default.conf : nginx에서의 환경 설정
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

```
## 4. nginx 설정을 위한 default.conf 작성하기
- frontend 디렉토리 안에 nginx 디렉토리 생성하기
- default.conf 파일 생성하기
- 작성
    ```conf
    server{
        listen 3000; // nginx 서버가 들을 포트 설정

        # '/'에 요청이 올 때, 제공할 부분 설정
        location / {
            root /usr/share/nginx/html; // 빌드 파일 설정

            index index.html index.html; // 사이트의 index 페이지 설정

            try_files $uri $uri/ /index.html; // 리액트를 위한 부분
        }
    }
    ```