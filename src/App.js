import React, { useEffect, useState } from 'react';
import './App.css';
import listJson from './json/listJson.json';
import writeJson from './json/writeJson.json';
import axios from 'axios';

const backendUrl = 'http://localhost:8080';

function App() {

  let [글제목, 글제목변경] = useState(['하이하이요', '우동 맛있겠다', '잠을 달라']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let [listData, setListData] = useState([]);
  let [writeData, setWriteData] = useState([]);

  // 페이지가 열릴 때 json파일의 데이터를 받아와서 state에 저장
  useEffect(()=>{

    // json파일에서 데이터 가져오는 코드
    // var newArray = [...listJson];
    // setListData(newArray);
    // var newArray2 = [writeJson];
    // setWriteData(newArray2);

    // 백엔드 연동이 된다면 list를 요청하고
    // return을 받아서 list state에 넣는 방식으로 수정
    axios.get(backendUrl + '/list')
    .then((result)=>{
      console.log(result.data)
      var newArray = [...result.data];
      setListData(newArray);
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

  function 글추가() {
    // var arrayCopy = [...글제목];
    // arrayCopy.unshift(입력값);
    // 글제목변경(arrayCopy);
    // var arrayCopy2 = [...좋아요];
    // arrayCopy2.unshift(0);
    // 좋아요변경(arrayCopy2);

    // 해당 테스트에선 return온 데이터를 writeData로 대체
    // var listDataCopy = [...listData];
    // var writedataCopy = [...writeData];
    // listDataCopy.unshift(writedataCopy[0]);
    // setListData(listDataCopy);

    // 글 추가를 위한 post데이터를 백엔드에 보내고
    // return온 데이터를 listdata 맨 위에 추가
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

  function 좋아요추가(id) {
    // var arrayCopy = [...좋아요];
    // arrayCopy[i]+=1;
    // 좋아요변경(arrayCopy);

    // 글 id에 맞춰서 좋아요 추가 요청을 백엔드에 보내고
    // 성공하면 list스테이트에서 해당id의 좋아요 +=1
    // onClick 매서드의 좋아요추가(i)를 좋아요추가(data.id)로 사용하면 될 듯
    axios.get(backendUrl + '/like/' + id)
    .then((result)=>{
      console.log(result.data)
      var seq = getIndex(listData, 'id', id)
      var listDataCopy = [...listData];
      listDataCopy[seq].likes += 1;
      setListData(listDataCopy);
    })
    .catch(()=>{
      console.log('failed-like')
    })
  }

  function 글삭제(id){
    //console.log(id);

    axios.get(backendUrl + '/delete/' + id)
    .then((result)=>{
      //console.log(result.data)
      var seq = getIndex(listData, 'id', id)
      var listDataCopy = [...listData];
      listDataCopy.splice(seq, 1);
      setListData(listDataCopy);
    })
    .catch(()=>{
      console.log('failed-delete')
    })

    // 받아온 id로 백엔드에 delete요청
    // 문제없이 delete되면 list state에서 해당 id 글을 찾아서 삭제
  }

  function getIndex(arr, prop, value) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
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
