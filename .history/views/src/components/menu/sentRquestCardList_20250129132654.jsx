import React, { useEffect, useState } from 'react';
import RequestCard from './sentRequestCard';
import axios from 'axios';

const SentRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/v1/requests/sent', {
          withCredentials: true,
        });
        console.log(res.data);
        // Check if sentRequests is an array before setting it to state
        const sentRequests = res.data?.data?.sentRequests || [];
        
        if (
          Array.isArray(sentRequests) &&
          JSON.stringify(sentRequests) !== JSON.stringify(requests)
        ) {
         
        } else {
          console.warn('Unexpected response format:', res.data);
        }
      
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const formattedRequests = requests.map((req) => {
    const date = new Date(req.timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return {
      date: formattedDate,
      time: formattedTime,
      receiverName: req.receiver.name,
      receiverEmail: req.receiver.email,
      status: req.status,
      requiredSkill: req.requestedSkills.join(', '),
      message: req.message,
    };
  });

  return (
    <div>
      {formattedRequests.length > 0 ? (
        formattedRequests.map((req, index) => (
          <RequestCard
            key={index}
            date={req.date}
            time={req.time}
            receiverName={req.username}
            receiverEmail={req.receiverEmail}
            status={req.status}
            requiredSkill={req.requiredSkill}
            message={req.message}
          />
        ))
      ) : (
        <p>No sent requests available.</p>
      )}
    </div>
  );
};

export default SentRequests;
