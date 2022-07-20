# docker compose 작성하기
각각의 컨테이너를 위한 도커 파일을 작성했으나

각각의 컨테이너가 나뉘어져있기 때문에 서로 통신이 불가능하다.

각각의 컨테이너를 연결하기 위해서는 docker-compose가 필요하다

## 1. docker-compose.yml 파일 생성하기
- docker-fullstack-app 디렉토리에 docker-compose.yml 파일 생성하기

## 2. 각각의 서비스를 위한 틀을 만들기
```yml
version: "3"
services:
    frontend:
    
    nginx:

    backend:

    mysql:
```

## 3. frontend 서비스를 위한 설정
```yml
version: "3"
services:
    # frontend 서비스를 위한 설정
    frontend:
        build:
            # 도커 파일의 이름 명시
            dockerfile: dockerfile.dev
            context: ./frontend
        volumes:
            - /app/node_moudles
            - ./frontend:/app
        stdin_open: true
    nginx:

    backend:

    mysql:
```

## 4. nginx를 위한 설정
```yml
version: "3"
services:
    # frontend 서비스를 위한 설정
    frontend:
        build:
            # 도커 파일의 이름 명시
            dockerfile: dockerfile.dev
            context: ./frontend
        volumes:
            - /app/node_moudles
            - ./frontend:/app
        stdin_open: true

    # nginx를 위한 설정
    nginx:
        # 항상 재시작하도록 설정
        restart: always
        build:
            dockerfile: dockerfile.dev
            context: ./nginx
        # 3000을 80에 연결    
        ports:
            - "3000:80"
    backend:
        

    mysql:
```
## 5. backend를 위한 설정
```yml
version: "3"
services:
    # frontend 서비스를 위한 설정
    frontend:
        build:
            # 도커 파일의 이름 명시
            dockerfile: dockerfile.dev
            context: ./frontend
        volumes:
            - /app/node_moudles
            - ./frontend:/app
        stdin_open: true

    # nginx를 위한 설정
    nginx:
        # 항상 재시작하도록 설정
        restart: always
        build:
            dockerfile: dockerfile.dev
            context: ./nginx
        # 3000을 80에 연결    
        ports:
            - "3000:80"
    # backend를 위한 설정
    backend:
        build:
            dockerfile: dockerfile.dev
            context: ./backend
        container_name: app_backend
        volumes:
            - /app/node_modules
            - ./backend:/app
    mysql:
        
```

## 6. mysql을 위한 설정
```yml
version: "3"
services:
    # frontend 서비스를 위한 설정
    frontend:
        build:
            # 도커 파일의 이름 명시
            dockerfile: dockerfile.dev
            context: ./frontend
        volumes:
            - /app/node_moudles
            - ./frontend:/app
        stdin_open: true

    # nginx를 위한 설정
    nginx:
        # 항상 재시작하도록 설정
        restart: always
        build:
            dockerfile: dockerfile.dev
            context: ./nginx
        # 3000을 80에 연결    
        ports:
            - "3000:80"
    # backend를 위한 설정
    backend:
        build:
            dockerfile: dockerfile.dev
            context: ./backend
        container_name: app_backend
        volumes:
            - /app/node_modules
            - ./backend:/app
    mysql:
        build: ./mysql
        restart: unless-stopped
        container_name: app_mysql
        ports:
            - "3306:3306"
        volumes:
            - ./mysql/mysql_data:/var/lib/mysql
            - ./mysql/sqls/:/docker-entrypoint-initdb.d/
        environment:
            MYSQL_ROOT_PASSWORD: scof
            MYSQL_DATABASE: myapp
            
```