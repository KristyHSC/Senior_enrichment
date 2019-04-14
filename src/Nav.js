import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <div className="navbar">
      <Link to='/' >Home</Link>
      <Link to='/campuses'>Campuses</Link>
      <Link to='/students'>Students</Link>
      <Link to='/campus/create'>Add a Campus</Link>
      <Link to='/student/create'>Add a Student</Link>
    </div>
  )
}

export default Nav;

