import React from 'react';
import ExploreCard from './skillsCard'; // Import the ExploreCard component

const ExploreCardList = () => {
  // Sample data for each card
  const cardData = [
    {
      id: 1,
      name: 'React Development',
      image: 'https://via.placeholder.com/300',
      enrolledUsers: 150,
    },
    {
      id: 2,
      name: 'Node.js Basics',
      image: 'https://via.placeholder.com/300',
      enrolledUsers: 200,
    },
    {
      id: 3,
      name: 'Python Programming',
      image: 'https://via.placeholder.com/300',
      enrolledUsers: 120,
    },
    {
      id: 4,
      name: 'Machine Learning',
      image: 'https://via.placeholder.com/300',
      enrolledUsers: 90,
    },
    // Add more data objects as needed
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cardData.map((card) => (
        <ExploreCard
          key={card.id}
          name={card.name}
          image={card.image}
          enrolledUsers={card.enrolledUsers}
        />
      ))}
    </div>
  );
};

export default ExploreCardList;
