import React, { useState } from 'react';
import RequestCard from './receiveRequestCard'; // Importing the RequestCard component

// RequestList Component
function RequestList() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'John Doe',
      message: 'Hi, I would like to connect with you regarding a new project.',
      date: '2024-11-08',
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'I am interested in discussing job opportunities with you.',
      date: '2024-11-07',
    },
    {
      id: 3,
      name: 'David Lee',
      message: 'Can we schedule a call to discuss collaboration ideas?',
      date: '2024-11-06',
    },
  ]);

  // Handler for accepting a request
  const handleAccept = (request) => {
    alert(`Request from ${request.name} accepted.`);
    // Update state or call API to mark the request as accepted
  };

  // Handler for rejecting a request
  const handleReject = (request) => {
    alert(`Request from ${request.name} rejected.`);
    // Update state or call API to mark the request as rejected
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Incoming Requests</h2>

      {/* Map through requests and render RequestCard for each */}
      <div>
        {requests.length === 0 ? (
          <p className="text-center text-gray-500">
            No requests at the moment.
          </p>
        ) : (
          requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RequestList;
