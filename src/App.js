import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
const backendUrl = 'http://localhost:8080';


function App() {

  let [글제목, 글제목변경] = useState(['하이하이요', '우동 맛있겠다', '잠을 달라']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let [listData, setListData] = useState([]);

  // 페이지가 열릴 때 백엔드에 list를 요청하고 받아서 listdata state에 저장
  useEffect(()=>{
    axios.get(backendUrl + '/list')
    .then((result)=>{
      var newArray = [...result.data];
      // 시간 순서대로 정렬되도록 reverse 함수로 배열의 순서를 거꾸로 바꿔줌
      setListData(newArray.reverse());
    })
    .catch(()=>{
      console.log('failed-list')
    })
  },[]);

  function 제목정렬() {
    var newArray = [...글제목];
    newArray.sort();
    글제목변경(newArray);
  }

  // 글 추가를 위한 post데이터를 백엔드에 보내고 return온 데이터를 listdata 맨 위에 추가
  function 글추가() {
    let form = new FormData();
    form.append('context', 입력값);
    axios.post(backendUrl + '/write', form)
    .then((result)=>{
      var listDataCopy = [...listData];
      listDataCopy.unshift(result.data);
      setListData(listDataCopy);
    })
    .catch(()=>{
      console.log('failed-write');
    })
  }

  // 백엔드에 like요청 및 listData state에서 해당하는 likes +=1
  function 좋아요추가(id) {
    axios.get(backendUrl + '/like/' + id)
    .then((result)=>{
      var seq = getIndex(listData, 'id', id)
      var listDataCopy = [...listData];
      listDataCopy[seq].likes += 1;
      setListData(listDataCopy);
    })
    .catch(()=>{
      console.log('failed-like')
    })
  }

  // 백엔드에 delete요청 및 listData state에서 해당하는 글 제거
  function 글삭제(id){
    axios.get(backendUrl + '/delete/' + id)
    .then((result)=>{
      var seq = getIndex(listData, 'id', id)
      var listDataCopy = [...listData];
      listDataCopy.splice(seq, 1);
      setListData(listDataCopy);
    })
    .catch(()=>{
      console.log('failed-delete')
    })
  }

  // 배열에서 value값으로 해당 오브젝트의 값이 저장된 배열 번호 return
  function getIndex(arr, prop, value) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
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
              <h3 onClick={() => { 누른제목변경(i) }}> {data.context} <span onClick={ ()=>{ 좋아요추가(data.id) } }>😘</span> { data.likes }</h3>
              <p>{data.issued}
                <button onClick={() => { 글삭제(data.id) }} style={{ marginLeft: '5px' }}> 글 삭제 </button> 
              </p>
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
