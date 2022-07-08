import React from 'react';
import './Banner.css'
import banner from './banner-img/banner-img-frelancer.jpg';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='banner'>
            <div className='container d-flex py-5 banner-container'>
                <div className='d-flex align-items-center banner-text'>
                    <div>
                        <h1>Hire a skilled provider monthly <span className='text-primary'>contract</span> basis</h1>
                        <h5>We have skilled SEO providers who worked in various marketplaces as top rated freelancers.</h5>
                        <div className='d-flex justify-content-center'>
                        <Button><Link to={'/seo-services'}><p className='text-white'>SEO Service</p></Link></Button>
                        <Button><p>Lead Generation</p></Button>
                        <Button><Link to={'/seo-services'}><p className='text-white'>Social Media</p></Link></Button>
                        
                        </div>
                    </div>
                </div>
                <div className='col-lg-5 banner-img'>
                    <img src={banner} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;