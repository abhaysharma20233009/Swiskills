import React, { useState } from 'react';
// import { registerUser } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './signuplogin.css';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage('User registered successfully!');
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex bg-zinc-800 w-full">
      {/* Glowing Balls Animation */}
      <div className="h-20 w-20 mx-8 my-4 flex items-center justify-center">
        <div className="absolute h-10 w-10 rounded-full bg-red-400 animate-bounce1 glow"></div>
        <div className="absolute h-10 w-10 rounded-full bg-blue-100 animate-bounce2 glow"></div>
        <div className="absolute h-10 w-10 rounded-full bg-green-400 animate-bounce3 glow"></div>
      </div>
      <div className="my-8 text-4xl text-white font-extrabold">SwiSkills</div>

      <div className="flex flex-col items-center min-h-screen w-full bg-transparent text-white p-4">
        <div className="mt-12 mb-4 text-4xl">Welcome to SwiSkills</div>

        {/* Form Div */}
        <div className="relative w-96 bg-red-100 mb-3">
          <div className="absolute inset-0 rounded-lg"></div>
          <div className="bg-gray-900 rounded-lg shadow-lg px-6 py-4 max-w-md w-full relative z-10 transition-all duration-200 transform hover:scale-105">
            <h2 className="text-1xl font-bold text-white mb-3 text-center">
              Create an Account
            </h2>

            {message && (
              <p className="text-center text-green-400 mb-2">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                />
              </div>
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

              <div>
                <label className="block text-gray-300">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    required
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                      className="text-gray-300"
                    />
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition duration-150"
              >
                Sign Up
              </button>
            </form>
            <p className="text-sm text-center text-gray-400 mt-6">
              Already have an account?{' '}
              <a href="#" className="text-red-400 hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
