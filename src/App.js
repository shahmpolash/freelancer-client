
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AcceptOrRejectWithdrawRequest from './components/Pages/AcceptOrRejectWithdrawRequest';
import AddService from './components/Pages/AddService/AddService';
import LeadGeneration from './components/Pages/AddService/AddServices/LeadGeneration';
import Seo from './components/Pages/AddService/AddServices/Seo';
import SocialMediaMarketing from './components/Pages/AddService/AddServices/SocialMediaMarketing';
import SetService from './components/Pages/AddService/SetService';
import ClientProfile from './components/Pages/Clients/ClientProfile';
import UpdateProfileAsClient from './components/Pages/Clients/UpdateProfileAsClient';
import ConfirmPublishOrCancel from './components/Pages/ConfirmPublishOrCancel';
import FreelancerProfile from './components/Pages/Freelancers/FreelancerProfile/FreelancerProfile';
import UpdateProfile from './components/Pages/Freelancers/UpdateProfile/UpdateProfile';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Join/Login';
import RequireAuth from './components/Pages/Join/RequireAuth';
import SignUp from './components/Pages/Join/SignUp';
import Messages from './components/Pages/Messaging/Messages';
import ProviderMessages from './components/Pages/Messaging/ProviderMessages';
import AcceptOrReject from './components/Pages/Orders/AcceptOrReject';
import CancelOrder from './components/Pages/Orders/CancelOrder';
import CompleteOrder from './components/Pages/Orders/CompleteOrder';
import OrderItem from './components/Pages/Orders/OrderItem';
import ReleasePayment from './components/Pages/Orders/ReleasePayment';
import Requirement from './components/Pages/Orders/Requirement';
import Dashboard from './components/Pages/Profile/Dashboard';
import PublishedOrCancelService from './components/Pages/PublishedOrCancelService';
import PostReviewAsaClient from './components/Pages/Reviews/PostReviewAsaClient';
import PostReviewAsaProvider from './components/Pages/Reviews/PostReviewAsaProvider';
import LeadGenerationServices from './components/Pages/Services/LeadGenerationServices';
import SeoServices from './components/Pages/Services/SeoServices';
import ServiceDetails from './components/Pages/Services/ServiceDetails';
import Setup from './components/Pages/Setup';
import Transactions from './components/Pages/Transactions';
import WithdrawAcceptOrCancel from './components/Pages/WithdrawAcceptOrCancel';
import WithdrawFunds from './components/Pages/WithdrawFunds';
import Footer  from './components/Shared/Footer';
import Header from './components/Shared/Header';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/service/:serviceId' element={<ServiceDetails></ServiceDetails>}></Route>
        <Route path='/order/:serviceId' element={<RequireAuth><OrderItem></OrderItem></RequireAuth>}></Route>
        <Route path='/acceptorreject/:id' element={<AcceptOrReject></AcceptOrReject>}></Route>
        <Route path='/requirement/:id' element={<Requirement></Requirement>}></Route>
        <Route path='/cancelorder/:id' element={<CancelOrder></CancelOrder>}></Route>
        <Route path='/complete/:id' element={<CompleteOrder></CompleteOrder>}></Route>
        <Route path='/reviewasaclient/:id' element={<PostReviewAsaClient></PostReviewAsaClient>}></Route>
        <Route path='/releasepayment/:id' element={<ReleasePayment></ReleasePayment>}></Route>
        <Route path='/reviewasaprovider/:id' element={<PostReviewAsaProvider></PostReviewAsaProvider>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
        <Route path='/freelancer/:freelancerId' element={<FreelancerProfile></FreelancerProfile>}></Route>
        <Route path='/message/:serviceId' element={<ProviderMessages></ProviderMessages>}></Route>
        <Route path='/client/:clientId' element={<ClientProfile></ClientProfile>}></Route>
        <Route path='/withdraw/:id' element={<WithdrawFunds></WithdrawFunds>}></Route>
        <Route path='/userservice/:freelancerId' element={<FreelancerProfile></FreelancerProfile>}></Route>
        <Route path='/add-service' element={<RequireAuth><AddService></AddService></RequireAuth>}></Route>
        <Route path='/messages' element={<RequireAuth><Messages></Messages></RequireAuth>}></Route>
        <Route path='/set-service' element={<RequireAuth><SetService></SetService></RequireAuth>}></Route>
        <Route path='/seo' element={<RequireAuth><Seo></Seo></RequireAuth>}></Route>
        <Route path='/lead' element={<RequireAuth><LeadGeneration></LeadGeneration></RequireAuth>}></Route>
        <Route path='/social' element={<RequireAuth><SocialMediaMarketing></SocialMediaMarketing></RequireAuth>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
        <Route path='/update' element={<RequireAuth><UpdateProfile></UpdateProfile></RequireAuth>}></Route>
        <Route path='/updateclient' element={<RequireAuth><UpdateProfileAsClient></UpdateProfileAsClient></RequireAuth>}></Route>
        <Route path='/setup' element={<RequireAuth><Setup></Setup></RequireAuth>}></Route>
        <Route path='/withdrawal' element={<AcceptOrRejectWithdrawRequest></AcceptOrRejectWithdrawRequest>}></Route>
        <Route path='/servicepublish' element={<PublishedOrCancelService></PublishedOrCancelService>}></Route>
        <Route path='/confirmpublish/:serviceId' element={<ConfirmPublishOrCancel></ConfirmPublishOrCancel>}></Route>
        <Route path='/withdrawacceptorcancel/:id' element={<WithdrawAcceptOrCancel></WithdrawAcceptOrCancel>}></Route>
        <Route path='/transactions/' element={<Transactions></Transactions>}></Route>
        <Route path='/seo-services' element={<SeoServices></SeoServices>}></Route>
        <Route path='/lead-generation-services' element={<LeadGenerationServices></LeadGenerationServices>}></Route>


        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
