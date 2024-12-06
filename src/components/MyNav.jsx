import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink } from "react-router-dom";

const MyNav = () => (
  <Navbar expand="lg" /* bg="dark" */ data-bs-theme="light" className=" border-body ps-4 pt-4 color">
    <Container fluid>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink className="nav-link text-white" to ="/" >Home</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default MyNav;
