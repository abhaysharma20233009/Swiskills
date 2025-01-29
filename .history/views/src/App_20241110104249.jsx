import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/signuplogin/signup';
import LoginForm from './components/signuplogin/login';

import Me from './components/menu/Profile.jsx';
 // Fixed path
import RequestList from './components/menu/receiveCardList.jsx';
import Layout from './components/home/layout';
import ReviewsList from './components/menu/reviewCardList.jsx';
import AccountSettings from './components/menu/accountSetting.jsx';
import ExploreCardList from './components/dashboard/skillsCardList.jsx';
import './App.css';
import Chats from './components/chat/chats.jsx';

import ProfileView from './components/menu/Profile.jsx';

import TopRatedUsers from './components/userList/TopRatedUsers.jsx';
import SentRequests from './components/menu/sentRquestCardList';
import UserProfile from './components/userList/userprofile';

import ProfileEdit from './components/menu/ProfileEdit';
import Home from './components/home/Home';
import SendRequestForm from './components/feature/sendRequests.jsx';
import SendReview from './components/feature/sendReview.jsx';
import ForgotPassword from './components/feature/forgotPassword.jsx';
import ResetPassword from './components/feature/resetPassword.jsx';
import './App.css';
import Profile from './components/menu/Profile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/login" element={<LoginForm onLogin={() => setIsLoggedIn(true)} />} />
        </Routes>
        <Layout>
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<ProfileView/>} />
            <Route path="/sentRequest" element={<SentRequests />} />
            <Route path="/receivedRequest" element={<RequestList />} />{' '}
            <Route path="/receivedReview" element={<ReviewsList />} />{' '}
            <Route path="/accountSettings" element={<AccountSettings />} />{' '}
            <Route path="/chats" element={<Chats />} />{' '}
            <Route path="/" element={<ExploreCardList />} />{' '}
            
            <Route path="/edit-profile" element={<ProfileEdit />} />{' '}
            <Route path="/top-rated-users" element={<TopRatedUsers />} />{' '}
            {/* Fixed path */}
            {/* Add other routes as needed */}
          </Routes>
        </Layout>
      </Router>

      {isLoggedIn && (
        <Router>
          <Layout>
            <Routes>
              <Route path="/me" element={<Me />} />
              <Route path="/sentRequest" element={<SentRequests />} />
              <Route path="/receivedRequest" element={<RequestList />} />
              <Route path="/receivedReview" element={<ReviewsList />} />
              <Route path="/accountSettings" element={<AccountSettings />} />
              <Route path="/dashboard" element={<ExploreCardList />} />
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/edit-profile" element={<ProfileEdit />} />
              <Route path="/home" element={<TopRatedUsers />} />
              <Route path="/chats" element={<Chats />} />
              <Route
                path="/userprofile"
                element={
                  <UserProfile/>
                }
              />
            </Routes>
          </Layout>
        </Router>
      )}
    </div>
  );
}

export default App;

