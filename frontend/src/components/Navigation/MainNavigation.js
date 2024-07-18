import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../context/auth/authContext';

const MainNavigation = () => {
  const {authData}= useAuth();
  return (
    <Navbar collapseOnSelect expand="md" bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand>EZEvents</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link><NavLink className='text-white' to="/events" style={{textDecoration:"none"}}>Events</NavLink></Nav.Link>
          {authData.isAuthenticated && <Nav.Link ><NavLink className='text-white' to="/bookings" style={{textDecoration:"none"}}>Bookings</NavLink></Nav.Link>}
          <Nav.Link><NavLink className='text-white' to="/login" style={{textDecoration:"none"}}>{authData.isAuthenticated?"My Profile":"Login"}</NavLink></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default MainNavigation