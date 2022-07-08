import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import './Header.css'

const Header = () => {
    const [user] = useAuthState(auth);
    

    const handleSignout = () =>{
        signOut(auth);
    }
    return (
        <header>
            <Navbar className='p-3 menu-bar' collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Freelancer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link has={Link} to="/">Home</Nav.Link>
                            <NavDropdown title="Services" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/seo-services">SEO Services</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/lead-generation-services">Lead Generation</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="#action/3.3">Social Media Marketing</NavDropdown.Item>                                
                                <NavDropdown.Item as={Link} to="#action/3.4">Email Marketing</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                           {
                               user ?
                               <NavDropdown title="User" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                               </NavDropdown>
         
                               :
                               <></>
                           }
                        </Nav>
                        <Nav>
                           {
                               user ?
                               <Nav.Link as={Link} to="/set-service">Add Service</Nav.Link>
                               :
                               <></>
                           }
                        </Nav>
                        <Nav>
                           {
                               user ?
                               <Nav.Link onClick={handleSignout}>Signout</Nav.Link>
                               
                               :
                               <Nav.Link as={Link} to="/login">Login</Nav.Link>
                           }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;