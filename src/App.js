import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState(['하이하이요', '우동 맛있겠다', '잠을 달라']);
  let [좋아요, 좋아요변경] = useState(0);
  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경]=useState(0);
  let [입력값, 입력값변경]=useState('');

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
      <button onClick={제목정렬}>제목 정렬하기</button>

      {
        글제목.map(function (글, i) {
          return (
            <div className="list" key={i}>
              <h3 onClick={()=>{ 누른제목변경(i) }}> {글} <span>😘</span> {좋아요}</h3>
              <p>7월 25일 발행</p>
              <hr />
            </div>
          )
        })
      }


      <input onChange={ (e)=>{ 입력값변경(e.target.value) } } />

      <button onClick={() => { modal변경(!modal) }}>열고 닫는 버튼</button>
      {
        modal === true
          ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal>
          : null
      }

    </div>
  );
}

function Modal(props) {
  return (
    <>
      <div className="modal">
        <h2>{props.글제목[props.누른제목]}</h2>
        <p>날짜</p>
        <p>상세 내용</p>
      </div>
    </>
  )
}

export default App;
