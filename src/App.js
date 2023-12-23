import { Routes, Route } from 'react-router';
import './App.css';

import Home from "./pages/Home";
import Main from './pages/Main';
import AppContext from './AppContext';
import { useState } from 'react';

function App() {
  const [stats, setStats] = useState({});
  const [expenses, setExpenses] = useState({
    absolute: [],
    total: 0
  });
  //Euros:
 

  return (
    <div className="App">
    <AppContext.Provider value={{stats, setStats, expenses, setExpenses}}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/main' element={<Main />}></Route>
      </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
