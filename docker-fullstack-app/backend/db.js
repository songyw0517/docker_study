// mysql 모듈 가져오기
const mysql = require("mysql");

// pool 설정
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

// pool을 다른 프로그램(서버)에서 돌아갈 수 있도록 설정
exports.pool = pool;