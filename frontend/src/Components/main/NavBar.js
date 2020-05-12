import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import './NavBar.css';
// import { LinkContainer } from 'react-router-bootstrap';
// Note: was using LinkContainer around Nav.Link, but then 
// two active classes were getting put on- one from react router
// and one from Nav.Link. Didnt work. Somehow using react-bootstrap's
// built in "as" attribute makes it so only react-router's active get's applied

function NavBar () {

  return (
    <Navbar  collapseOnSelect expand='sm'  bg="dark" variant="dark" className="NavBar mb-3">
      <Navbar.Brand as={NavLink} activeClassName="rrActive" exact to="/">
        MicroBlog
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="my-1" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} activeClassName="rrActive" eventKey="home" exact to="/" className="px-3">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} activeClassName="rrActive" eventKey="new-post" exact to="/posts/new" className="px-3">
            Add a new post
          </Nav.Link>  
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}

export default NavBar;