import React from 'react';
import useOrderItem from '../../hooks/useOrderItem';
import Table from 'react-bootstrap/Table';
import './OrderItem.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';

const OrderItem = () => {
    const [user] = useAuthState(auth);
    const [service] = useOrderItem();
    const navigate = useNavigate();

    const handleOrder = event =>{
        event.preventDefault();
        const status = event.target.status.value;
        const serviceId = service._id;
        const customeremail = user.email;
        const provideremail = service.email;
        const servicename = service.title;
        const serviceprice = service.price;
        const reviewStatus = event.target.reviewStatus.value;
        const releaseAmount = event.target.releaseamount.value;
        const order = {customeremail, servicename, serviceprice, provideremail, serviceId, status, reviewStatus, releaseAmount};
    
    const url = `http://localhost:5000/orders/`;
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(res=>res.json())
    .then(result=> {
        navigate('/dashboard');
    })
};
    return (
        <div className='container mt-5'>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Service Image</th>
                        <th>Service Name</th>
                        <th>Service Price</th>                          
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                        <td><img src={service.img} alt="" /></td>
                        <td>{service.title}</td>
                        <td>${service.price}usd/ Mo</td>
                    </tr>
                </tbody>
            </Table>
            {service._id}
            <form onSubmit={handleOrder}>
                <input hidden value="pending" type="text" name="status" id="" />
                <input hidden value="0" type="number" name="releaseamount" id="" />
                <input hidden value="none" type="text" name="reviewStatus" id="" />
                <input type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default OrderItem;