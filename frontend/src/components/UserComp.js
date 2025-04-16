import React from 'react'

function UserComp({ indexOfFirstUser, index, user, refreshUsers }) {
    const blockUnBlockUser = async () => {
      try {
        const response = await fetch("http://localhost:5001/blockUser", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

  
        const updatedUser = await response.json();
        
       
        refreshUsers(); // <-- tell the parent to fetch the updated list
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    };
     
    return (
      <>
        <td className="py-2 px-4 border-b">{indexOfFirstUser + index + 1}</td>
        <td className="py-2 px-4 border-b">{user.username}</td>
        <td className="py-2 px-4 border-b">{user.email}</td>
        <td className="py-2 px-4 border-b">{user.role}</td>
        <td className="py-2 px-4 border-b">{user.status}</td>
        <td className="py-2 px-4 border-b">
          {user.status === 'active' ? (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={blockUnBlockUser}
            >
              Block
            </button>
          ) : (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={blockUnBlockUser}
            >
              Activate
            </button>
          )}
        </td>
      </>
    );
  }
  

export default UserComp
