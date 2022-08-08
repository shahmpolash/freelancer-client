import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const ServiceEdit = () => {
    const {id} = useParams();
    const [service, setService] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [service])

    const handleService = event => {
        event.preventDefault();
        const title = event.target.title.value;
        const price = event.target.price.value;
        const img = event.target.img.value;
        const details = event.target.details.value;
        const serviceUpdate = { title, img, details, price }
        const url = `http://localhost:5000/service-edit/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(serviceUpdate)
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
            <h5>{service.title}</h5>
            <form onSubmit={handleService}>
                <input defaultValue={service.title} type="text" name="title" id="" />
                <input defaultValue={service.price} type="text" name="price" id="" />
                <input defaultValue={service.img} type="text" name="img" id="" />
                <textarea defaultValue={service.details} name="details" id="" cols="30" rows="10"></textarea>
                <input type="submit" value="Update Service" />
            </form>
        </div>
    );
};

export default ServiceEdit;