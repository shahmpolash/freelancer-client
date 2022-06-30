import React, { useRef } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import './Login.css';
import GoogleJoin from './SocialLogin/GoogleJoin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || '/';

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

      if(loading || sending){
        return <Loading></Loading>
    }


      if(user){
          navigate(from, { replace: true });
      }

     

    const handleLogin = event => {
        event.preventDefault();
        const email = emailRef.current.value;  
        const password = passwordRef.current.value;  
        signInWithEmailAndPassword(email, password)     
    }
    const navigateToSignUp = event =>{
         navigate('/signup')
    }

    const resetPassword = async() =>{
        const email = emailRef.current.value;  
        if(email){
          await sendPasswordResetEmail(email);
          toast('Sent email');
        }
        else{
            toast('Please Enter Your Correct Email')
        }
    }

    return (
        <div className='container login-form'>
            <h2 className='text-primary text-center'>Login Now</h2>
            <form onSubmit={handleLogin} className='w-50 mx-auto'>
                <input  ref={emailRef} type="email" name="email" id="" placeholder='Enter Your Email' required />
                <input  ref={passwordRef} type="password" name="password" id="" placeholder='Enter Your Password' required />
                <input  type="submit" value="Login Now"  />
            </form>
            <p>New to Freelancer? <Link to='/signup' className='text-danger' onClick={navigateToSignUp}>Please Signup Now</Link></p>
            <p>Forgot Password? <button className='btn btn-link text-danger' onClick={resetPassword}>Reset Password</button></p>
            <GoogleJoin></GoogleJoin>
            <ToastContainer></ToastContainer>
        </div>
        
    );
};

export default Login;