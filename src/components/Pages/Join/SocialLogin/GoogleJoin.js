import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading';

const GoogleJoin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    let errorElement ;

    if(loading){
        return <Loading></Loading>
    }

    if (error) {
        errorElement =  <p className='text-danger'>Error: {error.message}</p>
      }

      if(user){
        navigate('/')
      }

    return (
        <div>
            {errorElement}
            <button onClick={() => signInWithGoogle()} className='btn bg-primary text-white py-2 px-5 w-50'>Join Using Google</button>
        </div>
    );
};

export default GoogleJoin;