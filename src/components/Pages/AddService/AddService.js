import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './AddService.css';
import { useForm } from "react-hook-form";
import useFreelancer from '../../hooks/useFreelancer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useClient from '../../hooks/useClient';

const AddService = () => {

    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const [myDatas] = useFreelancer();
    const [clients] = useClient();
    const navigate = useNavigate();

    const onSubmit = data => {
        const url = `https://agile-forest-60392.herokuapp.com/service/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');
            })
    }
    return (
        <div className='container'>
            <h1>Add Service</h1>
            {myDatas.length === 1 &&
                <div>
                    <form className='add-service' onSubmit={handleSubmit(onSubmit)}>
                        <input value={user.email} type="hidden" {...register("email")} />
                        <input value='Pending' hidden {...register("publishStatus")} />
                        {
                            myDatas.map(myData => <><input value={myData.name} hidden {...register("providerName")} /></>)
                        }
                        {
                            myDatas.map(myData => <><input value={myData._id} hidden {...register("providerId")} /></>)
                        }
                        {
                            myDatas.map(myData => <><input value={myData.profile} hidden {...register("profileIMG")} /></>)
                        }
                        <select name="catagory" required>
                            <option value="seo">SEO</option>
                            <option value="lead">Lead Generation</option>
                            <option value="social">Social Media Marketing</option>
                            <option value="email">Email Marketing</option>
                        </select>
                        <input required {...register("title")} placeholder='Your Service Title' />
                        <input required type="number" {...register("price")} placeholder='Monthly Charge' />
                        <input required {...register("img")} placeholder='Image URL' />
                        <textarea required {...register("details")} />
                        <input className='btn btn-primary' type="submit" />
                    </form>
                </div>
            }


            {myDatas.length === 0 &&
                <div>
                    <Button><Link className='text-white' to={'/update'}>Please Update Your Provider Account</Link></Button>
                </div>
            }

            {
                clients.length === 1 && 
                <div>
                    <Button>Sorry. Buyer can not add any service.</Button>
                </div>
            }

        </div >
    );
};

export default AddService;