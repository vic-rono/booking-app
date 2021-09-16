import React from "react";
import { FaUser } from "react-icons/fa";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";

export default function Naavbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="/home">ITEN-BOOKINGS</Navbar.Brand>
          {user ? (
            <>
              <Dropdown as={ButtonGroup}>
                <FaUser className="mt-2" />
                <Button variant="none">{user.name}</Button>

                <Dropdown.Toggle split variant="none" id="dropdown-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={logout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              {" "}
              <Nav className="ml-auto">
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>{" "}
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
