    # Node JS 구성하기
1. docker-fullstack-app 디렉토리 생성
2. docker-fullstack-app에 backend 디렉토리 생성
3. package.json 파일 만들기
    - 터미널 실행
    - backend 디렉토리로 이동
    - ```$ npm init``` 후, 엔터로 넘어가기
    - package.json 작성
        ```json
        // package.json
        {
        "name": "backend",
        "version": "1.0.0",
        "description": "",
        // 1. 메인 프로그램 명시
        // server.js로 변경
        "main": "server.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            
            // 2. 시작할 때 실행하는 프로그램 명시
            // start 스크립트 추가
            "start": "node server.js",

            // 3. dev 스크립트 추가
            // 여기서는 nodemon을 사용
            // nodemon : 소스코드를 변경시키더라도 노드서버를 재가동시켜주는 역할을 한다.
            "dev": "nodemon server.js"
        },
        "author": "",
        "license": "ISC",
        
        // 4. 종속성 추가
        "dependencies": {
            "express": "4.18.1", // 웹 프레임워크 모듈
            "mysql": "2.18.1", // mysql을 사용하기 위한 모듈
            "nodemon": "2.0.19", // nodemon을 사용하기 위한 모듈

            // body-parser? : 클라이언트에서 오는 요청의 본문을 해석해주는 미들웨어
            "body-parser": "1.20.0" // body-parser를 사용하기 위한 모듈
        }
        }
        ```
4. server.js 파일 만들기<br>
시작점이 되는 server.js를 만든다.
    - backend 디렉토리에 server.js 생성
    - server.js의 기본 구조 작성
    ```
    ```