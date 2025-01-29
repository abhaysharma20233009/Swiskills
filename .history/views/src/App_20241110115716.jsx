import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

import SignupForm from './components/signuplogin/signup';
import LoginForm from './components/signuplogin/login';
import Home from './components/home/Home';
import Layout from './components/home/layout';
import Profile from './components/menu/Profile';
import SentRequests from './components/menu/sentRquestCardList';
import RequestList from './components/menu/receiveCardList';
import ReviewsList from './components/menu/reviewCardList';
import AccountSettings from './components/menu/accountSetting';
import ExploreCardList from './components/dashboard/skillsCardList';
import Chats from './components/chat/chats';
import SendRequestForm from './components/feature/sendRequests';
import ProfileEdit from './components/menu/ProfileEdit';
import TopRatedUsers from './components/userList/TopRatedUsers';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);

  // ProtectedRoute component that redirects to /login if the user is not authenticated
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

        {/* Private Routes within Layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/sentRequest" element={<SentRequests />} />
          <Route path="/receivedRequest" element={<RequestList />} />
          <Route path="/receivedReview" element={<ReviewsList />} />
          <Route path="/accountSettings" element={<AccountSettings />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/dashboard" element={<ExploreCardList />} /> {/* Changed to /dashboard */}
          <Route path="/sendRequest" element={<SendRequestForm />} />
          <Route path="/edit-profile" element={<ProfileEdit />} />
          <Route path="/top-rated-users" element={<TopRatedUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
