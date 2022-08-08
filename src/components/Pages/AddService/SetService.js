import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './SetService.css';
import seo from './images/seo.png';
import lead from './images/lead.png';
import social from './images/social.png';
import useFreelancer from '../../hooks/useFreelancer';
import useClient from '../../hooks/useClient';

const SetService = () => {
    const [myDatas] = useFreelancer();
    const [clients] = useClient();
    return (
        <div>
            {clients.length === 0 &&
                <>
                    {
                        myDatas.filter(data => data.status === "Approved").length === 1 &&
                        <div className='container'>
                            <div className='d-flex justify-content-center marketing-methods'>
                                <div><Link to="/seo"><img src={seo} alt="" /></Link>
                                    <p>SEO</p>
                                </div>
                                <div><Link to="/lead"><img src={lead} alt="" /></Link>
                                    <p>Lead Generation</p>
                                </div>
                                <div><Link to="/social"><img src={social} alt="" /></Link>
                                    <p>Social Metia Marketing</p>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        myDatas.filter(data => data.status === "Unapproved").length === 1 &&
                        <div className='container balance py-5 shadow p-3 mb-5 rounded-5'><h3>Sorry! Your Account is Not Approved. You can touch us at: </h3>
                        </div>
                    }

                    {myDatas.length === 0 &&
                        <div> <Button><Link className='text-white' to={'/update'}>Please Update Your Provider Account</Link></Button></div>
                    }
                </>
            }

            {clients.length === 1 &&
                <Button>Sorry. Client can not add any service..</Button>
            }


        </div>
    );
};

export default SetService;