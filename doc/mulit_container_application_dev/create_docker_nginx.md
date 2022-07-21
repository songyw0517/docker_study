# Nginx를 위한 도커 파일 만들기
## 현재 Nginx가 사용되는 부분
1. Proxy (back)
2. Static 파일 제공 (front)

Nginx가 요청을 나눠서 보내주는 기준은

location이 /로 시작하는지, /api로 시작하는지에 따라 나뉜다.


# Proxy 기능을 위한 Nginx 설정
## 1. nginx 디렉토리와 생성
- docker-fullstack-app 디렉토리에 nginx 디렉토리 생성

## 2.  nginx 디렉토리에 default.conf 파일 생성 및 작성
- nginx의 두가지 역할에 대한 설정
    ```conf
    # frontend 포트 : 3000번 
    upstream frontend{
        server frontend:3000;
    }

    # backend 포트 : 5000
    upstream backend{
        server backend:5000;
    }

    # nginx 포트 : 80
    server {
        listen 80;

        # '/'일 경우 http://frontend 로 연결
        location /{
            proxy_pass http://frontend
        }

        # '/api'일 경우 http://backend 로 연결
        location /api {
            proxy_pass http://backend;
        }

        # sockjs-node failed: Error 에러 방지
        location /sockjs-node {
            proxy_pass http://frontend
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
        }

    }
    ```

## 3. nginx 디렉토리에 dockerfile 생성 및 작성
- nginx에서는 개발환경과 운영환경이 다르지 않기 때문에 dockerfile.dev 파일을 따로 생성하지 않는다.
    ```docker
    FROM nginx
    # default.conf를 복사
    COPY ./default.conf /etc/nginx/conf.d/default.conf
    ```
