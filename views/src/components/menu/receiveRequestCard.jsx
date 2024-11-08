import React from 'react';

function RequestCard({ request, onAccept, onReject }) {
  const { name, message, date } = request;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-zinc-800 text-white p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <span className="text-sm text-gray-400">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-300 mb-4">{message}</p>

      {/* Accept/Reject buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => onAccept(request)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default RequestCard;
