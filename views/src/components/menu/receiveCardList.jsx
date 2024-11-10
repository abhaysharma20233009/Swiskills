import React, { useEffect, useState } from 'react';
import RequestCard from './receiveRequestCard'; // Importing the RequestCard component
import axios from 'axios'; // Importing axios for API requests

function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10; // Define number of items per page

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/v1/requests/received', {
          withCredentials: true,
        });

        if (response.data.status === 'success') {
          setRequests(response.data.data.receivedRequests);
        } else {
          setError('Failed to fetch requests.');
        }
      } catch (err) {
        setError('Error fetching received requests.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedRequests();
  }, []);

  const handleAccept = async (request) => {
    try {
      const response = await axios.patch(
        `/api/v1/requests/received/${request._id}/accepted`
      );

      if (response.status === 200) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === request._id ? { ...req, status: 'accepted' } : req
          )
        );
      } else {
        alert('Failed to accept request. Please try again.');
      }
    } catch (error) {
      console.error('Error accepting the request:', error);
      alert('An error occurred while accepting the request.');
    }
  };

  const handleReject = async (request) => {
    try {
      const response = await axios.patch(
        `/api/v1/requests/received/${request._id}/rejected`
      );

      if (response.status === 200) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === request._id ? { ...req, status: 'rejected' } : req
          )
        );
      } else {
        alert('Failed to reject request. Please try again.');
      }
    } catch (error) {
      console.error('Error rejecting the request:', error);
      alert('An error occurred while rejecting the request.');
    }
  };

  // Calculate pagination indexes
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentRequests = requests.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Incoming Requests</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests at the moment.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentRequests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                onAccept={() => handleAccept(request)}
                onReject={() => handleReject(request)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RequestList;
