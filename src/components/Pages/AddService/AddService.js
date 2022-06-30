import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './AddService.css';
import { useForm } from "react-hook-form";
import useFreelancer from '../../hooks/useFreelancer';

const AddService = () => {
    
    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const [myDatas] = useFreelancer();

    const onSubmit = data => {
        const url = `http://localhost:5000/service/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);

            })
    }

    return (
        <div className='container'>
            <h1>Add Service</h1>
            {myDatas.length}
            {myDatas.name}
            
            <form className='add-service' onSubmit={handleSubmit(onSubmit)}>
                <input value={user.email} type="hidden" {...register("email")} />
                <input {...register("title")} placeholder='Your Service Title' />
                <input type="number" {...register("price")} placeholder='Price' />
                <input {...register("img")} placeholder='Image URL'/>
                <textarea {...register("details")} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddService;