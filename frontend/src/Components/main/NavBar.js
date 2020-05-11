import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar () {

  return (
    <nav className="NavBar">
      <NavLink exact to="/">MicroBlog</NavLink>
      <NavLink exact to="/posts/new">Add a new post</NavLink>
    </nav>
  );
}

export default NavBar;