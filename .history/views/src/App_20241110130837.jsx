import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/signuplogin/signup';
import LoginForm from './components/signuplogin/login';
import Me from './components/menu/profile';
import SentRequests from './components/menu/sentRquestCardList.jsx'; // Fixed path
import RequestList from './components/menu/receiveCardList.jsx';
import Layout from './components/home/layout';
import ReviewsList from './components/menu/reviewCardList.jsx';
import AccountSettings from './components/menu/accountSetting.jsx';
import ExploreCardList from './components/dashboard/skillsCardList.jsx';
import './App.css';
import Chats from './components/chat/chats.jsx';

import ProfileView from './components/menu/profile.jsx';
import ProfileEdit from './components/menu/ProfileEdit.jsx';
import TopRatedUsers from './components/userList/TopRatedUsers.jsx';

function App() {
  return (
    <div className="h-screen bg-black">
      <Router>
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
            <Route path="/seneRequest" element={<SendRequestForm/>}/>{' '}
            <Route path="/edit-profile" element={<ProfileEdit />} />{' '}
            <Route path="/top-rated-users" element={<TopRatedUsers />} />{' '}
            {/* Fixed path */}
            {/* Add other routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
