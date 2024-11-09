import React from 'react';
import RequestCard from './sentRequestCard';

const SentRequests = () => {
  const requests = [
    {
      date: '2024-11-07',
      time: '10:00 AM',
      receiverName: 'Jane Doe',
      status: 'Pending',
      requiredSkill: 'JavaScript',
    },
    {
      date: '2024-11-06',
      time: '2:00 PM',
      receiverName: 'John Smith',
      status: 'Accepted',
      requiredSkill: 'React',
    },
    {
      date: '2024-11-05',
      time: '1:30 PM',
      receiverName: 'Emma White',
      status: 'Rejected',
      requiredSkill: 'Node.js',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sent Requests</h2>
      {requests.map((req, index) => (
        <RequestCard
          key={index}
          date={req.date}
          time={req.time}
          receiverName={req.receiverName}
          status={req.status}
          requiredSkill={req.requiredSkill}
        />
      ))}
    </div>
  );
};

export default SentRequests;
