# DB 환경 분리
- 개발 환경 : "도커 환경"
- 운영 환경 : "AWS RDS  서비스"
## 왜 DB 환경을 분리하는가?
- DB에는 중요한 데이터를 보관하는 부분이다.
- 조금의 잘못된 정보, 누락된 정보로도 안 좋은 결과를 보일 수 있다.
- 그렇기에 실제 중요한 데이터들을 다루는 운영환경에서는 안정적인 AWS RDS를 이용하는 것이 좋다.
- 실무에서 보편적으로 사용되는 방법이다.

# Mysql을 위한 도커 파일 만들기
## 1. mysql 디렉토리 생성
- docker-fullstack-app 디렉토리에 생성
## 2. mysql에 dockerfile 생성
```docker
FROM mysql:5.7
```
## 3. Mysql에서 생성할 Database와 Table을 저장할 장소 만들기
- mysql 디렉토리에 sqls 디렉토리 생성
- sqls 디렉토리에 initialize.sql 파일 생성
- initialize.sql 파일 작성
    ```sql
    DROP DATABASE IF EXISTS myapp

    CREATE DATABASE myapp
    USE myapp
    CREATE TABLE lists(
        id INTEGER AUTO_INCREMENT,
        value TEXT,
        PRIMARY KEY (id)
    );
    ```
## 4. Mysql 환경 설정
- 현재 상태에서는 mysql데이터베이스에 한글 데이터를 저장할 때 깨지는 오류가 발생할 수 있다.
- cnf파일을 통해 한글을 인코딩 할 수 있게 설정을 해준다.
- my.conf 파일 작성
    ```conf
    [mysqld]
    character-set-server=utf8

    [mysql]
    default-character-set=utf8

    [client]
    default-character-set=utf8
    ```
## 5. my.conf 파일 또한 도커파일에서 복사할 수 있게 설정해야한다.
```docker
FROM mysql:5.7

ADD ./my.conf /etc/mysql/conf.d/my.conf
```

