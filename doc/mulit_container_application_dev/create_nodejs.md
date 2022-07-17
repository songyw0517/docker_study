# Node JS 구성하기
## 1. docker-fullstack-app 디렉토리 생성
## 2. docker-fullstack-app에 backend 디렉토리 생성
## 3. package.json 파일 만들기

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
## 4. server.js 파일 만들기<br>
시작점이 되는 server.js를 만든다.
- backend 디렉토리에 server.js 생성
- server.js의 기본 구조 작성
    ```javascript
    // 필요한 모듈들을 가져오기
    const express = require("express");
    const bodyParser = require("body-parser");
    // Express 서버 생성
    const app = express();
    // json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
    app.use(bodyParser.json());
    // 어플리케이션 실행
    app.listen(5000, () =>{
        console.log("어플리케이션이 5000번 포트에서 시작되었습니다.");
    });
    ```
## 5. mysql을 연결하기 위한 db.js 파일 생성
``` javascript
// mysql 모듈 가져오기
const mysql = require("mysql");
// pool 설정
const pool = mysql.createPool({
    connectionLimit:10,
    host:"mysql",
    user:"root",
    password:"scof",
    database:"myapp"
});
// pool을 다른 프로그램(서버)에서 돌아갈 수 있도록 설정
exports.pool = pool;
```

## 6. export 된 pool을 server.js에서 불러오기
```javascript
// server.js
// 필요한 모듈들을 가져오기
const express = require("express");
const bodyParser = require("body-parser");
// ADD db
const db = require("./db");
// Express 서버 생성
const app = express();
// json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
app.use(bodyParser.json());
// 어플리케이션 실행
app.listen(5000, () =>{
    console.log("어플리케이션이 5000번 포트에서 시작되었습니다.");
});
```

## 7. API 작성하기
```javascript
// server.js
...

// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 넣어주기
app.post("/api/value", function(req, res, next){
    // 데이터베이스에 값 넣어주기
    // body-parser를 사용함으로써 req.body.value로 값을 가져올 수 있다.
    db.pool.query("INSERT INTO lists (value) VALUES(`${req.body.value}`)",
        // 에러 핸들러
        (err, results, fildes)=>{
            if(err)
                return res.status(500).send(err)
            else
                return res.json({success: true, value: req.body.value})
        });
});
// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get("/api/values", function(req, res) {
    // 데이터베이스에서 모든 정보 가져오기
    db.pool.query("SELECT * FROM lists;",
    (err, results, fileds) => {
        if(err)
            return res.status(500).send(err)
        else
            return res.json(results)
    })
})
// 테이블 생성하기
db.pool.query(`CREATE TABLE lists(
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PARIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log("result", results)
})
// 어플리케이션 실행
app.listen(5000, () =>{
    console.log("어플리케이션이 5000번 포트에서 시작되었습니다.");
});
```