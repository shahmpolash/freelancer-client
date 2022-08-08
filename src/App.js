
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/AdminPanel/Admin';
import AdminSetup from './components/AdminPanel/AdminSetup';
import ProviderApprove from './components/AdminPanel/ProviderApprove';
import ProviderEdit from './components/AdminPanel/ProviderEdit';
import Providers from './components/AdminPanel/Providers';
import ProviderUnapprove from './components/AdminPanel/ProviderUnapprove';
import ProviderUnverify from './components/AdminPanel/ProviderUnverify';
import ProviderVerify from './components/AdminPanel/ProviderVerify';
import ServiceEdit from './components/AdminPanel/ServiceEdit';
import ServicePublish from './components/AdminPanel/ServicePublish';
import Services from './components/AdminPanel/Services';
import ServiceUnpublish from './components/AdminPanel/ServiceUnpublish';
import AcceptOrRejectWithdrawRequest from './components/Pages/AcceptOrRejectWithdrawRequest';
import AddService from './components/Pages/AddService/AddService';
import LeadGeneration from './components/Pages/AddService/AddServices/LeadGeneration';
import Seo from './components/Pages/AddService/AddServices/Seo';
import SocialMediaMarketing from './components/Pages/AddService/AddServices/SocialMediaMarketing';
import SetService from './components/Pages/AddService/SetService';
import ClientProfile from './components/Pages/Clients/ClientProfile';
import UpdateClientProfile from './components/Pages/Clients/UpdateClientProfile';
import UpdateProfileAsClient from './components/Pages/Clients/UpdateProfileAsClient';
import ConfirmPublishOrCancel from './components/Pages/ConfirmPublishOrCancel';
import FreelancerProfile from './components/Pages/Freelancers/FreelancerProfile/FreelancerProfile';
import UpdateProviderProfile from './components/Pages/Freelancers/FreelancerProfile/UpdateProviderProfile';
import UpdateProfile from './components/Pages/Freelancers/UpdateProfile/UpdateProfile';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Join/Login';
import RequireAuth from './components/Pages/Join/RequireAuth';
import SignUp from './components/Pages/Join/SignUp';
import ClientSentMessageToProvider from './components/Pages/Messaging/ClientSentMessageToProvider';
import ClientSentMessageToProviderAfterOrder from './components/Pages/Messaging/ClientSentMessageToProviderAfterOrder';
import MessageDetails from './components/Pages/Messaging/MessageDetails';
import Messages from './components/Pages/Messaging/Messages';
import ProviderMessages from './components/Pages/Messaging/ProviderMessages';
import ProviderSentMessageToClient from './components/Pages/Messaging/ProviderSentMessageToClient';
import SentMessages from './components/Pages/Messaging/SentMessages';
import AcceptOrReject from './components/Pages/Orders/AcceptOrReject';
import CancelOrder from './components/Pages/Orders/CancelOrder';
import CompleteOrder from './components/Pages/Orders/CompleteOrder';
import OrderItem from './components/Pages/Orders/OrderItem';
import ReleasePayment from './components/Pages/Orders/ReleasePayment';
import Requirement from './components/Pages/Orders/Requirement';
import Cart from './components/Pages/Payment/Cart';
import Payment from './components/Pages/Payment/Payment';
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
        <Route path='/cart' element={<RequireAuth><Cart></Cart></RequireAuth>}></Route>
        <Route path='/payment/:orderId' element={<RequireAuth><Payment></Payment></RequireAuth>}></Route>

        
        <Route path='/admin' element={<RequireAuth><Admin></Admin></RequireAuth>}></Route>
        <Route path='/admin/admin-setup' element={<RequireAuth><AdminSetup></AdminSetup></RequireAuth>}></Route>
        <Route path='/admin/providers' element={<RequireAuth><Providers></Providers></RequireAuth>}></Route>
        <Route path='/admin/provider/:id' element={<RequireAuth><ProviderEdit></ProviderEdit></RequireAuth>}></Route>
        <Route path='/admin/provider/approve/:id' element={<RequireAuth><ProviderApprove></ProviderApprove></RequireAuth>}></Route>
        <Route path='/admin/provider/unapprove/:id' element={<RequireAuth><ProviderUnapprove></ProviderUnapprove></RequireAuth>}></Route>
        <Route path='/admin/provider/verify/:id' element={<RequireAuth><ProviderVerify></ProviderVerify></RequireAuth>}></Route>
        <Route path='/admin/provider/unverify/:id' element={<RequireAuth><ProviderUnverify></ProviderUnverify></RequireAuth>}></Route>
        <Route path='/admin/services' element={<RequireAuth><Services></Services></RequireAuth>}></Route>
        <Route path='/admin/service/publish/:id' element={<RequireAuth><ServicePublish></ServicePublish></RequireAuth>}></Route>
        <Route path='/admin/service/unpublish/:id' element={<RequireAuth><ServiceUnpublish></ServiceUnpublish></RequireAuth>}></Route>
        <Route path='/admin/service/:id' element={<RequireAuth><ServiceEdit></ServiceEdit></RequireAuth>}></Route>


        <Route path='/acceptorreject/:id' element={<RequireAuth><AcceptOrReject></AcceptOrReject></RequireAuth>}></Route>
        <Route path='/requirement/:id' element={<RequireAuth><Requirement></Requirement></RequireAuth>}></Route>
        <Route path='/cancelorder/:id' element={<RequireAuth><CancelOrder></CancelOrder></RequireAuth>}></Route>
        <Route path='/complete/:id' element={<RequireAuth><CompleteOrder></CompleteOrder></RequireAuth>}></Route>
        <Route path='/reviewasaclient/:id' element={<RequireAuth><PostReviewAsaClient></PostReviewAsaClient></RequireAuth>}></Route>
        <Route path='/releasepayment/:id' element={<RequireAuth><ReleasePayment></ReleasePayment></RequireAuth>}></Route>
        <Route path='/reviewasaprovider/:id' element={<RequireAuth><PostReviewAsaProvider></PostReviewAsaProvider></RequireAuth>}></Route>
        <Route path='/test' element={<Test></Test>}></Route>
        <Route path='/freelancer/:freelancerId' element={<FreelancerProfile></FreelancerProfile>}></Route>
        <Route path='/updateprovider/:id' element={<UpdateProviderProfile></UpdateProviderProfile>}></Route>
        <Route path='/message/:serviceId' element={<RequireAuth><ClientSentMessageToProvider></ClientSentMessageToProvider></RequireAuth>}></Route>
        <Route path='/providermessage/:orderId' element={<RequireAuth><ProviderSentMessageToClient></ProviderSentMessageToClient></RequireAuth>}></Route>
        <Route path='/clientmessage/:orderId' element={<RequireAuth><ClientSentMessageToProviderAfterOrder></ClientSentMessageToProviderAfterOrder></RequireAuth>}></Route>
        <Route path='/client/:clientId' element={<ClientProfile></ClientProfile>}></Route>
        <Route path='/updateclientprofile/:clientId' element={<UpdateClientProfile></UpdateClientProfile>}></Route>
        <Route path='/withdraw/:id' element={<RequireAuth><WithdrawFunds></WithdrawFunds></RequireAuth>}></Route>
        <Route path='/userservice/:freelancerId' element={<FreelancerProfile></FreelancerProfile>}></Route>
        <Route path='/add-service' element={<RequireAuth><AddService></AddService></RequireAuth>}></Route>
        <Route path='/messages' element={<RequireAuth><Messages></Messages></RequireAuth>}></Route>
        <Route path='/sentmessages' element={<RequireAuth><SentMessages></SentMessages></RequireAuth>}></Route>
        <Route path='/inbox/:messageId' element={<RequireAuth><MessageDetails></MessageDetails></RequireAuth>}></Route>
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
        <Route path='/withdrawacceptorcancel/:id' element={<RequireAuth><WithdrawAcceptOrCancel></WithdrawAcceptOrCancel></RequireAuth>}></Route>
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
