import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from './components/signuplogin/signup';
import Chatbar from './components/chat/chatbar';
import './App.css'
import ChatBox from './components/chat/chatbox';
import Chats from './components/chat/chats';
import LoginForm from './components/signuplogin/login';

import Layout from './components/home/layout';

function App() {
  return (
    <div className="h-screen bg-black">
      {/* <SignupForm/> */}
      {/* <LoginForm/> */}
      {/* <Chats/> */}
      {/* <Header/> */}
      {/* <Sidebar/> */}
      <Router>
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Add other routes as needed */}
        </Routes>
        
      </Layout>
      </Router>
    </div>
  );
}
export default App;


