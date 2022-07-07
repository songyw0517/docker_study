const express = require("express");
const redis = require("redis");

// 레디스 클라이언트 생성
const client = redis.createClient({
    // docker-compose를 사용할 경우, 
    // docker-compose.yml에 명시한 '컨테이너 이름'으로 설정
    host:"redis-server",
    port:6379
});

const app = express();

// 숫자는 0부터 시작합니다.
client.set("number", 0);

// 루트 경로로 올 때
app.get('/', (req, res) =>{
    // 에러가 날 경우 err에 값이 들어간다
    // 에러가 나지 않을 경우 client로부터 number에 값을 가져온다.
    client.get("number", (err, number) =>{
        // 가져온 숫자에 1을 더하여 저장한다.
        client.set("number", parseInt(number)+1);
        
        res.send("숫자가 1씩 올라갑니다. 숫자 : "+number);
    });
});



app.listen(8080);
console.log("server is running");

