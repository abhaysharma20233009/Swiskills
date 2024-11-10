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
                  <UserProfile
                    userProfile={{
                      name: 'Jane Doe',
                      title: 'Data Scientist',
                      location: 'San Francisco, CA',
                      profileImage: 'https://via.placeholder.com/150',
                      bannerImage: 'https://via.placeholder.com/800x200',
                      rating: 4.7,
                      about: 'Data scientist with expertise in machine learning.',
                      experience: {
                        title: 'Data Analyst',
                        company: 'Data Solutions',
                        duration: '3 years',
                        description: 'Analyzed large datasets to drive business insights.',
                      },
                      education: {
                        degree: 'M.S. in Data Science',
                        university: 'Tech University',
                        graduation: '2018',
                      },
                      skills: [
                        { name: 'Python', rating: 4.5 },
                        { name: 'Machine Learning', rating: 4 },
                        { name: 'SQL', rating: 3.5 },
                        { name: 'Data Visualization', rating: 4 },
                      ],
                    }}
                    isConnected={false}
                  />
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

