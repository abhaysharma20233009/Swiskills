import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

function Home() {
  return (
    <div className="font-sans bg-zinc-900 text-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-zinc-800">
        {/* Glowing Balls Animation */}
      <div className="h-20 w-20 mx-8 my-4 flex items-center justify-center">
        <div className="absolute h-10 w-10 rounded-full bg-blue-400 animate-bounce1 glow"></div>
        <div className="absolute h-10 w-10 rounded-full bg-blue-100 animate-bounce2 glow"></div>
        <div className="absolute h-10 w-10 rounded-full bg-green-400 animate-bounce3 glow"></div>
      </div>
        <h1 className="text-2xl font-bold text-green-400">SwiSkills</h1>
        <div className="space-x-1 flex">
          <Link to="/login" className="flex items-center bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            <FaSignInAlt className="mr-2" /> Login
          </Link>
          <Link to="/signup" className="flex items-center bg-green-500 px-4 py-2 rounded hover:bg-green-600">
            <FaUserPlus className="mr-2" /> Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center p-10 bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-banner-image.jpg)' }}>
        <h2 className="text-4xl font-semibold mb-4">Find the Skills You Need to Succeed</h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-300">SwiSkills is here to connect you with professionals who have the skills you need to complete your projects successfully and efficiently.</p>
        <Link to="/signup" className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600">Get Started</Link>
      </section>

      {/* Categories Section */}
      <section className="p-10 bg-zinc-800">
        <h3 className="text-2xl font-semibold text-center mb-6">Explore Skill Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Programming', 'Marketing', 'Design', 'Writing'].map((category) => (
            <div key={category} className="bg-transparent border border-zinc-300 p-6 rounded-lg shadow-2px hover:shadow-lg">
              <h4 className="text-lg font-semibold mb-2">{category}</h4>
              <p className="text-gray-400">Find experts in {category} who can help you reach your goals.</p>
              <Link to={`/categories/${category.toLowerCase()}`} className="text-blue-500 mt-4 inline-block">Browse {category}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="p-10 bg-zinc-900">
        <h3 className="text-2xl font-semibold text-center mb-6">Featured Professionals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['John Doe', 'Jane Smith', 'Alex Johnson'].map((name) => (
            <div key={name} className="bg-transparent p-6 rounded-lg shadow-md hover:shadow-lg text-center border border-zinc-200">
              <img src={`/path-to-profile-images/${name.toLowerCase().replace(' ', '-')}.jpg`} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="text-lg font-semibold">{name}</h4>
              <p className="text-gray-400 mb-4">Skill: Web Development</p>
              <Link to={`/profile/${name.toLowerCase().replace(' ', '-')}`} className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">View Profile</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="p-10 text-center bg-zinc-800">
        <h3 className="text-3xl font-semibold mb-4">Join SwiSkills Today!</h3>
        <p className="text-gray-300 mb-6">Whether you need a skill or have a skill to share, SwiSkills is the platform for you.</p>
        <Link to="/signup" className="bg-green-500 py-2 px-6 rounded text-white hover:bg-green-600">Sign Up Now</Link>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-zinc-800 text-center text-gray-500">
        <p>&copy; 2024 SwiSkills. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
