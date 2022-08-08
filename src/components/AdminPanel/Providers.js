import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const Providers = () => {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/freelancers`)
            .then(res => res.json())
            .then(data => setProviders(data))
    }, []);
    return (
        <div className='container'>
            <AdminMenu></AdminMenu>
            <h5>Total Providers: {providers.length}</h5>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Verified Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        providers.map(provider => 
                            <tr>
                        <td>-</td>
                        <td>{provider.name} <Link className='btn btn-success btn-sm' to={`/freelancer/${provider._id}`}><i class="fa-solid fa-user"></i></Link></td>
                        <td>{provider.email}</td>
                        <td><Button disabled className='btn btn-sm'>{provider.status}</Button> <br /> 
                        <Link className='btn btn-success btn-sm mt-1' to={`/admin/provider/approve/${provider._id}`}>Approve Now</Link> <br />
                        <Link className='btn btn-danger btn-sm mt-1' to={`/admin/provider/unapprove/${provider._id}`}>Unapprove Now</Link>
                        </td>
                        <td>{provider.verifiedStatus} <br />
                        <Link className='mt-1 btn btn-success btn-sm' to={`/admin/provider/verify/${provider._id}`}>Verify Now</Link> <br />
                        <Link className='mt-1 btn btn-danger btn-sm' to={`/admin/provider/unverify/${provider._id}`}>Unverify Now</Link>
                        </td>
                        <td><Link to={`/admin/provider/${provider._id}`}><i class="fa-solid fa-pen-to-square"></i></Link></td>
                    </tr>
                            )
                    }
                    
                    
                </tbody>
            </Table>

        </div>
    );
};

export default Providers;