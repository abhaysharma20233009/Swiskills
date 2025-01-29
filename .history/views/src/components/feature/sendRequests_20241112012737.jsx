import React, { useState } from 'react';
import axios from 'axios';
import { showAlert } from '../../api/alert';

function SendRequestForm({ onClose, onRequestSuccess }) {
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
        showAlert('success', 'Request sent successfully');
        onRequestSuccess(); // Update the connection status to 'connected'
        onClose(); // Close the modal
      }
    } catch (err) {
      console.error('Error:', err?.response?.data?.message || err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-gray-700">Username:</label>
        <input 
          type="text" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter receiver username" 
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="requireSkills" className="block text-gray-700">Required Skills (comma-separated):</label>
        <input 
          type="text" 
          id="requireSkills" 
          value={requireSkills} 
          onChange={(e) => setRequireSkills(e.target.value)} 
          placeholder="e.g., JavaScript, Node.js" 
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-gray-700">Message:</label>
        <textarea 
          id="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Write your message here" 
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="flex justify-between">
        <button 
          type="button" 
          onClick={onClose} 
          className="py-2 px-4 bg-gray-500 text-white rounded-md"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Send Request
        </button>
      </div>
    </form>
  );
}

export default SendRequestForm;
