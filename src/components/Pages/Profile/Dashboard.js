import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Dashboard.css';
import Table from 'react-bootstrap/Table';
import useFreelancer from '../../hooks/useFreelancer';



const Dashboard = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [myServices, setMyServices] = useState([]);
    const [myOrders, setmyOrders] = useState([]);
    const [myServiceOrders, setMyServiceOrders] = useState([]);
    const [myDatas] = useFreelancer();
    const [withdraws, setWithdraws] = useState([]);
    const [providerName, setProviderName] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [messages, setMessages] = useState([])
    const [providerMessages, setProviderMessages] = useState([]);
    const [replies, setReplies] = useState([]);




    let total = 0;
    let totalWithdraw = 0;

    for (const w of withdraws) {
        totalWithdraw = totalWithdraw + parseFloat(w.amount);
    }
    for (const balance of myServiceOrders) {
        total = total + parseFloat(balance.releaseAmount);
    };

    total = total - totalWithdraw;

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user.email}`)
            .then(res => res.json())
            .then(result => setClientName(result))
    }, [user])

    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
            .then(res => res.json())
            .then(review => setProviderName(review))
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/withdraw?email=${user.email}`)
            .then(res => res.json())
            .then(withdraw => setWithdraws(withdraw))
    }, [user])


    useEffect(() => {
        const url = `http://localhost:5000/myservice?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setMyServices(data));
    }, [user])

    useEffect(() => {
        const url = `http://localhost:5000/myorder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setmyOrders(data));

    }, [user])

    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(info => setMyServiceOrders(info));
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(result => setMessages(result))
    }, [messages])

    useEffect(() => {
        fetch(`http://localhost:5000/replies`)
            .then(res => res.json())
            .then(result => setReplies(result))
    }, []);

    const navigateToDetails = id => {
        navigate(`/service/${id}`)
    };
    const navigateToStatus = id => {
        navigate(`/acceptorreject/${id}`)
    };
    const navigateToCancel = id => {
        navigate(`/cancelorder/${id}`)
    };
    const navigateRequirement = id => {
        navigate(`/requirement/${id}`)
    };

    return (
        <div className='dashboard'>

            <div className='container'>
                <div className='d-flex justify-content-between'>
                    <div className='col-lg-3 profile-card my-5 shadow p-3 mb-5 bg-body rounded-5'>
                        {
                            providerName.length === 1 &&
                            <>
                                {
                                    providerName.map(pname => <>
                                        <img className='profile-image-dashboard' src={pname.profile} alt="" />
                                        <h5>{pname.name}</h5>
                                        <Link className="dashboard-view-profile my-2" to={`/freelancer/${pname._id}`}>View Full Profile</Link>

                                    </>)
                                }
                                <br />
                                <div className='d-flex justify-content-start my-3'>
                                    {
                                        providerName.map(p => <Link className='update-info' to={`/updateprovider/${p._id}`}><i class="fa-solid fa-id-card-clip"></i> Update Profile</Link>)
                                    }
                                </div>
                                <div className='d-flex justify-content-start my-3'>
                                    {
                                        providerName.map(p => <Link className='update-info' to={`/updateprovider/${p._id}`}><i class="fa-solid fa-screwdriver-wrench"></i> Account Setting</Link>)
                                    }
                                </div>
                                <div className='d-flex justify-content-start my-3'>
                                    <div className='d-flex'>
                                        <Link className='update-info' as={Link} to="/messages"><i class="fa-solid fa-envelope"></i> Inbox</Link>
                                        <div >
                                            {providerMessages.filter(providerMessage => providerMessage.providerEmail === user.email).length > 0 &&
                                                <>
                                                    {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length === 0 && <></>}
                                                    {replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length > 0 && <p className='reply-unread'>{replies.filter(reply => reply.providerEmail === user.email & reply.replied === 'clientReplied' & reply.messageStatus === "unRead").length}</p>}

                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                    {providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p className='message-unread'>+{providerMessages.filter(providerMessage => providerMessage.whoSent === 'clientSent' & providerMessage.providerEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                </>
                                            }



                                        </div>

                                    </div>
                                </div>
                            </>
                        }
                        {
                            clientName.length === 1 && <>
                                {
                                    clientName.map(cname => <>
                                        <img className='profile-image-dashboard' src={cname.clientProfile} alt="" />
                                        <h5>{cname.clientName}</h5>
                                        <Link className="dashboard-view-profile my-2" to={`/client/${cname._id}`}>View Full Profile</Link>
                                    </>)
                                }
                                <br />
                                <div className='d-flex justify-content-start my-3'>
                                    {
                                        clientName.map(cname => <Link className='update-info' to={`/updateclientprofile/${cname._id}`}><i class="fa-solid fa-id-card-clip"></i> Update Profile</Link>)
                                    }
                                </div>
                                <div className='d-flex justify-content-start my-3'>
                                    {
                                        clientName.map(cname => <Link className='update-info' to={`/updateclientprofile/${cname._id}`}><i class="fa-solid fa-screwdriver-wrench"></i> Account Setting</Link>)
                                    }
                                </div>
                                {
                                    clientName.filter(client => client.clientEmail === user?.email).length === 1 &&
                                    <div className='d-flex justify-content-start my-3'>
                                        <div className='d-flex'>
                                            <Link className='update-info' as={Link} to="/messages"><i class="fa-solid fa-envelope"></i> Inbox</Link>
                                            <div className='box-message d-flex'>
                                                {providerMessages.filter(clientMessage => clientMessage.clientEmail === user.email).length > 0 &&
                                                    <>
                                                        {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length === 0 && <span></span>}
                                                        {replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length > 0 && <p className='reply-unread'>{replies.filter(reply => reply.clientEmail === user.email & reply.replied === 'providerReplied' & reply.messageStatus === "unRead").length}</p>}

                                                        {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length === 0 && <></>}
                                                        {providerMessages.filter(providerMessage => providerMessage.whoSent === 'providerSent' & providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length > 0 && <p className='message-unread'>+{providerMessages.filter(providerMessage => providerMessage.clientEmail === user.email & providerMessage.messageStatus === 'unRead').length}</p>}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }

                            </>
                        }
                        <h5 className="my-2">My Email : {user.email}</h5>
                    </div>
                    {
                        clientName.filter(client => client.clientEmail === user?.email).length > 0 &&
                        <div className='col-lg-3'>
                            <div className='mt-5 shadow p-3 bg-body rounded-5'>
                                <h5>For Support Email Us</h5>
                            </div>
                            <div className='shadow p-3 mb-5 bg-body rounded-5'>
                                <h5>Dispute Order</h5>
                            </div>
                        </div>
                    }
                    {
                        clientName.filter(client => client.clientEmail === user?.email).length > 0 &&
                        <div className='col-lg-6'>
                            <div className='my-5 shadow p-3 mb-5 bg-body rounded-5 client-dashboard'>
                                <h5 className='text-white'>Recent Orders</h5>

                            </div>

                        </div>
                    }

                    {
                        providerName.filter(provider => provider.email === user?.email).length === 1 &&
                        <div className='col-lg-6 mt-5'>
                            {
                                providerName.filter(provider => provider.status === "Approved").length === 1 &&
                                <div className='balance py-5 shadow p-3 mb-5 rounded-5'><h3>My Balance ${total} usd</h3> {total > 99 && myDatas.map(w => <Link to={`/withdraw/${w._id}`}><Button>Withdraw</Button></Link>)
                                }</div>
                            }
                            {
                                providerName.filter(provider => provider.status === "Unapproved").length === 1 &&
                                <div className='balance py-5 shadow p-3 mb-5 rounded-5'><h3>Sorry! Your Account is Not Approved. You can touch us at: </h3>
                                </div>
                            }
                            {
                                providerName.filter(provider => provider.status === "Suspended").length === 1 &&
                                <div className='balance py-5 shadow p-3 mb-5 rounded-5'><h3>Your account is Suspended</h3>
                                </div>
                            }


                            <div className='my-service-list shadow p-3 mb-5 bg-body rounded-5'>
                                {myServices.length === 0 && <></>}
                                {myServices.length > 0 &&
                                    <Table striped bordered hover variant="">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Service Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myServices.map(myService =>
                                                    <tr>
                                                        <td><img className='service-img' src={myService.img} alt="" /></td>
                                                        <td><Link to={`/service/${myService._id}`}>{myService.title}</Link>
                                                            {myService.publishStatus === 'pending' && <p>Your Service is Pending</p>}
                                                        </td>
                                                    </tr>)}
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        </div>
                    }


                </div>



                {myOrders.length === 0 && <></>}
                {myOrders.length > 0 &&
                    <div>
                        {myOrders.filter(myorder => myorder.status === 'pending').length > 0 &&
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>

                                        <th>Provider Name</th>
                                        <th>Project Name</th>
                                        <th>Message</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        myOrders.map(myOrder => myOrder.status === 'pending' &&
                                            <tr>

                                                <td><Link to={`/freelancer/${myOrder.providerId}`}>{myOrder.providerName}</Link>
                                                    {myOrder.status === 'pending' && <p>Pending...</p>}
                                                    {myOrder.status === 'pending' &&
                                                        <div><Button onClick={() => navigateToCancel(myOrder._id)}>Cancel Now</Button></div>
                                                    }
                                                    <div className='d-flex justify-content-center'>
                                                        <div><Button onClick={() => navigateRequirement(myOrder._id)}>See Requirement</Button></div>


                                                    </div>
                                                </td>
                                                <td><Button onClick={() => navigateToDetails(myOrder.serviceId)}>{myOrder.servicename}</Button></td>
                                                <td>
                                                    {
                                                        messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length === 0 && <>
                                                            <Link to={`/clientmessage/${myOrder._id}`} className="mt-2"><i class="fa-solid fa-message"></i>Send Message</Link>
                                                        </>
                                                    }
                                                    {
                                                        messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length > 0 && <>
                                                            {
                                                                messages.map(message => message.orderId === myOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><i class="fa-solid fa-envelope"></i></Link>)
                                                            }

                                                        </>
                                                    }
                                                </td>

                                            </tr>)
                                    }
                                </tbody>
                            </Table>
                        }

                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><h5>My Running Order Items: {myOrders.filter(myorder => myorder.runningOrCompleted === 'running').length}</h5></Accordion.Header>
                                <Accordion.Body>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Service Provider</th>
                                                <th>Payment Status</th>
                                                <th>Service Name</th>
                                                <th>Service Price</th>
                                                <th></th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myOrders.map(myOrder => myOrder.runningOrCompleted === 'running' &&
                                                    <tr>
                                                        <td><Link to={`/freelancer/${myOrder.providerId}`}>{myOrder.providerName}</Link>
                                                            {myOrder.status === 'pending' && <p>Pending...</p>}
                                                            {myOrder.status === 'pending' &&
                                                                <div><Button onClick={() => navigateToCancel(myOrder._id)}>Cancel Now</Button></div>
                                                            }
                                                            {myOrder.status === 'cancelled' && <p>You Have Cancelled Order</p>}
                                                            {myOrder.status === 'accepted' && <p>Accepted</p>}
                                                            {myOrder.status === 'rejected' && <p>Provider is Rejected</p>}
                                                            <div className='d-flex justify-content-center'>
                                                                <div><Button onClick={() => navigateRequirement(myOrder._id)}>See Requirement</Button></div>


                                                            </div>
                                                            <div>{myOrder.reqUpdated === 'requpdated' && <></>}</div>
                                                        </td>
                                                        <td>{myOrder.releaseStatus === 'none' && <Link to={`/releasepayment/${myOrder._id}`}><Button>Release Payment</Button></Link>}
                                                            {myOrder.releaseStatus === 'released' && <div>Payment Released</div>}</td>
                                                        <td>
                                                            <Button className='mb-2' onClick={() => navigateToDetails(myOrder.serviceId)}>{myOrder.servicename}</Button>
                                                            <br />
                                                            <Link to={`/complete/${myOrder._id}`}><Button>Complete Now</Button></Link>
                                                        </td>
                                                        <td>${myOrder.serviceprice}usd/ Mo</td>
                                                        <td>{myOrder.status === 'cancelled' && <div></div>}
                                                            {myOrder.status === 'pending' && <div></div>}
                                                            {myOrder.status === 'accepted' && myOrder.reviewStatus === 'none' && <Link to={`/reviewasaclient/${myOrder._id}`}><Button>Post Review</Button></Link>}
                                                            {myOrder.reviewStatus === 'done' && <Button disabled>Reviewed</Button>}
                                                        </td>
                                                        <td>
                                                            {
                                                                messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length === 0 && <>
                                                                    <Link to={`/clientmessage/${myOrder._id}`} className="mt-2"><i class="fa-solid fa-message"></i>Send Message</Link>
                                                                </>
                                                            }
                                                            {
                                                                messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length > 0 && <>
                                                                    {
                                                                        messages.map(message => message.orderId === myOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><i class="fa-solid fa-envelope"></i></Link>)
                                                                    }

                                                                </>
                                                            }
                                                        </td>
                                                    </tr>)

                                            }

                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><h5>My Order Items Total: {myOrders.length}</h5></Accordion.Header>
                                <Accordion.Body>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Service Provider</th>
                                                <th>Payment Status</th>
                                                <th>Service Name</th>
                                                <th>Service Price</th>
                                                <th></th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myOrders.map(myOrder => <tr>
                                                    <td><Link to={`/freelancer/${myOrder.providerId}`}>{myOrder.providerName}</Link>
                                                        {myOrder.status === 'pending' && <p>Pending...</p>}
                                                        {myOrder.status === 'pending' &&
                                                            <div><Button onClick={() => navigateToCancel(myOrder._id)}>Cancel Now</Button></div>
                                                        }
                                                        {myOrder.status === 'cancelled' && <p>You Have Cancelled Order</p>}
                                                        {myOrder.status === 'accepted' && <p>Accepted</p>}
                                                        {myOrder.status === 'rejected' && <p>Provider is Rejected</p>}
                                                        <div className='d-flex justify-content-center'>
                                                            <div><Button onClick={() => navigateRequirement(myOrder._id)}>See Requirement</Button></div>


                                                        </div>
                                                        <div>{myOrder.reqUpdated === 'requpdated' && <></>}</div>
                                                    </td>
                                                    <td>{myOrder.releaseStatus === 'none' && <Link to={`/releasepayment/${myOrder._id}`}><Button>Release Payment</Button></Link>}
                                                        {myOrder.releaseStatus === 'released' && <div>Payment Released</div>}</td>
                                                    <td><Button onClick={() => navigateToDetails(myOrder.serviceId)}>{myOrder.servicename}</Button></td>
                                                    <td>${myOrder.serviceprice}usd/ Mo</td>
                                                    <td>{myOrder.status === 'cancelled' && <div></div>}
                                                        {myOrder.status === 'pending' && <div></div>}
                                                        {myOrder.status === 'accepted' && myOrder.reviewStatus === 'none' && <Link to={`/reviewasaclient/${myOrder._id}`}><Button>Post Review</Button></Link>}
                                                        {myOrder.reviewStatus === 'done' && <Button disabled>Reviewed</Button>}
                                                    </td>
                                                    <td>
                                                        {
                                                            messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length === 0 && <>
                                                                <Link to={`/clientmessage/${myOrder._id}`} className="mt-2"><i class="fa-solid fa-message"></i>Send Message</Link>
                                                            </>
                                                        }
                                                        {
                                                            messages.filter(message => message.orderId === myOrder._id & message.serviceId === myOrder.serviceId).length > 0 && <>
                                                                {
                                                                    messages.map(message => message.orderId === myOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><i class="fa-solid fa-envelope"></i></Link>)
                                                                }

                                                            </>
                                                        }
                                                    </td>
                                                </tr>)

                                            }
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                }

                {myServiceOrders.length === 0 && <></>}
                {myServiceOrders.length > 0 &&
                    <div>

                        {
                            myServiceOrders.filter(myServiceOrder => myServiceOrder.status === 'pending').length > 0 &&
                            <div>
                                <h5>Pending Orders</h5>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>

                                            <th>Client Name</th>
                                            <th>Project Name</th>
                                            <th>Message</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            myServiceOrders.map(myServiceOrder => myServiceOrder.status === 'pending' &&
                                                <tr>
                                                    <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link>
                                                        <div className='d-flex justify-content-center'>
                                                            <div><Button onClick={() => navigateRequirement(myServiceOrder._id)}>See Requirement</Button></div>
                                                            <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                        </div>
                                                        {myServiceOrder.status === 'pending' &&
                                                            <div><Button onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                        }
                                                    </td>
                                                    <td><Button onClick={() => navigateToDetails(myServiceOrder.serviceId)}>{myServiceOrder.servicename}</Button></td>
                                                    <td>

                                                        {
                                                            messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length === 0 && <>
                                                                <Link to={`/providermessage/${myServiceOrder._id}`} className="mt-2"><i class="fa-solid fa-message"></i>Send Message</Link>
                                                            </>
                                                        }
                                                        {
                                                            messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length > 0 && <>
                                                                {
                                                                    messages.map(message => message.orderId === myServiceOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><i class="fa-solid fa-envelope"></i></Link>)
                                                                }

                                                            </>
                                                        }

                                                    </td>

                                                </tr>).reverse()
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        }



                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><h5>My Running Projects {myServiceOrders.filter(myServiceOrder => myServiceOrder.runningOrCompleted === 'running').length}</h5></Accordion.Header>
                                <Accordion.Body>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Client</th>
                                                <th>Payment Status</th>
                                                <th>Service Name</th>
                                                <th>Service Price</th>
                                                <th></th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myServiceOrders.map(myServiceOrder => myServiceOrder.runningOrCompleted === 'running' &&

                                                    <tr>
                                                        <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link>
                                                            <p>Email {myServiceOrder.customeremail}</p>
                                                            <div className='d-flex justify-content-center'>
                                                                <div><Button onClick={() => navigateRequirement(myServiceOrder._id)}>See Requirement</Button></div>
                                                                <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                            </div>
                                                            {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                            {myServiceOrder.status === 'pending' &&
                                                                <div><Button onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                            }
                                                            {myServiceOrder.status === 'accepted' && <p>Accepted</p>}
                                                            {myServiceOrder.status === 'rejected' && <p>You Have Rejected</p>}
                                                            {myServiceOrder.status === 'cancelled' && <p>Client has Cancelled</p>}

                                                        </td>
                                                        <td>{myServiceOrder.releaseStatus === 'none' && <div>Payment is Not Released</div>}
                                                            {myServiceOrder.releaseStatus === 'released' && <div>Payment is Released</div>}</td>
                                                        <td><Button onClick={() => navigateToDetails(myServiceOrder.serviceId)}>{myServiceOrder.servicename}</Button></td>
                                                        <td>${myServiceOrder.serviceprice} usd/ Mo</td>
                                                        <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                            {myServiceOrder.status === 'pending' && <div></div>}
                                                            {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><Button>Post Review</Button></Link>}
                                                            {myServiceOrder.providerReviewStatus === 'done' && <Button disabled>Reviewed</Button>}
                                                        </td>
                                                        <td> {
                                                            messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length === 0 && <>
                                                                <Link to={`/providermessage/${myServiceOrder._id}`} className="mt-2"><i class="fa-solid fa-message"></i>Send Message</Link>
                                                            </>
                                                        }
                                                            {
                                                                messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length > 0 && <>
                                                                    {
                                                                        messages.map(message => message.orderId === myServiceOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><i class="fa-solid fa-envelope"></i></Link>)
                                                                    }

                                                                </>
                                                            }
                                                        </td>
                                                    </tr>
                                                ).reverse()
                                            }
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><h5>Total Completed Projects {myServiceOrders.filter(myServiceOrder => myServiceOrder.runningOrCompleted === 'completed').length}</h5></Accordion.Header>
                                <Accordion.Body>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Client</th>
                                                <th>Payment Status</th>
                                                <th>Service Name</th>
                                                <th>Service Price</th>
                                                <th></th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myServiceOrders.map(myServiceOrder => myServiceOrder.runningOrCompleted === 'completed' &&

                                                    <tr>
                                                        <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link>
                                                            <p>Email {myServiceOrder.customeremail}</p>
                                                            <div className='d-flex justify-content-center'>
                                                                <div><Button onClick={() => navigateRequirement(myServiceOrder._id)}>See Requirement</Button></div>
                                                                <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                            </div>
                                                            {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                            {myServiceOrder.status === 'pending' &&
                                                                <div><Button onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                            }
                                                            {myServiceOrder.status === 'accepted' && <p>Accepted</p>}
                                                            {myServiceOrder.status === 'rejected' && <p>You Have Rejected</p>}
                                                            {myServiceOrder.status === 'cancelled' && <p>Client has Cancelled</p>}

                                                        </td>
                                                        <td>{myServiceOrder.releaseStatus === 'none' && <div>Payment is Not Released</div>}
                                                            {myServiceOrder.releaseStatus === 'released' && <div>Payment is Released</div>}</td>
                                                        <td><Button onClick={() => navigateToDetails(myServiceOrder.serviceId)}>{myServiceOrder.servicename}</Button></td>
                                                        <td>${myServiceOrder.serviceprice} usd/ Mo</td>
                                                        <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                            {myServiceOrder.status === 'pending' && <div></div>}
                                                            {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><Button>Post Review</Button></Link>}
                                                            {myServiceOrder.providerReviewStatus === 'done' && <Button disabled>Reviewed</Button>}
                                                        </td>
                                                        <td>

                                                            {
                                                                messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length === 0 && <>
                                                                    <Link to={`/providermessage/${myServiceOrder._id}`} className="mt-2"><i class="fa-solid fa-message"></i>Send Message</Link>
                                                                </>
                                                            }
                                                            {
                                                                messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length > 0 && <>
                                                                    {
                                                                        messages.map(message => message.orderId === myServiceOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><i class="fa-solid fa-envelope"></i></Link>)
                                                                    }

                                                                </>
                                                            }
                                                        </td>
                                                    </tr>
                                                ).reverse()
                                            }
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header><h5>Rejected Projects {myServiceOrders.filter(myServiceOrder => myServiceOrder.status === 'rejected').length}</h5></Accordion.Header>
                                <Accordion.Body>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Customer</th>
                                                <th>Project Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myServiceOrders.map(myServiceOrder =>
                                                <tr>
                                                    {myServiceOrder.status === 'rejected' && <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link> <p>You have Rejected</p></td>}
                                                    {myServiceOrder.status === 'rejected' && <td>{myServiceOrder.servicename}</td>}

                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header><h5>Total Order Received {myServiceOrders.length}</h5></Accordion.Header>
                                <Accordion.Body>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Client</th>
                                                <th>Payment Status</th>
                                                <th>Service Name</th>
                                                <th>Service Price</th>
                                                <th></th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myServiceOrders.map(myServiceOrder => <tr>
                                                    <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link>
                                                        <p>Email {myServiceOrder.customeremail}</p>
                                                        <div className='d-flex justify-content-center'>
                                                            <div><Button onClick={() => navigateRequirement(myServiceOrder._id)}>See Requirement</Button></div>
                                                            <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                        </div>
                                                        {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                        {myServiceOrder.status === 'pending' &&
                                                            <div><Button onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                        }
                                                        {myServiceOrder.status === 'accepted' && <p>Accepted</p>}
                                                        {myServiceOrder.status === 'rejected' && <p>You Have Rejected</p>}
                                                        {myServiceOrder.status === 'cancelled' && <p>Client has Cancelled</p>}

                                                    </td>
                                                    <td>{myServiceOrder.releaseStatus === 'none' && <div>Payment is Not Released</div>}
                                                        {myServiceOrder.releaseStatus === 'released' && <div>Payment is Released</div>}</td>
                                                    <td><Button onClick={() => navigateToDetails(myServiceOrder.serviceId)}>{myServiceOrder.servicename}</Button></td>
                                                    <td>${myServiceOrder.serviceprice} usd/ Mo</td>
                                                    <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                        {myServiceOrder.status === 'pending' && <div></div>}
                                                        {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><Button>Post Review</Button></Link>}
                                                        {myServiceOrder.providerReviewStatus === 'done' && <Button disabled>Reviewed</Button>}
                                                    </td>
                                                    <td>
                                                        {
                                                            messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length === 0 && <>
                                                                <Link to={`/providermessage/${myServiceOrder._id}`} className="mt-2"><i class="fa-solid fa-message"></i>Send Message</Link>
                                                            </>
                                                        }
                                                        {
                                                            messages.filter(message => message.orderId === myServiceOrder._id & message.serviceId === myServiceOrder.serviceId).length > 0 && <>
                                                                {
                                                                    messages.map(message => message.orderId === myServiceOrder._id && <Link to={`/inbox/${message._id}`} className="mt-2 inbox"><i class="fa-solid fa-envelope"></i></Link>)
                                                                }

                                                            </>
                                                        }

                                                    </td>
                                                </tr>
                                                ).reverse()
                                            }
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                }

                {withdraws.length > 0 &&
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Withdraw Date</th>
                                <th>Amounts</th>
                                <th>PayPal Email</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {withdraws.map(withdraw => <tr>
                                <td> - </td>
                                <td>{withdraw.amount} </td>
                                <td>{withdraw.method}</td>
                                <td>
                                    {withdraw.status === 'pending' && <p>Pending...</p>}
                                    {withdraw.status === 'accepted' && <p>Accepted</p>}
                                    {withdraw.status === 'cancelled' && <p>Cancelled</p>}
                                </td>

                            </tr>)}

                        </tbody>
                    </Table>
                }

            </div>
            {
                clientName.filter(client => client.clientEmail === user?.email).length === 0 && <>
                    {
                        providerName.filter(provider => provider.email === user?.email).length === 0 &&
                        <div>
                            <Link className='btn btn-primary' to={'/setup'}><i class="fa-solid fa-id-card-clip"></i> Update Your Profile</Link>
                        </div>
                    }
                </>
            }
        </div>

    );
};

export default Dashboard;