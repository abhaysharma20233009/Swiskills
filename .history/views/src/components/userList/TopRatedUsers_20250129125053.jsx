import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserProfileCard from './UserProfileCard';
import axios from 'axios';

function TopRatedUsers() {
    const [users, setUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [page, setPage] = useState(1);
    const usersPerPage = 10;
    const location = useLocation();
    const navigate = useNavigate();

    const skill = location.state?.name;
    console.log('Filtering by skill:', skill);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const startIndex = (page - 1) * usersPerPage;
        const newUsers = users.slice(startIndex, startIndex + usersPerPage);
        setDisplayedUsers(newUsers);
    }, [page, users]);

    const transformUserData = (data) => {
        return data.map(user => ({
            _id: user._id,
            profilePhoto: user.profilePicture || 'default.jpg',
            name: user.profile.name || user.username,
            username: user.username,
            rating: Math.floor( (user.skills.reduce((acc, skill) => acc + (skill.rating || 0), 0) / (user.skills.length || 1))*100)/100,
            skills: user.skills.map(skill => skill.skillName),
            location: user.profile.location || 'Not specified',
        }));
    };

    const fetchUsers = async () => {
        try {
            const response = await axios('/api/v1/users');
            const rawData = response.data.data.data;
            const transformedData = transformUserData(rawData);

            const filteredUsers = transformedData.filter(user =>
                user.skills.some(userSkill => userSkill.toLowerCase() === skill?.toLowerCase())
            );
            filteredUsers.sort((a, b) => a.rating - b.rating);
            setUsers(filteredUsers);
            setDisplayedUsers(filteredUsers.slice(0, usersPerPage));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserClick = (user) => {
        navigate(`/top-rated-users/${user._id}`);
    };

    const loadMoreUsers = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-zinc-800 border border-gray-500">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">Top Rated Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedUsers.map((user) => (
                    <UserProfileCard
                        key={user._id}
                        user={user}
                        onClick={() => handleUserClick(user)} // Click to navigate
                    />
                ))}
            </div>
            {displayedUsers.length > page * usersPerPage && (
                <button
                    onClick={loadMoreUsers}
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded mx-auto block"
                >
                    See More
                </button>
            )}
        </div>
    );
}

export default TopRatedUsers;
