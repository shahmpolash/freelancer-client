import React, { useEffect, useState } from 'react';
import './Banner.css'
import { Link } from 'react-router-dom';

const Banner = () => {
    const [banner, setBanner] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/banner`
        fetch(url)
            .then(res => res.json())
            .then(data => setBanner(data));
    }, []);

    return (
        <div className='banner py-5'>
            <div className='container d-flex py-5 banner-container'>
                <div className='d-flex align-items-center banner-text'>
                    <div>
                        {
                            banner.map(b => <h1>{b.bannerHeading}</h1>)
                        }
                        {
                            banner.map(b=> <h5>{b.bannerSubHeading}</h5>)
                        }
                        
                        <div className='d-flex justify-content-center'>
                            <Link className='btn btn-success btn-sm' to={'/seo-services'}><p className='text-white'>SEO Service</p></Link>
                            <Link className='btn btn-danger btn-sm' to={'/seo-services'}><p>Lead Generation</p></Link>
                            <Link className='btn btn-primary btn-sm' to={'/seo-services'}><p className='text-white'>Social Media</p></Link>
                        </div>
                    </div>
                </div>
                <div className='col-lg-5 banner-img'>
                    {
                        banner.map(b=> <img src={b.bannerImg} alt="" />)
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Banner;