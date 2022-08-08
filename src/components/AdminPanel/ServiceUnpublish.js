import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const ServiceUnpublish = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [service])



    const unPublish = event => {
        event.preventDefault();
        const status = event.target.publishStatus.value;

        const publishStatus = { status }

        const url = `http://localhost:5000/service/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(publishStatus)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/admin/services');

            })
    }

    return (
        <div className='container'>
            <AdminMenu></AdminMenu>
            {
                service.publishStatus === "Unpublished" && <h5>Already Unpublished</h5>
            }
            {
                service.publishStatus === "Published"  &&
                <form onSubmit={unPublish}>
                    <input hidden value='Unpublished' type="text" name="publishStatus" id="" />
                    <input className='btn btn-danger' type="submit" value="Unpublish Now" />
                </form>
            }
            {
                service.publishStatus === "Pending"  &&
                <form onSubmit={unPublish}>
                    <input hidden value='Unpublished' type="text" name="publishStatus" id="" />
                    <input className='btn btn-danger' type="submit" value="Unpublish Now" />
                </form>
            }


        </div>
    );
};

export default ServiceUnpublish;