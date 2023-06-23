import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersistentDrawerLeft from './utilities/Events/Sidebar';
import Subscription from './utilities/Subs/Subscription';
import Explore from './utilities/Explore/Explore';
import ListYourEvent from './components/Listyourevent/ListYourEvent';
import Viewdetails1 from './components/Viewdetail/Viewdetails1';
import Admin from './utilities/Admin/Admin';
import Profile1 from './utilities/UserProfile/Profile1';
import Categories from './utilities/Categories/Categories';
import Navbar from './components/Navbar';
import Appp from './utilities/Pop/LoginPopup';
import AuthHOC from './utilities/Auth/AuthHOC'
import FAQ from './utilities/FAQ/Faq';
import Terms_N_Conditions from './utilities/TNC/Tnc';
import Privacy_Policy from './utilities/Policy/Policy';
import './utilities/omResponsive.css'
import Event1 from './utilities/Events/Event1';
import Footer from './utilities/footer/Footer';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/login" element={<Appp />}></Route>
        <Route path="/" element={<Landing />}></Route>
        <Route
          path="/event"
          element={<AuthHOC WrappedComponent={Event1} />}
        />
        <Route
          path="/subscription"
          element={<Subscription />}
        ></Route>
        <Route
          path="/explore"
          element={<AuthHOC WrappedComponent={Explore} />}
        ></Route>
        <Route
          path="/createnewevent"
          element={<AuthHOC WrappedComponent={ListYourEvent} />}
        ></Route>
        {/* <Route path="/categories" element={<Categories />}></Route> */}
        <Route
          path="/event/:eventId"
          element={<AuthHOC WrappedComponent={Viewdetails1} />}
        ></Route>
        {/* <Route
          path="/admin"
          element={<AuthHOC WrappedComponent={Admin} />}
        ></Route> */}
        <Route
          path="/profile"
          element={<AuthHOC WrappedComponent={Profile1} />}
        ></Route>
        <Route path='/faq' element={<FAQ/>}></Route>
        <Route path='/termsandconditions' element={<Terms_N_Conditions/>}></Route>
        <Route path='/privacypolicy' element={<Privacy_Policy/>}></Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
