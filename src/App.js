import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState(['하이하이요', '우동 맛있겠다', '잠을 달라']);
  let [좋아요, 좋아요변경] = useState(0);

  // function 제목바꾸기(){
  //   var newArray = [...글제목];
  //   newArray[0]='바이바이요';
  //   글제목변경(newArray);
  // }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <div className="list">
        <h3> {글제목[0]} <span onClick={()=>{ 좋아요변경(좋아요+1) }}>😘</span> {좋아요} </h3>
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

      <Modal />
      
    </div>
  );
}

function Modal(){
  return(
    <>
    <div className="modal">
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세 내용</p>
    </div>
    </>
  )
}
export default App;
