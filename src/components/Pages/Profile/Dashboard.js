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
    const [paymentSettings, setPaymentSettings] = useState([]);

    let totalOrder = 0;

    for (const orderAmount of myOrders) {
        totalOrder = totalOrder + parseFloat(orderAmount.releaseAmount);
    }

    let currentBalance = 0;

    for (const provider of providerName) {
        currentBalance = provider.currentBalance;
    }

    currentBalance = currentBalance;

    useEffect(() => {
        const url = `http://localhost:5000/payment-setting`
        fetch(url)
            .then(res => res.json())
            .then(data => setPaymentSettings(data));
    }, []);

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
                <div className='dashboard-responsive'>
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
                                <div className='d-flex justify-content-start my-3'><Link className='update-info' to={'/provider-transactions'}><i class="fa-solid fa-clock-rotate-left"></i> Transaction History</Link></div>
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
                            <div className='shadow p-3 mb-5 mt-2 bg-body rounded-5'>
                                <h5>Dispute</h5>
                                <Link className='btn' to={'/clientdispute'}>Dispute Your Running Orders</Link>
                            </div>
                        </div>
                    }
                    {
                        clientName.filter(client => client.clientEmail === user?.email).length > 0 &&
                        <div className='col-lg-6'>
                            <div className='my-5 shadow p-3 mb-5 bg-body rounded-5 client-dashboard'>
                                <h5 className='text-white'>Total Spent</h5>
                                <h2 className='text-white'>{totalOrder} USD</h2>
                                {
                                    myOrders.filter(order => order.releaseStatus === 'requested').length > 0 &&
                                    <>
                                        <h5 className='text-white'>Payment Request</h5>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th className='text-white'>Provider Name</th>
                                                    <th className='text-white'>Service Name</th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            {
                                                myOrders.map(order => order.releaseStatus === 'requested' &&
                                                    <tbody>
                                                        <tr>
                                                            <td className='text-white'>{order.providerName}</td>
                                                            <td className='text-white'>{order.servicename}</td>
                                                            <td><Link className='text-white' to={`/releasepayment/${order._id}`}>Release Payment</Link></td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                            {
                                                myOrders.filter(order => order.releaseStatus === 'requested').length === 0 &&
                                                <>
                                                    <h5 className='text-white'>You have not received any payment request</h5>
                                                </>
                                            }
                                        </Table>
                                    </>

                                }
                            </div>

                        </div>
                    }


                    {
                        providerName.filter(provider => provider.email === user?.email).length === 1 &&
                        <div className='col-lg-3'>
                            <div className='mt-5 shadow p-3 bg-body rounded-5'>
                                <h5>For Support Email Us</h5>
                            </div>
                            <div className='shadow p-3 mb-5 mt-2 bg-body rounded-5'>
                                <h5>Dispute</h5>
                                <Link className='btn' to={'/providerdispute'}>Dispute Your Running Orders</Link>
                            </div>
                        </div>
                    }
                    {
                        providerName.filter(provider => provider.email === user?.email).length === 1 &&
                        <div className='col-lg-6 mt-5'>
                            {
                                providerName.filter(provider => provider.status === "Approved").length === 1 &&
                                <div className='balance py-5 shadow p-3 mb-5 rounded-5'><h3>My Balance ${parseInt(currentBalance)} usd</h3> {currentBalance > 50 && myDatas.map(w => <Link to={`/withdraw/${w._id}`}><Button>Withdraw</Button></Link>)
                                }
                                    {
                                        myServiceOrders.map(myOrder => myOrder.paymentAccepted === 'none' &&
                                            <>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='text-white'>{myOrder.clientName} has released {myOrder.releaseAmount} USD</p>
                                                    <Link className='text-white' to={`/acceptpayment/${myOrder._id}`}>Accept This Fund</Link>
                                                </div>
                                            </>)
                                    }
                                </div>
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
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myServices.map(myService =>
                                                    <tr>
                                                        <td><img className='service-img' src={myService.img} alt="" /></td>
                                                        <td><Link to={`/service/${myService._id}`}>{myService.title}</Link>
                                                            {myService.publishStatus === 'Pending' && <p>Your Service is Pending</p>}
                                                        </td>
                                                        <td><Link to={`/editservice/${myService._id}`}>Edit</Link></td>
                                                    </tr>)}
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        </div>
                    }



                </div>

                {
                    clientName.map(client => client.clientEmail === user?.email &&
                       <div>
                        {
                            myOrders.map(myOrder => myOrder.refundStatus === 'pending' || myOrder.refundStatus === 'refunded' &&

                            <div className='my-service-list shadow p-3 mb-5 bg-body rounded-5'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Service Name</th>
                                            <th>Status</th>
                                            <th>Refund Status</th>
                                            <th>Refunded to</th>
                                            <th>Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myOrders.map(myOrder => myOrder.refundStatus === 'pending' || myOrder.refundStatus === 'refunded' &&
                                                <tr>
                                                    <td>{myOrder.servicename}</td>
                                                    <td>{myOrder.status}</td>
                                                    <td>{myOrder.refundStatus}</td>
                                                    <td>{myOrder.refundedTo}</td>
                                                    <td>{myOrder.refundNote}</td>
                                                </tr>

                                            )
                                        }

                                    </tbody>
                                </Table>                  
                        </div>
                            ).reverse()
                        }
                       </div>)
                }


                {myOrders.length === 0 && <></>}
                {myOrders.length > 0 &&
                    <div>
                        {myOrders.filter(myorder => myorder.status === 'pending').length > 0 &&
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>

                                        <th>Date</th>
                                        <th>Provider Name</th>
                                        <th>Project Name</th>
                                        <th>Message</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        myOrders.map(myOrder => myOrder.status === 'pending' &&
                                            <tr>

                                                <td>{myOrder.orderDate}</td>
                                                <td><Link to={`/freelancer/${myOrder.providerId}`}>{myOrder.providerName}</Link>
                                                    {myOrder.status === 'pending' && <p>Pending...</p>}
                                                    {myOrder.status === 'pending' &&
                                                        <div><Button className='btn-sm' onClick={() => navigateToCancel(myOrder._id)}>Cancel Now</Button></div>
                                                    }
                                                    <div className='d-flex justify-content-center'>
                                                        <div><Button className='btn-sm' onClick={() => navigateRequirement(myOrder._id)}>See Requirement</Button></div>


                                                    </div>
                                                </td>
                                                <td><Link to={`/service/${myOrder.serviceId}`}>{myOrder.servicename}</Link></td>
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
                                                <th>Date</th>
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
                                                        <td>{myOrder.orderDate}</td>
                                                        <td><Link to={`/freelancer/${myOrder.providerId}`}>{myOrder.providerName}</Link>
                                                            {myOrder.status === 'pending' && <p>Pending...</p>}
                                                            {myOrder.status === 'pending' &&
                                                                <div><Button className='btn-sm' onClick={() => navigateToCancel(myOrder._id)}>Cancel Now</Button></div>
                                                            }
                                                            {myOrder.status === 'cancelled' && <p>You Have Cancelled Order</p>}
                                                            {myOrder.status === 'accepted' && <p>Accepted</p>}
                                                            {myOrder.status === 'rejected' && <p>Provider is Rejected</p>}
                                                            {myOrder.status === 'rejectedByAdmin' && <p>Admin has Rejected</p>}
                                                            <div className='d-flex justify-content-center'>
                                                                <div><Button className='btn-sm' onClick={() => navigateRequirement(myOrder._id)}>See Requirement</Button></div>


                                                            </div>
                                                            <div>{myOrder.reqUpdated === 'requpdated' && <></>}</div>
                                                        </td>
                                                        <td>{myOrder.releaseStatus === 'none' && <Link to={`/releasepayment/${myOrder._id}`}><Button>Release Payment</Button></Link>}
                                                            {myOrder.releaseStatus === 'requested' && <Link to={`/releasepayment/${myOrder._id}`}><Button>Release Payment</Button></Link>}
                                                            {myOrder.releaseStatus === 'released' && <div>Payment Released</div>}</td>
                                                        <td>
                                                            <td><Link className='text-white' to={`/service/${myOrder.serviceId}`}>{myOrder.servicename}</Link></td>
                                                            <br />
                                                            <Link to={`/complete/${myOrder._id}`}><Button className='btn-sm'>Complete Now</Button></Link>
                                                        </td>
                                                        <td>${myOrder.serviceprice}usd/ Mo</td>
                                                        <td>{myOrder.status === 'cancelled' && <div></div>}
                                                            {myOrder.status === 'pending' && <div></div>}
                                                            {myOrder.status === 'accepted' && myOrder.reviewStatus === 'none' && <Link to={`/reviewasaclient/${myOrder._id}`}><Button className='btn-sm'>Post Review</Button></Link>}
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
                                                    </tr>).reverse()
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
                                                <th>Date</th>
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
                                                    <td>{myOrder.orderDate}</td>
                                                    <td><Link to={`/freelancer/${myOrder.providerId}`}>{myOrder.providerName}</Link>
                                                        {myOrder.status === 'pending' && <p>Pending...</p>}
                                                        {myOrder.status === 'pending' &&
                                                            <div><Button className='btn-sm' onClick={() => navigateToCancel(myOrder._id)}>Cancel Now</Button></div>
                                                        }
                                                        {myOrder.status === 'cancelled' && <p>You Have Cancelled Order</p>}
                                                        {myOrder.status === 'accepted' && <p>Accepted</p>}
                                                        {myOrder.status === 'rejected' && <p>Provider is Rejected</p>}
                                                        {myOrder.status === 'rejectedByAdmin' && <p>Admin has Rejected</p>}
                                                        <div className='d-flex justify-content-center'>
                                                            <div><Button className='btn-sm' onClick={() => navigateRequirement(myOrder._id)}>See Requirement</Button></div>


                                                        </div>
                                                        <div>{myOrder.reqUpdated === 'requpdated' && <></>}</div>
                                                    </td>
                                                    <td>{myOrder.releaseStatus === 'none' && <Link to={`/releasepayment/${myOrder._id}`}><Button>Release Payment</Button></Link>}
                                                        {myOrder.releaseStatus === 'requested' && <Link to={`/releasepayment/${myOrder._id}`}><Button>Release Payment</Button></Link>}
                                                        {myOrder.releaseStatus === 'released' && <div>Payment Released</div>}</td>
                                                    <td><Link className='text-white' to={`/service/${myOrder.serviceId}`}>{myOrder.servicename}</Link></td>                                                    <td>${myOrder.serviceprice}usd/ Mo</td>
                                                    <td>{myOrder.status === 'cancelled' && <div></div>}
                                                        {myOrder.status === 'pending' && <div></div>}
                                                        {myOrder.status === 'accepted' && myOrder.reviewStatus === 'none' && <Link to={`/reviewasaclient/${myOrder._id}`}><Button className='btn-sm'>Post Review</Button></Link>}
                                                        {myOrder.reviewStatus === 'done' && <Button className='btn-sm' disabled>Reviewed</Button>}
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
                                                </tr>).reverse()

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

                                            <th>Date</th>
                                            <th>Client Name</th>
                                            <th>Project Name</th>
                                            <th>Message</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            myServiceOrders.map(myServiceOrder => myServiceOrder.status === 'pending' &&
                                                <tr>
                                                    <td>{myServiceOrder.orderDate}</td>
                                                    <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link>
                                                        <div className='d-flex justify-content-center'>
                                                            <div><Button className='btn-sm' onClick={() => navigateRequirement(myServiceOrder._id)}>See Requirement</Button></div>
                                                            <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                        </div>
                                                        {myServiceOrder.status === 'pending' &&
                                                            <div><Button className='btn-sm' onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                        }
                                                    </td>
                                                    <td><Link className='text-white' to={`/service/${myServiceOrder.serviceId}`}>{myServiceOrder.servicename}</Link></td>
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
                                                <th>Date</th>
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
                                                        <td>{myServiceOrder.orderDate}</td>
                                                        <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link>
                                                            <p>Email {myServiceOrder.customeremail}</p>
                                                            <div className='d-flex justify-content-center'>
                                                                <div><Button className='btn-sm' onClick={() => navigateRequirement(myServiceOrder._id)}>See Requirement</Button></div>
                                                                <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                            </div>
                                                            {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                            {myServiceOrder.status === 'pending' &&
                                                                <div><Button className='btn-sm' onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                            }
                                                            {myServiceOrder.status === 'accepted' && <p>Accepted</p>}
                                                            {myServiceOrder.status === 'rejected' && <p>You Have Rejected</p>}
                                                            {myServiceOrder.status === 'rejectedByAdmin' && <p>Admin Has Rejected</p>}
                                                            {myServiceOrder.status === 'cancelled' && <p>Client has Cancelled</p>}

                                                        </td>
                                                        <td>{myServiceOrder.releaseStatus === 'none' && <div>Payment is Not Released <Link to={`/requestpayment/${myServiceOrder._id}`}>Request Now</Link></div>}
                                                            {myServiceOrder.releaseStatus === 'released' && <div>Payment is Released</div>}
                                                            {myServiceOrder.releaseStatus === 'requested' && <div>You have Requested</div>}
                                                        </td>
                                                        <td><Link className='text-white' to={`/service/${myServiceOrder.serviceId}`}>{myServiceOrder.servicename}</Link></td>
                                                        <td>${myServiceOrder.serviceprice} usd/ Mo</td>
                                                        <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                            {myServiceOrder.status === 'pending' && <div></div>}
                                                            {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><Button className='btn-sm'>Post Review</Button></Link>}
                                                            {myServiceOrder.providerReviewStatus === 'done' && <Button className='btn-sm' disabled>Reviewed</Button>}
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
                                                                <div><Button className='btn-sm' onClick={() => navigateRequirement(myServiceOrder._id)}>See Requirement</Button></div>
                                                                <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                            </div>
                                                            {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                            {myServiceOrder.status === 'pending' &&
                                                                <div><Button className='btn-sm' onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                            }
                                                            {myServiceOrder.status === 'accepted' && <p>Accepted</p>}
                                                            {myServiceOrder.status === 'rejected' && <p>You Have Rejected</p>}
                                                            {myServiceOrder.status === 'rejectedByAdmin' && <p>Admin Has Rejected</p>}
                                                            {myServiceOrder.status === 'cancelled' && <p>Client has Cancelled</p>}

                                                        </td>
                                                        <td>{myServiceOrder.releaseStatus === 'none' && <div>Payment is Not Released</div>}
                                                            {myServiceOrder.releaseStatus === 'released' && <div>Payment is Released</div>}
                                                            {myServiceOrder.releaseStatus === 'requested' && <div>You have Requested</div>}
                                                        </td>
                                                        <td><Link className='text-white' to={`/service/${myServiceOrder.serviceId}`}>{myServiceOrder.servicename}</Link></td>
                                                        <td>${myServiceOrder.serviceprice} usd/ Mo</td>
                                                        <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                            {myServiceOrder.status === 'pending' && <div></div>}
                                                            {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><Button className='btn-sm'>Post Review</Button></Link>}
                                                            {myServiceOrder.providerReviewStatus === 'done' && <Button className='btn-sm' disabled>Reviewed</Button>}
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
                                                            <div><Button className='btn-sm' onClick={() => navigateRequirement(myServiceOrder._id)}>See Requirement</Button></div>
                                                            <div>{myServiceOrder.reqUpdated === 'requpdated' && <p className='updateRequire'>1</p>}</div>
                                                        </div>
                                                        {myServiceOrder.reqUpdated === 'providerrequpdated' && <></>}
                                                        {myServiceOrder.status === 'pending' &&
                                                            <div><Button className='btn-sm' onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                        }
                                                        {myServiceOrder.status === 'accepted' && <p>Accepted</p>}
                                                        {myServiceOrder.status === 'rejected' && <p>You Have Rejected</p>}
                                                        {myServiceOrder.status === 'cancelled' && <p>Client has Cancelled</p>}

                                                    </td>
                                                    <td>{myServiceOrder.releaseStatus === 'none' && <div>Payment is Not Released</div>}
                                                        {myServiceOrder.releaseStatus === 'released' && <div>Payment is Released</div>}</td>
                                                    <td><Link className='text-white' to={`/service/${myServiceOrder.serviceId}`}>{myServiceOrder.servicename}</Link></td>
                                                    <td>${myServiceOrder.serviceprice} usd/ Mo</td>
                                                    <td>{myServiceOrder.status === 'cancelled' && <div></div>}
                                                        {myServiceOrder.status === 'pending' && <div></div>}
                                                        {myServiceOrder.status === 'accepted' && myServiceOrder.providerReviewStatus === 'none' && <Link to={`/reviewasaprovider/${myServiceOrder._id}`}><Button className='btn-sm'>Post Review</Button></Link>}
                                                        {myServiceOrder.providerReviewStatus === 'done' && <Button className='btn-sm' disabled>Reviewed</Button>}
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
                                <th>Note</th>
                                <th>TRansaction ID</th>

                            </tr>
                        </thead>
                        <tbody>
                            {withdraws.map(withdraw => <tr>
                                <td>{withdraw.withdrawalDate}</td>
                                <td>${withdraw.amount} USD</td>
                                <td>{withdraw.method}</td>
                                <td>
                                    {withdraw.status === 'pending' && <p>Pending...</p>}
                                    {withdraw.status === 'accepted' && <>
                                        <p>Accepted</p>
                                        <p>Processed on {withdraw.processDate}</p>
                                    </>
                                    }
                                    {withdraw.status === 'cancelled' && <>
                                        <p>Cancelled</p>
                                        <p>Processed on {withdraw.processDate}</p>
                                    </>}
                                </td>
                                <td>{withdraw.note}</td>
                                <td>{withdraw.transactionId}</td>

                            </tr>).reverse()}

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