import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => setIsLoggedIn(true);

  // const ProtectedRoute = ({ children }) => {
  //   return isLoggedIn ? children : <Navigate to="/login" />;
  // };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm/>} />
        <Route path="/login" element={<LoginForm } />} />

        {/* Layout Wrapper for Protected Routes */}
        <Route element={<Layout />}>
          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sentRequest"
            element={
              <ProtectedRoute>
                <SentRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/receivedRequest"
            element={
              <ProtectedRoute>
                <RequestList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/receivedReview"
            element={
              <ProtectedRoute>
                <ReviewsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accountSettings"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ExploreCardList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sendRequest"
            element={
              <ProtectedRoute>
                <SendRequestForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/top-rated-users"
            element={
              <ProtectedRoute>
                <TopRatedUsers />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
