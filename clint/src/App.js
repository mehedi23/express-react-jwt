import React  from 'react'
import './App.css';
import Auth from './component/auth'
// import Dashboard from './component/Dashboard';

const App = () => {

  // let get_token = JSON.parse(localStorage.getItem('get_token'));

  return (
    <div className="App">
      <Auth/>

      {/* <Dashboard tok={ get_token && get_token.access} refr={ get_token && get_token.refresh}/> */}
    </div>
  );
}

export default App;
