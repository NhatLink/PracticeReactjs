import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assest/images/download.jfif";
import logoImg from "../assest/images/LogoImg.png";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logoImg}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo img"
          />
          Nhat Link Project
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/"} className="nav-link">
              Home
            </NavLink>
            <NavLink to={"/user"} className="nav-link">
              User
            </NavLink>
          </Nav>
          <Nav>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo img"
            />
            <NavDropdown title="Setting">
              <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
