import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/signuplogin/signup';
import LoginForm from './components/signuplogin/login';
import Me from './components/menu/profile';
import SentRequests from './components/menu/sentRquestCardList';
import RequestList from './components/menu/receiveCardList';
import Layout from './components/home/layout';
import ReviewsList from './components/menu/reviewCardList';
import AccountSettings from './components/menu/accountSetting';
import ExploreCardList from './components/dashboard/skillsCardList';
import ProfileView from './components/menu/profile';
import TopRatedUsers from './components/userList/TopRatedUsers';
import UserProfile from './components/userList/userprofile';
import Chats from './components/chat/chats';
import ProfileEdit from './components/menu/ProfileEdit';
import Home from './components/home/Home';

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