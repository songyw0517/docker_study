# 리액트 파일 만들기
## 0. package.json에 사용할 종속성 추가하기 (axios)
- axios 부분에 대한 정보를 추가한다.
  ```json
  // package.json
  "dependencies":{
    ...,

    "axios":"0.27.2"
  }

  ```
## 1. Create-React-App으로 리액트앱 생성하기
- 터미널 실행
- docker-fullstack-app 디렉토리로 이동
- ```$ npx create-react-app frontend``` 로 frontend 디렉토리에 리액트 앱 설치
    
    ## * 시행착오
    1. npm WARN deprecated tar@2.2.2: This version of tar is no longer supported,
and will not receive security updates. Please upgrade asap.
        - ```$ npm install tar@6 -g```
    2. Sub-process /usr/bin/dpkg returned an error code (1)
        - ```$ sudo rm /var/lib/dpkg/info/*```
        - ```$ sudo dpkg --configure -a```
        - ```$ sudo apt update -y```
    3. npm, node 가 제대로 설치되지 않은 경우(버전이 낮은 경우)
        - nodejs 제거
            ```
            sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node* /usr/local/lib/dtrace/node.d ~/.npm ~/.node-gyp /opt/local/bin/node /opt/local/include/node /opt/local/lib/node_modules 
            
            sudo rm -rf /usr/local/lib/node* ; sudo rm -rf /usr/local/include/node* ; sudo rm -rf /usr/local/bin/node*
            
            sudo apt-get purge nodejs npm
            ```
        - nodejs, npm 설치
            ```
            curl -sL https://deb.nodesource.com/setup_14.x -o setup_14.sh
            sudo sh ./setup_14.sh
            sudo apt update
            sudo apt install nodejs
            sudo apt install npm
            ```
## 2. UI 수정
텍스트를 넣을 Input박스와 Button추가
```js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <!-- 수정한 부분 -->
        <div className="container">
          <form className="example" onSubmit>
            <input
            type="text"
            placeholder="입력해주세요..."
            />
            <button type="submit">확인</button>
          </form>
        </div>


      </header>
    </div>
  );
}

export default App;
```

## 3. UI 스타일 수정
추가한 Input박스와 Button 스타일 수정
```css
/* frontend/src/App.css */
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.container {
  width: 375px;
}

form.example input {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 74%;
  background: #f1f1f1;
}

form.example button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196F3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  cursor: pointer;
}

form.example button:hover {
  background: #0b7dda;
}

form.example::after {
  content: "";
  clear: both;
  display: table;
}
```

## 4. Frontend 기능 추가
0. 사용할 모듈 가져오기(import 하기)
    ```js
    // React와 useState, useEffect를 react로부터 가져온다.
    import React, {useState, useEffect } from 'react';
    ```
1. 현재 상태를 저장할 변수가 필요하다 (useState)
    ```js
     // 1. 현재 상태를 저장할 변수가 필요하다 (useState)
    const [lists, setLists] = useState([]);
    const [value, setValue] = useState("");
    ```
2. 데이터베이스에 데이터를 요청해야한다. (useEffect)
    ```js
    // 2. 데이터베이스에 데이터를 요청해야한다. (useEffect)
    useEffect(() =>{
        // 여기서 데이터베이스에 있는 값을 가져온다.
        // axios를 통해 서버에 요청한다.
        axios.get("/api/values")
        .then(response =>{
        console.log("response", response.data)
        setLists(response.data)
        })
    }, [])
    ```
3. Input박스의 값이 변경될 때마다 값을 설정하는 기능 추가 (changeHandler)
    ```js
    // 3. Input박스의 값이 변경될 때마다 값을 설정하는 기능 추가 (changeHandler)
    const changeHandler = (event) => {
        // 이벤트가 발생할 때마다 setValue를 통해 value값을 변경한다.
        setValue(event.currentTarget.value)
    }
    ```
4. Button이 클릭 될 때의 이벤트를 설정(서버에 값 전달)
    ```js
    // 4. Button이 클릭 될 때의 이벤트를 설정(서버에 값 전달, submitHandler)
    const submitHandler = (event) =>{
        event.preventDefault(); // 원래 있던 기본 기능을 막음

        // 서버에 post로 데이터를 보낸다.
        axios.post("/api/value", {value:value})
        .then(response =>{
            if(response.data.success){
                console.log("response", response)
                setLists([...lists, response.data]) // 기존에 있던 리스트에 새로운 데이터 추가
                setValue("") // Input 박스의 값을 지운다.
            }else{
                alert('값을 DB에 넣는데 실패했습니다.')
            }
        })
    }
    ```

5. 저장된 텍스트 보여주는 기능 추가
    ```js
    ...

    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            
            <div className="container">
            
            {lists && lists.map((list,index)=>(
                <li key={index}>{list.value}</li>
            ))}
            <br />


            <form className="example" onSubmit={submitHandler} // Button 이 눌릴 때의 이벤트 설정
            >
                <input
                type="text"
                placeholder="입력해주세요..."
                onChange={changeHandler} // 변경이 될 때 마다 'changeHandler' 함수 실행
                value={value} // state의 value와 같다.
                />
                <button type="submit">확인</button>
            </form>
            </div>


        </header>
        </div>
    );
    ```