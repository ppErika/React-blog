import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState(['하이하이요', '우동 맛있겠다']);
  
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <div className="list">
        <h3> {글제목[0]} </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
    </div>
  );
}

export default App;
