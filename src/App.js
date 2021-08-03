/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import './App.css';
import listJson from './json/listJson.json';
import writeJson from './json/writeJson.json';


function App() {

  let [글제목, 글제목변경] = useState(['하이하이요', '우동 맛있겠다', '잠을 달라']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let [listData, changeListData] = useState([]);
  let [writeData, changeWriteData] = useState([]);

  // 페이지가 열릴 때 json파일의 데이터를 받아와서 state에 저장
  useEffect(()=>{
    var newArray = [...listJson];
    changeListData(newArray);
    var newArray2 = [writeJson];
    changeWriteData(newArray2);
  },[]);

  function 제목정렬() {
    var newArray = [...글제목];
    newArray.sort();
    글제목변경(newArray);
  }

  function 글추가() {
    // var arrayCopy = [...글제목];
    // arrayCopy.unshift(입력값);
    // 글제목변경(arrayCopy);
    // var arrayCopy2 = [...좋아요];
    // arrayCopy2.unshift(0);
    // 좋아요변경(arrayCopy2);

    // 글 추가를 위한 post데이터를 백엔드에 보내고
    // return온 데이터를 listdata에 추가
    // 해당 테스트에선 return온 데이터를 writeData로 대체
    var listDataCopy = [...listData];
    var writedataCopy = [...writeData];
    listDataCopy.unshift(writedataCopy[0]);
    changeListData(listDataCopy);
  }

  function 좋아요추가(i) {
    var arrayCopy = [...좋아요];
    arrayCopy[i]+=1;
    좋아요변경(arrayCopy);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <button onClick={ 제목정렬 }>제목 정렬하기</button>

      {
        listData.map(function (data, i) {
          return (
            <div className="list" key={i}>
              <h3 onClick={() => { 누른제목변경(i) }}> {data.context} <span onClick={ ()=>{ 좋아요추가(i) } }>😘</span> { data.likes }</h3>
              <p>{data.issued}</p>
              <hr />
            </div>
          )
        })
      }

      <div className="publish">
        <input onChange={ (e) => { 입력값변경(e.target.value) }} />
        <button onClick={ 글추가 }>저장</button>
      </div>

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
