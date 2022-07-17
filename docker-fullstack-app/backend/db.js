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