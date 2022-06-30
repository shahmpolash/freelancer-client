
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddService from './components/Pages/AddService/AddService';
import FreelancerProfile from './components/Pages/Freelancers/FreelancerProfile/FreelancerProfile';
import UpdateProfile from './components/Pages/Freelancers/UpdateProfile/UpdateProfile';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Join/Login';
import RequireAuth from './components/Pages/Join/RequireAuth';
import SignUp from './components/Pages/Join/SignUp';
import AcceptOrReject from './components/Pages/Orders/AcceptOrReject';
import CancelOrder from './components/Pages/Orders/CancelOrder';
import OrderItem from './components/Pages/Orders/OrderItem';
import ReleasePayment from './components/Pages/Orders/ReleasePayment';
import Dashboard from './components/Pages/Profile/Dashboard';
import PostReviewAsaClient from './components/Pages/Reviews/PostReviewAsaClient';
import PostReviewAsaProvider from './components/Pages/Reviews/PostReviewAsaProvider';
import ServiceDetails from './components/Pages/Services/ServiceDetails';
import Header from './components/Shared/Header';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/service/:serviceId' element={<ServiceDetails></ServiceDetails>}></Route>
        <Route path='/order/:serviceId' element={<OrderItem></OrderItem>}></Route>
        <Route path='/acceptorreject/:id' element={<AcceptOrReject></AcceptOrReject>}></Route>
        <Route path='/cancelorder/:id' element={<CancelOrder></CancelOrder>}></Route>
        <Route path='/reviewasaclient/:id' element={<PostReviewAsaClient></PostReviewAsaClient>}></Route>
        <Route path='/releasepayment/:id' element={<ReleasePayment></ReleasePayment>}></Route>
        <Route path='/reviewasaprovider/:id' element={<PostReviewAsaProvider></PostReviewAsaProvider>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
        <Route path='/freelancer/:freelancerId' element={<FreelancerProfile></FreelancerProfile>}></Route>
        <Route path='/userservice/:freelancerId' element={<FreelancerProfile></FreelancerProfile>}></Route>
        <Route path='/add-service' element={<RequireAuth><AddService></AddService></RequireAuth>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
        <Route path='/update' element={<RequireAuth><UpdateProfile></UpdateProfile></RequireAuth>}></Route>


        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  );
}

export default App;
