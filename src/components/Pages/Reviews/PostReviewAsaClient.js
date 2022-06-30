import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const PostReviewAsaClient = () => {
    const [myOrders, setmyOrders] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


        useEffect(() => {
            const url = `http://localhost:5000/myorder/${id}`
            fetch(url)
                .then(res => res.json())
                .then(data => setmyOrders(data));
    
        }, [id]);
    

        const handleReviews = event => {
            event.preventDefault();
            
            const rate = event.target.rate.value;
            const review = event.target.review.value;
            const reviewStatus = event.target.reviewdone.value;
            const reviewData = {rate, review, reviewStatus};
        const url = `http://localhost:5000/myreviewfororder/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(result => {
                console.log('Connected', result);
                navigate('/');
            })
    };

   


    return (
        <div>
            <h2>You are Posting Review for: {myOrders.serviceId}</h2>
            <h2>Provider Email: {myOrders.provideremail}</h2>
            <form onSubmit={handleReviews}>
                <input type="number" name="rate" id="" placeholder='rate out of 5' />
                <input hidden value='done' type="text" name="reviewdone" id="" />
                <textarea name="review" id="" cols="30" rows="10" placeholder='write short review'></textarea>
                <input type="submit" value="Post Now" />
            </form>
        </div>
    );
};

export default PostReviewAsaClient;