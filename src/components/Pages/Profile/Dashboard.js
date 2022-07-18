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
        <div className='container'>
            <div className='d-flex justify-content-between'>
                <div className='col-lg-6'>
                    {
                        providerName.length === 1 && <>
                            {
                                providerName.map(pname => <>
                                    <img className='profile-image-dashboard' src={pname.profile} alt="" />
                                    <h5>{pname.name} As Provider</h5>
                                </>)
                            }
                        </>
                    }
                    {
                        clientName.length === 1 && <>
                            {
                                clientName.map(cname => <>
                                    <img className='profile-image-dashboard' src={cname.clientProfile} alt="" />
                                    <h5>{cname.clientName} As Client</h5>
                                </>)
                            }
                        </>
                    }
                    <h5>My Email : {user.email}</h5>
                </div>
                <div className='col-lg-6 mt-5 balance'>
                    <h5>My Balance ${total} usd</h5> {total > 99 && myDatas.map(w => <Link to={`/withdraw/${w._id}`}><Button>Withdraw</Button></Link>)
                    }
                </div>
            </div>

            {myServices.length === 0 && <></>}
            {myServices.length > 0 &&
                <Table striped bordered hover variant="dark">
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
                                    <td><Link className='text-white' to={`/service/${myService._id}`}>{myService.title}</Link>
                                        {myService.publishStatus === 'pending' && <p>Your Service is Pending</p>}
                                    </td>
                                </tr>)}
                    </tbody>
                </Table>
            }

            {myOrders.length === 0 && <></>}
            {myOrders.length > 0 &&
                <div>
                    {myOrders.filter(myorder => myorder.status === 'pending').length > 0 &&
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>

                                    <th>Provider Name</th>
                                    <th>Project Name</th>

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
                                                    <div>{myOrder.reqUpdated === 'providerrequpdated' && <p className='updateRequire'>1</p>}</div>

                                                </div>
                                            </td>
                                            <td><Button onClick={() => navigateToDetails(myOrder.serviceId)}>{myOrder.servicename}</Button></td>

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
                                                            <div>{myOrder.reqUpdated === 'providerrequpdated' && <p className='updateRequire'>1</p>}</div>

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
                                                        <div>{myOrder.reqUpdated === 'providerrequpdated' && <p className='updateRequire'>1</p>}</div>

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

                                        <th>Provider Name</th>
                                        <th>Project Name</th>

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

    );
};

export default Dashboard;