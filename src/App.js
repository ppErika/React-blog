import logo from './logo.svg';
import './App.css';

function App() {

  let posts = '강남 고기 맛집';
  
  function ham() {
    return 100
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div style={{color:'yellow', fontSize: '30px'}}>개발 Blog</div>
      </div>
      <img src={logo} />
      <h4>{posts}</h4>
      <h2>{ham()}</h2>
    </div>
  );
}

export default App;
