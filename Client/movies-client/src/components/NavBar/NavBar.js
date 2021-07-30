import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import useToken from '../Login/useToken';

export default function NavBar() {
  const [activeButton, setActiveButton] = useState('/');
  const { fullName } = useToken();
  const location = useLocation();
  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  const fontSize = {
    fontSize: 18,
    marginRight: 25
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand>Hi, {fullName.toUpperCase()}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="ml-5">
        <Container>
          <Nav className="mr-auto" activeKey={activeButton}>
            <Nav.Item>
              <Nav.Link href="/" eventKey="/" style={fontSize}>
                Movies
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link href="/members" eventKey="/members" style={fontSize}>
                Memebers
              </Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link
                href="/subscriptions"
                eventKey="/subscriptions"
                style={fontSize}
              >
                Subscriptions
              </Nav.Link>
            </Nav.Item>
            <div style={{ flex: 1 }}></div>
            <Nav.Item>
              <Nav.Link onClick={handleLogout} >
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}
