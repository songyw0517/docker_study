// React와 useState, useEffect를 react로부터 가져온다.
import React, {useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  // 1. 현재 상태를 저장할 변수가 필요하다 (useState)
  const [lists, setLists] = useState([]); // 보여줄 텍스트를 저장할 공간
  const [value, setValue] = useState(""); // Input 박스에 보여줄 값을 저장할 공간


  // 2. 데이터베이스에 데이터를 요청해야한다. (useEffect)
  useEffect(() =>{
    // 여기서 데이터베이스에 있는 값을 가져온다.
    // axios를 통해 서버에 요청한다.
    axios.get("/api/values")
      .then(response =>{
        console.log("response", response)
        setLists(response.data)
      })
  }, [])

  // 3. Input박스의 값이 변경될 때마다 값을 설정하는 기능 추가 (changeHandler)
  const changeHandler = (event) => {
    // 이벤트가 발생할 때마다 setValue를 통해 value값을 변경한다.
    setValue(event.currentTarget.value)
  }

  // 4. Button이 클릭 될 때의 이벤트를 설정(서버에 값 전달, submitHandler)
  const submitHandler = (event) =>{
    event.preventDefault(); // 원래 있던 기본 기능을 막음

    // 서버에 post로 데이터를 보낸다.
    axios.post('/api/value', { value:value })
    .then(response =>{
      if(response.data.success){
        console.log("response", response)
        setLists([...lists, response.data]) // 기존에 있던 리스트에 새로운 데이터 추가
        setValue(""); // Input 박스의 값을 지운다.
      }else{
        alert('값을 DB에 넣는데 실패했습니다.')
      }
    })
  }


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
}

export default App;
