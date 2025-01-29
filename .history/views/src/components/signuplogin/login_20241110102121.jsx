import React, { useState, useEffect } from 'react';
import { login } from '../../api/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './signuplogin.css';


function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
    login(formData.email, formData.password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex bg-zinc-800 w-full">
      {/* Glowing Balls Animation */}
      <div className="h-20 w-20 mx-8 my-4 flex items-center justify-center">
        <div className="absolute h-10 w-10 rounded-full bg-yellow-400 animate-bounce1 glow"></div>
        <div className="absolute h-10 w-10 rounded-full bg-blue-100 animate-bounce2 glow"></div>
        <div className="absolute h-10 w-10 rounded-full bg-green-400 animate-bounce3 glow"></div>
      </div>
      <div className="my-8 text-4xl text-white font-extrabold">SwiSkills</div>
      <div className="flex flex-col items-center min-h-screen w-full bg-transparent text-white p-4">
        <div className="mt-12 mb-4 text-4xl ">Welcome to SwiSkills</div>
        <div className="mt-12 mb-4 text-4xl ">Welcome to SwiSkills</div>
        <div className="relative w-96 bg-red-100 mb-3">
          <div className="absolute inset-0 rounded-lg"></div>
          <div className="absolute inset-0 rounded-lg"></div>
          <div className="bg-gray-900 rounded-lg shadow-lg px-6 py-2 max-w-md w-full relative z-10 transition-all duration-200 transform hover:scale-105">
            <h2 className="text-1xl font-bold text-white mb-3 text-center">
              Login an Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">


              <div>
                <label className="block text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    required
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="text-gray-300"
                    />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition duration-150"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <a href="./signup" className="text-red-400 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
