import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './FreelancerProfile.css';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';


const FreelancerProfile = () => {
    const { freelancerId } = useParams();
    const [freelancer, setFreelancer] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [providerReviews, setProviderReviews] = useState([]);
    const [totalEarns, setTotalEarns] = useState([]);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    let total = 0;
    for(const totalEarn of totalEarns){
        total = total + parseFloat(totalEarn.releaseAmount);
    }



    useEffect(() => {
        fetch(`http://localhost:5000/freelancer/${freelancerId}`)
            .then(res => res.json())
            .then(data => setFreelancer(data))
    }, [freelancer]);

    useEffect(() => {
        fetch(`http://localhost:5000/userservice?email=${freelancer.email}`)
            .then(res => res.json())
            .then(result => setUserServices(result))
    }, [userServices]);

    useEffect(() => {
        fetch(`http://localhost:5000/providerprofilereview?provideremail=${freelancer.email}`)
            .then(res => res.json())
            .then(review => setProviderReviews(review))
    }, [providerReviews]);

    
    useEffect( () =>{
        const url = `http://localhost:5000/myserviceorder?email=${freelancer.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setTotalEarns(data));

    }, [totalEarns])


    const navigateToDetails = id =>{
        navigate(`/service/${id}`)
    };


    return (
        <div className='container mt-5'>
            
            <div className='d-flex'>
                <div className='col-lg-3'>
                    <div className='profile'>
                        
                        <img src={freelancer.profile} alt="" />
                        <h5>{freelancer.name}</h5>
                        <h5>{freelancer.heading}</h5>
                        <h5>Total Earned ${total}</h5>
                        <p>Available for work: {freelancer.available}</p>


                    </div>

                    <h3>Social Profile</h3>
                    <div className='d-flex justify-content-center'>
                        <a className='mx-2' href={freelancer.fb}><h3><i class="fa-brands fa-facebook"></i></h3></a>
                        <a className='mx-2' href={freelancer.twitter}><h3><i class="fa-brands fa-twitter-square"></i></h3></a>
                        <a className='mx-2' href={freelancer.linkedin}><h3><i class="fa-brands fa-linkedin"></i></h3></a>
                    </div>
                    <div className='profile'>
                        <p>Experience: {freelancer.experience}</p>
                        <h2>Skills</h2>
                        <button>{freelancer.onpageseo}</button> <button>{freelancer.offpageseo}</button> <button>{freelancer.technicalseo}</button>
                    </div>
                </div>

                <div className='col-lg-9'>

                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <h3 className='text-center'>About Me</h3></Accordion.Header>
                            <Accordion.Body>
                                {freelancer.about}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h3 className='text-center'>My Portfolio</h3></Accordion.Header>

                            <Accordion.Body>
                                <div className='portfolio'>
                                    <div>
                                        <img src="" alt="" />
                                        <h5></h5>
                                        <p></p>
                                    </div>
                                    <div>
                                        <img src="" alt="" />
                                        <h5></h5>
                                        <p></p>
                                    </div>
                                    <div>
                                        <img src="" alt="" />
                                        <h5></h5>
                                        <p></p>
                                    </div>
                                    <div>
                                        <img src="" alt="" />
                                        <h5></h5>
                                        <p></p>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>
            </div>
            <h2>Total I have {userServices.length} Services</h2>
            <div className='user-services'>
                {
                    userServices.map(useService =>
                        <div key={useService._id}>
                            <img src={useService.img} alt="" />
                            <Button onClick={() => navigateToDetails(useService._id)}>{useService.title}</Button>
                        </div>

                    )
                }
            </div>
            <h2>Total: {providerReviews.filter(review => review.reviewStatus === 'done').length} Reviews</h2>
            {
                    providerReviews.map(providerReview => <div key={providerReview._id}>
                        <div className='review col-lg-6 mt-3'>
                        {providerReview.reviewStatus === 'none' && <></>}
                        {providerReview.reviewStatus === 'done' && 
                        <div> <p>Client: {providerReview.customeremail}</p>
                                <p>Rate: {providerReview.rate} out of 5</p>
                                <p className='client-review font-italic'>"{providerReview.review}"</p>
                            </div>}
                        </div>
                    </div>)
                }
                
        </div>
    );
};

export default FreelancerProfile;