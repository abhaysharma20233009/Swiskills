import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import SendRequestForm from './components/feature/sendRequests';
import SignupForm from './components/signuplogin/signup';
import LoginForm from './components/signuplogin/login';
import SentRequests from './components/menu/sentRquestCardList';
import RequestList from './components/menu/receiveCardList';
import Layout from './components/home/layout';
import ReviewsList from './components/menu/reviewCardList';
import AccountSettings from './components/menu/accountSetting';
import ExploreCardList from './components/dashboard/skillsCardList';
import Chats from './components/chat/chats';
import Home from './components/home/Home';
import ProfileView from './components/menu/profile';
import ProfileEdit from './components/menu/ProfileEdit';
import TopRatedUsers from './components/userList/TopRatedUsers';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

 
  return (
    <div className="h-screen bg-black">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/login" element={<LoginForm />} />
              <Route path="/home" element={<ExploreCardList />} />
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/sentRequest" element={<SentRequests />} />
              <Route path="/sendRequest" element={<SendRequestForm/>} />
              <Route path="/receivedRequest" element={<RequestList />} />
              <Route path="/receivedReview" element={<ReviewsList />} />
              <Route path="/accountSettings" element={<AccountSettings />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/edit-profile" element={<ProfileEdit />} />
              <Route path="/top-rated-users" element={<TopRatedUsers />} />
              <Route path="*" element={<Navigate to="/home" />} />
       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
