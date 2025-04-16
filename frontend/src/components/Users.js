import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import UserComp from './UserComp';

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const nameRef = useRef('');

  // Function to update the user's status on the backend
  

  const unBlockUser = async (email, status) => {
    try {
      const response = await fetch("http://localhost:5001/blockUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, status }),
      });
      const updatedUser = await response.json();
      // Update local state for the user whose status changed
      const updatedUsers = users.map(user =>
        user.email === email ? { ...user, status: updatedUser.status } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  // Function to search for a particular user by username
  const searchUser = async () => {
    const searchValue = nameRef.current.value.trim().toLowerCase();
    if (!searchValue) return;
    try {
      const response = await fetch("http://localhost:5001/particularUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: searchValue }),
      });
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to get the full list of users
  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5001/allUsers');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Calculate the slice for current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className='mt-8'>
      <div className="ml-10 mt-14 inline text-lg w-[50%] text-black">
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span className="ml-2">Admin Dashboard</span>
      </div>

      <div className="ml-[40%] mt-14 text-lg w-[50%] inline text-black">
        <label>Search User:</label>
        <input
          ref={nameRef}
          onChange={(e) => {
            if (e.target.value.trim() === '') {
              getUsers(); // Reload all users when cleared
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchUser();
              setCurrentPage(1); // Reset to first page
            }
          }}
          className="border border-black ml-1"
        />
      </div>

      <div className="ml-[40%] mt-4 text-lg">
        <FontAwesomeIcon icon={faUsers} />
        <span className="ml-2">All Users List</span>
      </div>

      <table className="min-w-full bg-white mt-6 border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Role</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id || user.id} className="hover:bg-gray-50">
                <UserComp indexOfFirstUser={indexOfFirstUser} index={index} user={user} refreshUsers={getUsers}/>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Users;
