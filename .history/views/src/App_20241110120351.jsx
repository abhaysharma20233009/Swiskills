import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/signuplogin/signup';
import LoginForm from './components/signuplogin/login';
import Layout from './components/home/layout';
import Home from './components/home/Home';


import SentRequests from './components/menu/sentRquestCardList';
import RequestList from './components/menu/receiveCardList';
import ReviewsList from './components/menu/reviewCardList';
import AccountSettings from './components/menu/accountSetting';
import ExploreCardList from './components/dashboard/skillsCardList';
import Chats from './components/chat/chats';
import ProfileView from './components/menu/Profile';
import ProfileEdit from './components/menu/ProfileEdit';
import TopRatedUsers from './components/userList/TopRatedUsers';
import UserProfile from './components/userList/userprofile';
import SendRequestForm from './components/feature/sendRequests';
import SendReview from './components/feature/sendReview';
import ForgotPassword from './components/feature/forgotPassword';
import ResetPassword from './components/feature/resetPassword';

import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Protected Routes wrapped in Layout */}
        {isLoggedIn && (
          <Route element={<Layout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/sentRequest" element={<SentRequests />} />
            <Route path="/receivedRequest" element={<RequestList />} />
            <Route path="/receivedReview" element={<ReviewsList />} />
            <Route path="/accountSettings" element={<AccountSettings />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/home" element={<ExploreCardList />} />
            <Route path="/edit-profile" element={<ProfileEdit />} />
            <Route path="/top-rated-users" element={<TopRatedUsers />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/sendRequest" element={<SendRequestForm />} />
            <Route path="/sendReview" element={<SendReview />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
