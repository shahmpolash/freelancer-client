import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);
    

    const handleSignout = () =>{
        signOut(auth);
    }
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Freelancer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                           {
                               user ?
                               <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                               </NavDropdown>
                               
                               
                               :
                               <></>
                           }
                        </Nav>
                        <Nav>
                           {
                               user ?
                               <Nav.Link as={Link} to="/add-service">Add</Nav.Link>
                               
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