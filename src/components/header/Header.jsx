import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import './header-syles.css';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';

function Header() {
    const isAuth = localStorage.getItem("authToken");

    const { logout } = useContext(AuthContext);


    return (
        <Navbar expand="md" className="custom-navbar" fixed="top">
            <Container>
                <Navbar.Brand className="brand-logo">
                    <span className="brand-icon">🌿</span>
                    PlantCare
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" className="nav-item-custom">
                            <i className="bi bi-house-door"></i>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/myplants" className="nav-item-custom">
                            <i className="bi bi-flower1"></i>
                            My Plants
                        </Nav.Link>
                        {
                            isAuth && (
                                <>
                                    <Nav.Link as={NavLink} to="/addplant" className="nav-item-custom">
                                        <i className="bi bi-plus-circle"></i>
                                        Add Plant
                                    </Nav.Link>
                                </>
                            )
                        }
                        <NavDropdown title={
                            <span className="dropdown-title">
                                <i className="bi bi-gear"></i>
                                Settings
                            </span>
                        } id="basic-nav-dropdown" className="custom-dropdown">
                            <NavDropdown.Item className="dropdown-item-custom">
                                <i className="bi bi-person"></i>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item-custom">
                                <i className="bi bi-bell"></i>
                                Notifications
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item-custom">
                                <i className="bi bi-palette"></i>
                                Theme
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Button} className="dropdown-item-custom logout" onClick={() => logout()}>
                                <i className="bi bi-box-arrow-right"></i>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link className="nav-item-custom search-btn">
                            <i className="bi bi-search"></i>
                        </Nav.Link>
                        <Nav.Link className="nav-item-custom notification-btn">
                            <i className="bi bi-bell"></i>
                            <span className="notification-badge">3</span>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/login" className="nav-item-custom login-btn">
                            <i className="bi bi-person-circle"></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header