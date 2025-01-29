import React from 'react';

function RequestCard({ request, onAccept, onReject }) {
  const { sender, requestedSkills, status, timestamp, message } = request;
  const { name, email } = sender;

  // Format date with locale options for clarity
  const formattedDate = new Date(timestamp);
  const isValidDate = !isNaN(formattedDate.getTime());
  const displayDate = isValidDate
    ? formattedDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : 'Invalid Date';

  return (
    <div className="rounded-lg overflow-hidden border border-zinc-200 shadow-lg bg-zinc-800 text-white p-6 mb-4">
      {/* Header section with sender's name, email, and request date */}
      <div className="flex flex-col mb-4">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-200 mb-1">{email}</p>
        <span className="text-sm text-gray-200">{displayDate}</span>
      </div>

      {/* Message content */}
      <p className="text-blue-500 mb-4">{message}</p>

      {/* Status */}
      <p
        className={`mb-4 font-semibold ${
          status === 'accepted'
            ? 'text-green-400'
            : status === 'rejected'
            ? 'text-red-400'
            : 'text-yellow-400'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>

      {/* Display requested skills */}
      <div className="mb-4">
        <p className="text-gray-400 font-medium">Requested Skills:</p>
        <ul className="list-disc list-inside ml-4 text-gray-300">
          {requestedSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Accept/Reject buttons */}
      {status !== 'accepted' && status !== 'rejected' && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onAccept(request)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(request)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default RequestCard;
