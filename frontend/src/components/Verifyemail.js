import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../store';

function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.userData.user);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    console.log('Retrieved role:', storedRole);
  }, []);

  const handleClick = () => {
    const role = localStorage.getItem('role'); // Fetch role directly
    dispatch(userActions.setIsAuthenticated(true));
    console.log('User:', user);

    if (role === "worker") {
      navigate('/signup-detail');
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <h1 className='text-center font-bold text-3xl pt-12'>Click on Button below to continue...</h1>
      <div className='flex items-center justify-center'>
        <button
          onClick={handleClick}
          className='p-4 px-6 mt-14 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-md'
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
