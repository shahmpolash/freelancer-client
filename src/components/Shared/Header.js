import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import './Header.css'

const Header = () => {
    const [user] = useAuthState(auth);
    const [providerMessages, setProviderMessages] = useState([]);
    const [replies, setReplies] = useState([]);
    const [myServiceOrders, setMyServiceOrders] = useState([]);

   
    const handleSignout = () => {
        signOut(auth);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(result => setProviderMessages(result))
    }, [providerMessages])

    useEffect(() => {
        fetch(`http://localhost:5000/replies`)
            .then(res => res.json())
            .then(result => setReplies(result))
    }, []);

    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder?email=${user?.email}`
        fetch(url)
            .then(res => res.json())
            .then(info => setMyServiceOrders(info));
    }, [user]);

    return (
        <header>
            <Navbar className='p-3 menu-bar' collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Freelancer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/"><i class="fa-solid fa-house-chimney"></i></Nav.Link>
                            <NavDropdown title="Services" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/seo-services"><i class="fa-brands fa-searchengin"></i> SEO Services</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/lead-generation-services"><i class="fa-solid fa-arrows-down-to-people"></i> Lead Generation</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="#action/3.3"><i class="fa-solid fa-user-group"></i> Social Media Marketing</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="#action/3.4"><i class="fa-solid fa-message"></i> Email Marketing</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <NavDropdown title={<i class="fa-solid fa-user-tie"></i>} id="collasible-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/dashboard"><i class="fa-solid fa-database"></i> Dashboard
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    :
                                    <></>
                            }
                        </Nav>
                        <Nav>
                        {
                                user ?
                                    <div>
                                        <Nav.Link className='notify' as={Link} to="/dashboard">
                                         <i class="fa-solid fa-bell"></i>
                                        {
                                            myServiceOrders.filter(order => order.provideremail === user?.email & order.reqUpdated === 'requpdated').length > 0 && <><span className='notify-count'>{
                                                myServiceOrders.filter(order => order.provideremail === user?.email & order.reqUpdated === 'requpdated').length
                                            }</span></>
                                        }
                                        
                                    </Nav.Link>
                                    </div>
                                    :
                                    <></>
                            }
                        </Nav>

                        <Nav>
                            {
                                user ?
                                    <div className='d-flex'>
                                        <Nav.Link as={Link} to="/messages"><i class="fa-solid fa-envelope"></i></Nav.Link>
                                        <div className='unread-message d-flex'>

                                            {providerMessages.filter(providerMessage => providerMessage.providerEmail === user.email).length > 0 &&
                                                <>
                                                    {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length === 0 && <></>}
                                                    {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length > 0 && <p>{replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length}</p>}

                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p>+{providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                </>
                                            }

                                            {providerMessages.filter(clientMessage => clientMessage.clientEmail === user.email).length > 0 &&
                                                <>
                                                    {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length === 0 && <span></span>}
                                                    {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length > 0 && <p>{replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length}</p>}

                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p>+{providerMessages.filter(providerMessage => providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                </>
                                            }


                                        </div>
                                        
                                    </div>
                                    :
                                    <></>
                            }
                         
                           
                            {
                                user ?
                                    <Nav.Link as={Link} to="/set-service"><i class="fa-solid fa-plus"></i> Add Service</Nav.Link>
                                    :
                                    <></>
                            }
                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <Nav.Link onClick={handleSignout}><i class="fa-solid fa-right-from-bracket"></i> Signout</Nav.Link>

                                    :
                                    <Nav.Link as={Link} to="/login"><i class="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                            }

                        </Nav>

                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </header>
    );
};

export default Header;