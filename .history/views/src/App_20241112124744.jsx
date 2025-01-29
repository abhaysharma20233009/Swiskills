// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import SignupForm from './components/signuplogin/signup';
import LoginForm from './components/signuplogin/login';
import SentRequests from './components/menu/sentRquestCardList.jsx'; // Fixed path
import RequestList from './components/menu/receiveCardList.jsx';
import Layout from './components/home/layout'; // Ensure correct import
import ReviewsList from './components/menu/reviewCardList.jsx';
import AccountSettings from './components/menu/accountSetting.jsx';
import ExploreCardList from './components/dashboard/skillsCardList.jsx';
import './App.css';
import Chats from './components/chat/chats.jsx';
import SendRequestForm from './components/feature/sendRequests.jsx';
import ProfileView from './components/menu/profile.jsx';
import ProfileEdit from './components/menu/ProfileEdit.jsx';
import TopRatedUsers from './components/userList/TopRatedUsers.jsx';
import ForgotPassword from './components/feature/forgotPassword.jsx';
import Home from './components/home/Home.jsx';
import ResetPassword from './components/feature/resetPassword.jsx';
import UserProfile from './components/userList/UserProfile.jsx';
import ProtectedRoute from './ProtectedRoutes'; // Import the ProtectedRoute

function App() {
  return (
    <div className="h-screen bg-black">
      <Router>
        <AuthProvider> {/* Wrap the app in AuthProvider */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />

            {/* Protected Routes wrapped in Layout */}
            <Route element={<ProtectedRoute element={<Layout />} />}>
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/sentRequest" element={<SentRequests />} />
              <Route path="/receivedRequest" element={<RequestList />} />
              <Route path="/receivedReview" element={<ReviewsList />} />
              <Route path="/accountSettings" element={<AccountSettings />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/home" element={<ExploreCardList />} />
              <Route path="/sendRequest" element={<SendRequestForm />} />
              <Route path="/edit-profile" element={<ProfileEdit />} />
              <Route path="/top-rated-users" element={<TopRatedUsers />} />
              <Route path="/top-rated-users/:userId" element={<UserProfile />} />
            </Route>

            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            {/* Add other routes as needed */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
