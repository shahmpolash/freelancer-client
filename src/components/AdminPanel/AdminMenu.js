import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const AdminMenu = () => {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/admin/providers">Providers</Nav.Link>
                        <Nav.Link href="#pricing">Clients</Nav.Link>
                        <Nav.Link href="#pricing">Orders</Nav.Link>
                        <Nav.Link href="/admin/services">Services</Nav.Link>
                        <Nav.Link href="/admin/admin-setup">Add Admin</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default AdminMenu;