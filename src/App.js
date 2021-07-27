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

  // function 반복된UI(){
  //   var 어레이 =[];
  //   for(var i=0; i<3; i++){
  //     어레이.push(<div>안녕</div>);
  //   }

  //   return 어레이
  // }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <button onClick={ 제목정렬 }>제목 정렬하기</button>
    
      <button onClick={()=>{modal변경(!modal)}}>버튼</button>
      {
        modal===true
        ? <Modal />
        : null
      }
      
      {/* { 반복된UI() } */}

      {
        글제목.map(function(글){
          return (
          <div className="list">
            <h3> {글} </h3>
            <p>7월 25일 발행</p>
            <hr/>
          </div>
          )
        })
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
