import React, { useState } from 'react';
import { login } from '../../api/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './signuplogin.css';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row bg-zinc-800 min-h-screen text-white">
      {/* Glowing Balls Animation - hidden on small screens */}
      <div className="hidden md:flex flex-col items-center justify-start p-6 space-y-4">
        <div className="relative h-20 w-20">
          <div className="absolute h-10 w-10 rounded-full bg-yellow-400 animate-bounce1 glow" />
          <div className="absolute h-10 w-10 rounded-full bg-blue-100 animate-bounce2 glow" />
          <div className="absolute h-10 w-10 rounded-full bg-green-400 animate-bounce3 glow" />
        </div>
        <div className="text-4xl font-extrabold">SwiSkills</div>
      </div>

      {/* Login Form */}
      <div className="flex flex-col justify-center items-center w-full px-4 md:px-8 py-10">
        <div className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Welcome to SwiSkills
        </div>

        <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg px-6 py-8">
          <h2 className="text-xl font-bold mb-6 text-center">
            Login to Your Account
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

            {/* Forgot Password */}
            <p
              className="text-sm text-center text-gray-400 mt-3 cursor-pointer hover:underline"
              onClick={() => navigate('/forget-password')}
            >
              Forgot Password?
            </p>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-red-400 hover:underline cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
