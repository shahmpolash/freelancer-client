import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Dashboard.css';
import Table from 'react-bootstrap/Table';



const Dashboard = () => {   
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [myServices, setMyServices] = useState([]);
    const [myOrders, setmyOrders] = useState([]);
    const [myServiceOrders, setMyServiceOrders] = useState([]);



    let total = 0;
    for(const balance of myServiceOrders){
        total = total + parseFloat(balance.releaseAmount);
    }
    console.log(total)
    
    useEffect( () =>{
        const url = `http://localhost:5000/myservice?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setMyServices(data));

    }, [user])

    useEffect( () =>{
        const url = `http://localhost:5000/myorder?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setmyOrders(data));

    }, [user])

    useEffect( () =>{
        const url = `http://localhost:5000/myserviceorder?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(info=> setMyServiceOrders(info));
    }, [user]);

 
    const navigateToDetails = id =>{
        navigate(`/service/${id}`)
    };
    const navigateToStatus = id =>{
        navigate(`/acceptorreject/${id}`)
    };
    const navigateToCancel = id =>{
        navigate(`/cancelorder/${id}`)
    };
  

    return (
        <div className='container'>
            
            <h3>Your Email : {user.email}</h3>
            <h4>My Balance ${total}</h4>
           
            {myServices.length === 0 && <h2>You dont have any services</h2>}
            {myServices.length > 0 && <h2>My Services</h2>}
            <div className='my-service'>
            {
                myServices.map(myService => <div key={myService._id}
                >
                    <div>
                        <img src={myService.img} alt="" />
                        <p><Button onClick={() => navigateToDetails(myService._id)}>{myService.title}</Button></p>
                    </div>
                </div>)
            }
            </div>
            {myOrders.length === 0 && <h2>You have not placed any order</h2>}
            {myOrders.length > 0 && 
            <div>
                <h2>My Order Items</h2>
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
                        <td>{myOrder.provideremail}
                        {myOrder.status === 'pending' && <p>Pending...</p>}
                        {myOrder.status === 'pending' && 
                        <div><Button onClick={() => navigateToCancel(myOrder._id)}>Cancel Now</Button></div>
                        }
                        {myOrder.status === 'cancelled' && <p>You Have Cancelled Order</p>}
                        {myOrder.status === 'accepted' && <p>Accepted</p>}
                        {myOrder.status === 'rejected' && <p>Provider is Rejected</p>}
                        </td>
                        <td>{myOrder.releaseStatus === 'none' && <Link to={`/releasepayment/${myOrder._id}`}>Release Payment</Link>}
                        {myOrder.releaseStatus === 'released' && <div>Payment Released</div>}</td>
                        <td><Button onClick={() => navigateToDetails(myOrder.serviceId)}>{myOrder.servicename}</Button></td>
                        <td>${myOrder.serviceprice}usd/ Mo</td>
                        <td>{myOrder.status === 'cancelled' && <div></div>}
                        {myOrder.status === 'pending' && <div></div>}
                        {myOrder.status === 'accepted' && myOrder.reviewStatus === 'none'  && <Link to={`/reviewasaclient/${myOrder._id}`}>Post Review</Link>}
                        {myOrder.reviewStatus === 'done' && <Button disabled>Reviewed</Button>}
                        </td>
                    </tr>)
                     
                   }
                </tbody>
            </Table>
            </div>
            }

            {myServiceOrders.length === 0 && <h2>You have not received any order</h2>}
            {myServiceOrders.length > 0 && 
                <div>
                    <h2>My Service Orders</h2>
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
                        <td>{myServiceOrder.customeremail}
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
                        <td><td><Link to={`/reviewasaprovider/${myServiceOrder._id}`}>Post Review</Link></td></td>
                    </tr>
                    )
                   }
                </tbody>
                </Table>
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
                            <td>{myServiceOrder.customeremail}
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
            
            
                {
                     myServiceOrders.map(myServiceOrder => 
                        <div>
                             {myServiceOrder.status === 'rejected' && 
                        <div>
                            <h3>Rejected</h3>
                            <Table striped bordered hover variant="dark">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Project Name</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{myServiceOrder.customeremail}</td>
                            <td>{myServiceOrder.servicename}</td>
                          </tr>
                        </tbody>
                      </Table>
                        </div>
                        }
                        </div>
                        )
                }
                </div>
            }
            
            
        </div>
        
    );
};

export default Dashboard;