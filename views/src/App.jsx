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
import SendRequestForm from './components/feature/sendRequests.jsx'
import ProfileView from './components/menu/profile.jsx';
import ProfileEdit from './components/menu/ProfileEdit.jsx';
import TopRatedUsers from './components/userList/TopRatedUsers.jsx';
import ForgotPassword from './components/feature/forgotPassword.jsx';
import Home from './components/home/Home.jsx'
import ResetPassword from './components/feature/resetPassword.jsx';
import UserProfile from './components/userList/UserProfile.jsx'
const MainLayout = ({ children }) => <Layout>{children}</Layout>;


function App() {
  return (
    <>
      <Router>
       
       
       
          
           <Routes>
          
          <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<MainLayout><ProfileView/></MainLayout>} />
            <Route path="/sentRequest" element={<MainLayout><SentRequests /></MainLayout>} />
            <Route path="/receivedRequest" element={<MainLayout><RequestList /></MainLayout>} />{' '}
            <Route path="/receivedReview" element={<MainLayout><ReviewsList /></MainLayout>} />{' '}
            <Route path="/accountSettings" element={<MainLayout><AccountSettings /></MainLayout>} />{' '}
            <Route path="/chats" element={<MainLayout><Chats /></MainLayout>} />{' '}
            <Route path="/home" element={<MainLayout><ExploreCardList /></MainLayout>} />{' '}
            <Route path="/sendRequest" element={<MainLayout><SendRequestForm/></MainLayout>}/>{' '}
            <Route path="/edit-profile" element={<MainLayout><ProfileEdit /></MainLayout>} />{' '}
            <Route path="/top-rated-users" element={<MainLayout><TopRatedUsers /></MainLayout>} />{' '}
            <Route path="/forget-password" element={<MainLayout><ForgotPassword /></MainLayout>} />{' '}
             <Route path="/resetPassword/:token" element={<MainLayout><ResetPassword/></MainLayout>}/>{' '}
             <Route path="/top-rated-users/:userId" element={<MainLayout><UserProfile /></MainLayout>} />
          
          </Routes>
       
      </Router>
    </>
  );
}

export default App;
