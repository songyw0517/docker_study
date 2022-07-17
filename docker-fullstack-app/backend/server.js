// 필요한 모듈들을 가져오기
const express = require("express");
const bodyParser = require("body-parser");
// db.js 가져오기
const db = require("./db");


// Express 서버 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
app.use(bodyParser.json());

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