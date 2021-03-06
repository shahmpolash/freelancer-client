import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './SetService.css';
import seo from './images/seo.png';
import lead from './images/lead.png';
import social from './images/social.png';
import useFreelancer from '../../hooks/useFreelancer';

const SetService = () => {
    const [myDatas] = useFreelancer();
    return (
        <div>
            {myDatas.length === 1 &&
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
            {myDatas.length === 0 &&
                <div> <Button><Link className='text-white' to={'/update'}>Please Update Your Provider Account</Link></Button></div>
            }

        </div>
    );
};

export default SetService;