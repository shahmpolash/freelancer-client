import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const ServicePublish = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [service])



    const publish = event => {
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
                service.publishStatus === "Published" && <h5>Already Published</h5>
            }
            {
                service.publishStatus === "Unpublished"  &&
                <form onSubmit={publish}>
                    <input hidden value='Published' type="text" name="publishStatus" id="" />
                    <input className='btn btn-danger' type="submit" value="Publish Now" />
                </form>
            }
            {
                service.publishStatus === "Pending"  &&
                <form onSubmit={publish}>
                    <input hidden value='Published' type="text" name="publishStatus" id="" />
                    <input className='btn btn-danger' type="submit" value="Publish Now" />
                </form>
            }


        </div>
    );
};

export default ServicePublish;