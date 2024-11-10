import axios from 'axios';
import React, { useState } from 'react';
import { showAlert } from '../../api/alert';

function SendRequestForm() {
  const [username, setUsername] = useState('');
  const [requireSkills, setRequireSkills] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      username,
      requireSkills: requireSkills.split(',').map((skill) => skill.trim()),
      message,
    };

    try {
      const response = await axios(`/api/v1/requests/${requestData.username}`, {
        method: 'POST',
        data: {
          requireSkills: requestData.requireSkills,
          message: requestData.message,
        },
      });
      if (response.status === 200) {
        console.log('request send successfuly');
        showAlert('success', 'Request send Successfuly');
      }
    } catch (err) {
      console.error('Error:', err?.response?.data?.message || err?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Send Request
        </h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-200 font-medium mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter receiver username"
            className="w-full px-4 py-2 border rounded-md text-gray-800 border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="requireSkills"
            className="block text-gray-200 font-medium mb-2"
          >
            Required Skills (comma-separated):
          </label>
          <input
            type="text"
            id="requireSkills"
            value={requireSkills}
            onChange={(e) => setRequireSkills(e.target.value)}
            placeholder="e.g., JavaScript, Node.js"
            className="w-full px-4 py-2 border rounded-md text-gray-800 border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-200 font-medium mb-2"
          >
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here"
            className="w-full px-4 py-2 border rounded-md text-gray-800 border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Send Request
        </button>
      </form>
    </div>
  );
}

export default SendRequestForm;
