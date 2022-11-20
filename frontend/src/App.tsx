import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import React from 'react';


const App : React.FC = () => {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path="/" element={<HomePage/>}/>
          </Routes>
      </Router>
    </div>
  );
};

export default App;
