import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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

    return (
        <div className='container'>

            <h5>Your Email : {user.email}</h5>
            <h5>My Balance ${total}</h5> {total > 99 && myDatas.map(w => <Link to={`/withdraw/${w._id}`}><Button>Withdraw</Button></Link>)
            }
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
                    <h5>My Order Items Total: {myOrders.length}</h5>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Service Provider</th>
                                <th>Service Image</th>
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
                </div>
            }

            {myServiceOrders.length === 0 && <></>}
            {myServiceOrders.length > 0 &&
                <div>
                    <h5>My Service Orders</h5>
                    {
                        myServiceOrders.map(myServiceOrder =>
                            <div>
                                {myServiceOrder.status === 'pending' &&
                                    <div>
                                        <h3>Pending Order</h3>
                                        <Table striped bordered hover variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>Customer</th>
                                                    <th>Project Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link>
                                                        {myServiceOrder.status === 'pending' &&
                                                            <div><Button onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                                        }

                                                    </td>
                                                    <td><Button onClick={() => navigateToDetails(myServiceOrder.serviceId)}>{myServiceOrder.servicename}</Button></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                }
                            </div>
                        )
                    }
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Service Image</th>
                                <th>Service Name</th>
                                <th>Service Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myServiceOrders.map(myServiceOrder => <tr>
                                    <td><Link to={`/client/${myServiceOrder.clientId}`}><p className='text-white'>{myServiceOrder.clientName}</p></Link>
                                        {myServiceOrder.status === 'pending' &&
                                            <div><Button onClick={() => navigateToStatus(myServiceOrder._id)}>Accept or Reject</Button></div>
                                        }
                                        {myServiceOrder.status === 'accepted' && <p>Accepted</p>}
                                        {myServiceOrder.status === 'rejected' && <p>You Have Receiced</p>}
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
                                )
                            }
                        </tbody>
                    </Table>


                    <div>

                        <div>
                            <h5>Rejected</h5>
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
                        </div>

                    </div>

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