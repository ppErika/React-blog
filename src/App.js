import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState(['하이하이요', '우동 맛있겠다', '잠을 달라']);
  let [좋아요, 좋아요변경] = useState(0);

  function 제목바꾸기(){
    var newArray = [...글제목];
    newArray[0]='바이바이요';
    글제목변경(newArray);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <button onClick={ 제목바꾸기 }>버튼</button>
      <div className="list">
        <h3> {글제목[0]} <span onClick={()=>{ return 좋아요변경(좋아요+1) }}>😘</span> {좋아요} </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3> {글제목[1]} </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3> {글제목[2]} </h3>
        <p>7월 26일 발행</p>
        <hr/>
      </div>
    </div>
  );
}

export default App;
