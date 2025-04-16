import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faTools, faUser, faExclamationTriangle, faCalendar, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

function Admin() {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <div className='bg-gray-900 w-1/4 border'>
        <div className='ml-10 mt-20 text-white font-bold'>
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span className='ml-2'>Admin Dashboard</span>
        </div>
        <div className='mt-4 text-white font-bold hover:bg-gray-800 p-4'>
          <FontAwesomeIcon  className='ml-16 'icon={faUsers} />
          <Link to='users'><span className='ml-2'>Users</span></Link>
        </div>
        <div className=' text-white font-bold hover:bg-gray-800 p-4'>
          <FontAwesomeIcon  className='ml-16 ' icon={faTools} />
         <Link to="add-services"> <span className='ml-2'>Services</span> </Link> 
        </div>
        <div className='text-white font-bold hover:bg-gray-800 p-4'>
          <FontAwesomeIcon  className='ml-16 ' icon={faUser} />
          <span className='ml-2'>Workers</span>
        </div>
        <div className='text-white hover:bg-gray-800 font-bold p-4'>
          <FontAwesomeIcon  className='ml-16 ' icon={faExclamationTriangle} />
          <span className='ml-2'>Complaints</span>
        </div>
        <div className=' text-white font-bold hover:bg-gray-800 p-4'>
          <FontAwesomeIcon  className='ml-16 ' icon={faCalendar} />
          <span className=' ml-2 '>Manual bookings</span>
        </div>
        <div className=' text-white font-bold hover:bg-gray-800 p-4'>
          <FontAwesomeIcon className='ml-16 '  icon={faClipboardCheck} />
          <span className='ml-2'>Approve requests</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='w-3/4 p-4'>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
