import React, { useEffect, useState } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    for (const totalEarn of totalEarns) {
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


    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder?email=${freelancer.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setTotalEarns(data));

    }, [totalEarns])


    const navigateToDetails = id => {
        navigate(`/service/${id}`)
    };


    return (
        <div className='container mt-5'>
            <div className='d-flex freelancer-profile'>
                <div className='col-lg-3'>
                    <div className='profile'>
                        <img src={freelancer.profile} alt="" />
                        <h5>{freelancer.name}</h5>
                        <p>{freelancer.heading}</p>
                        <h5>Total Earned ${total} USD</h5>
                        <p><i class="fa-solid fa-location-dot"></i> {freelancer.location}</p>
                        <p>Available for work: {freelancer.available}</p>
                        <Link to={`/message/${freelancerId}`} className="btn btn-primary">Message Me</Link>
                        <div className='marketplace'>
                            <div className='working'><h5>I am working on</h5></div>
                            <Table className='verified' striped bordered hover variant="dark">
                                <tbody>
                                    <tr>
                                        <td><h5>Marketplace <i class="fa-solid fa-check"></i></h5></td>
                                        <td>{freelancer.marketplace}</td>
                                                                      
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td><h5>Total Reviews <i class="fa-solid fa-check"></i></h5></td>
                                        <td>{freelancer.totalreviews}</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td><h5>Project Completed <i class="fa-solid fa-check"></i></h5></td>
                                        <td>{freelancer.projectcompleted}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <h5>Social Profile</h5>
                    <div className='d-flex justify-content-center'>
                        <a className='mx-2' href={freelancer.fb}><h3><i class="fa-brands fa-facebook"></i></h3></a>
                        <a className='mx-2' href={freelancer.twitter}><h3><i class="fa-brands fa-twitter-square"></i></h3></a>
                        <a className='mx-2' href={freelancer.linkedin}><h3><i class="fa-brands fa-linkedin"></i></h3></a>
                    </div>
                    <div className='profile'>
                        <p>Experience: {freelancer.experience}</p>
                        <h5>Skills</h5>
                        <button>{freelancer.onpageseo}</button> <button>{freelancer.offpageseo}</button> <button>{freelancer.technicalseo}</button>
                    </div>
                </div>
                <div className='col-lg-9'>
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <h5 className='text-center'>About Me</h5></Accordion.Header>
                            <Accordion.Body>
                                {freelancer.about}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h5 className='text-center'>My Services {userServices.length}</h5></Accordion.Header>

                            <Accordion.Body>
                                <div className='user-services'>
                                    {
                                        userServices.map(useService =>
                                            <div key={useService._id}>
                                                <Button variant="light" onClick={() => navigateToDetails(useService._id)}><img className='profile-service-img' src={useService.img} alt="" />
                                                    <p>{useService.title}</p></Button>
                                            </div>

                                        )
                                    }
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>
            </div>
            <h5>Total: {providerReviews.filter(review => review.reviewStatus === 'done').length} Reviews</h5>
            {
                providerReviews.map(review => <div key={review._id}>
                    <div className='col-lg-6 mt-3'>
                        <div>
                            {review.reviewStatus === 'none' && <></>}
                            {review.reviewStatus === 'done' &&
                                <div className='review'><h6>Client: {review.clientName}: </h6>
                                    <p>Rate: {review.rate} out of 5</p>
                                    <p className='client-review font-italic'>"{review.review}"</p>
                                </div>}
                        </div>
                    </div>
                </div>)
            }

        </div>
    );
};

export default FreelancerProfile;