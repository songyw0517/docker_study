# Docker Volume을 이용한 데이터 베이스의 데이터 유지하기

## Docker Volume을 사용하지 않을 경우
1. 이미지로 컨테이너 생성
2. 컨테이너 생성 후, 읽기 전용인 도커 이미지
3. 컨테이너에서의 변화가 있음 -> 컨테이너 안에 변화된 데이터가 저장됨
4. 컨테이너 삭제 -> 컨테이너 안의 데이터까지 모두 삭제된다. (문제)

-> 원래는 컨테이너를 삭제할 경우, 데이터 베이스의 데이터까지 삭제가 된다.

## 컨테이너를 삭제하더라도 "데이터는 유지하고 싶은데..."
Docker Volume을 사용함으로써 문제를 해결할 수 있다.
``` yml
mysql:
    ...
    volumes:
        - ./mysql/mysql_data:/var/lib/mysql
        - ./mysql/sqls/:/docker-entrypoint-initdb.d/
    ...
```
