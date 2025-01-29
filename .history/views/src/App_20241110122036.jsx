import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import SignupForm from './components/signuplogin/signup';
import LoginForm from './components/signuplogin/login';
import Me from './components/menu/profile';
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
  useEffect(() => {
    // Check login status on component mount
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/v1/users/isLoggedIn');
        // Adjust URL as needed
        console.log(response);
        setIsLoggedIn(response.data.data.isLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <div className="h-screen bg-black">
      <Router>
        <Routes>
          {/* Public Routes */}
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignupForm onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/login" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
              {/* Redirect to Home if accessing protected routes while not authenticated */}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            // Protected Routes
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
              {/* Redirect to Profile if accessing public routes while authenticated */}
              <Route path="*" element={<Navigate to="/profile" />} />
            </Route>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
