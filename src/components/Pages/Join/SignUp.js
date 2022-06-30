import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Signup.css';
import auth from '../../../firebase.init';
import GoogleJoin from './SocialLogin/GoogleJoin';
import Loading from '../../Shared/Loading';

const SignUp = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
      const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

  
    const navigateToLogin = () => {
        navigate('/login')
    }

    if(user){
        navigate('/')
    }

    if(loading || updating){
        return <Loading></Loading>
    }

    const handleSignup = async (event) => {
        event.preventDefault();
      const name = event.target.name.value;
      const email = event.target.email.value;
      const password = event.target.password.value;

     await createUserWithEmailAndPassword(email, password);
     await updateProfile({ displayName: name });
     navigate('/update');
    }

    return (
        <div className='register-form  mx-auto'>
            <h2>Join Now</h2>
            <form onSubmit={handleSignup} className='w-50 mx-auto'>
                <input type="text" name="name" id="" placeholder='Enter Your Name' required />
                <input type="email" name="email" id="" placeholder='Enter Your Email' required />
                <input  type="password" name="password" id="" placeholder='Enter Your Password' required />
                <input type="submit" value="Join Now" />
            </form>
            <p>Already Have an Account? <Link to='/login' className='text-danger' onClick={navigateToLogin}>Please Login Now</Link></p>
            <GoogleJoin></GoogleJoin>
        </div>
    );
};

export default SignUp;