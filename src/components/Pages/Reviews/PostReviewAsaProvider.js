import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const PostReviewAsaProvider = () => {
    const [myServiceOrders, setMyServiceOrders] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleReviews = event => {
        event.preventDefault();
        const serviceId = myServiceOrders.serviceId;
        const customeremail = myServiceOrders.customeremail;
        const provideremail = myServiceOrders.provideremail;
        const servicename = myServiceOrders.servicename;
        const serviceprice = myServiceOrders.serviceprice;
        const rate = event.target.rate.value;
        const review = event.target.review.value;
        const order = { customeremail, servicename, serviceprice, provideremail, serviceId, rate, review };

        const url = `http://localhost:5000/reviews/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(result => {
                console.log('Connected', result);
                navigate('/');
            })
    };

    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setMyServiceOrders(data));

    }, [])



    return (
        <div>
            <h2>You are Posting Review for: {myServiceOrders.serviceId}</h2>
            <h2>Customer Email: {myServiceOrders.customeremail}</h2>
            <form onSubmit={handleReviews}>
                <input type="number" name="rate" id="" placeholder='rate out of 5' />
                <textarea name="review" id="" cols="30" rows="10" placeholder='write short review'></textarea>
                <input type="submit" value="Post Now" />
            </form>
        </div>
    );
};

export default PostReviewAsaProvider;