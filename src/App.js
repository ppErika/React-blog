import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState(['하이하이요', '우동 맛있겠다', '잠을 달라']);
  let [좋아요, 좋아요변경] = useState(0);

  let[modal, modal변경] = useState(false);

  function 제목정렬() {
    var newArray = [...글제목];
    newArray.sort();
    글제목변경(newArray);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <button onClick={ 제목정렬 }>제목 정렬하기</button>
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
        <h3 onClick={()=>{modal변경(true)}}> {글제목[2]} </h3>
        <p>7월 26일 발행</p>
        <hr/>
      </div>

      <button onClick={()=>{modal변경(!modal)}}>버튼</button>
      {
        modal===true
        ? <Modal />
        : null
      }
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
