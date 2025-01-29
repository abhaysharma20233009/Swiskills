import React from 'react';

const RequestCard = ({
  date,
  time,
  receiverName,
  receiverEmail,
  status,
  requiredSkill,
  message,
}) => {
  const statusClasses = {
    pending: 'text-yellow-700 bg-yellow-100',
    accepted: 'text-green-700 bg-green-100',
    rejected: 'text-red-700 bg-red-100',
  };

  return (
    <div className="border border-gray-700 rounded-lg p-4 mb-4 bg-zinc-800 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-white">
          Requested to {receiverName}
        </h3>
        <span
          className={`px-3 py-1 rounded-md text-sm font-semibold ${
            statusClasses[status.toLowerCase()]
          }`}
        >
          {status}
        </span>
      </div>
      <div className="text-gray-300">
   
        <p>
          <span className="font-semibold">Email:</span> {receiverEmail}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {date}
        </p>
        <p>
          <span className="font-semibold">Time:</span> {time}
        </p>
        <p>
          <span className="font-semibold">Required Skill:</span> {requiredSkill}
        </p>
        {message && (
          <p>
            <span className="font-semibold">Message:</span> {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
