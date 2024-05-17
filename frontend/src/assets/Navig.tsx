import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface NavigProps {
  user: string | null;
}

const Navig: React.FC<NavigProps> = ({ user }) => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>南澳資料庫系統</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home">首頁</Nav.Link>

            {(user == null) ? (
              <Nav.Link as={Link} to="/login">登入</Nav.Link>
            ) : (
              <>
                {/* <NavDropdown title="選單" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/interact">疼痛回報</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">個人資料</NavDropdown.Item>
                </NavDropdown> */}
                {
                  (user === "admin") ? (
                    <Nav.Link as={Link} to="/admin">管理介面</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/interact">疼痛回報</Nav.Link>
                  )
                }
                <Nav.Link as={Link} to="/profile">{user}</Nav.Link>
                <Nav.Link as={Link} to="/logout">登出</Nav.Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navig;