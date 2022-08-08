import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/service`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    
    return (
        <div className='container'>
            <AdminMenu></AdminMenu>
            <h5>Total {services.length} Services</h5>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Service Name</th>
                        <th>Provider Name</th>
                        <th>Catagory</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map(service => 
                            <tr>
                        <td>-</td>
                        <td><Link to={`/service/${service._id}`}>{service.title}</Link></td>
                        <td><Link to={`/freelancer/${service.providerId}`}>{service.providerName}</Link></td>
                        <td>{service.catagory}</td>
                        <td><Button disabled className='btn btn-sm'>{service.publishStatus}</Button> <br /> 
                        <Link className='btn btn-success btn-sm mt-1' to={`/admin/service/publish/${service._id}`}>Publish Now</Link> <br />
                        <Link className='btn btn-danger btn-sm mt-1' to={`/admin/service/unpublish/${service._id}`}>Unpublish Now</Link>
                        </td>
                        <td><Link to={`/admin/service/${service._id}`}><i class="fa-solid fa-pen-to-square"></i></Link></td>
                    </tr>
                            )
                    }
                    
                    
                </tbody>
            </Table>
            
        </div>
    );
};

export default Services;