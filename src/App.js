import logo from './logo.svg';
import './App.css';
import Works from './utilities/works/Works';
import Footer from './utilities/footer/Footer';
import Agriculture from './utilities/agriculture/Agriculture';
import Goldmine from './utilities/GoldMine/Goldmine';
import Home from './components/Home';
import Landing from './components/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersistentDrawerLeft from './utilities/Events/Sidebar';
import Subscription from './utilities/Subs/Subscription';
import Explore from './utilities/Explore/Explore';
import ListYourEvent from './components/Listyourevent/ListYourEvent';
import Viewdetails from './components/Viewdetails';
import Admin from './utilities/Admin/Admin';
import Profile from './utilities/UserProfile/Profile';
import Categories from './utilities/Categories/Categories';
import Navbar from './components/Navbar';
import Appp from './utilities/Pop/LoginPopup';
import AuthHOC from './utilities/Auth/AuthHOC'
import FAQ from './utilities/FAQ/Faq';
import Terms_N_Conditions from './utilities/TNC/Tnc';
import Privacy_Policy from './utilities/Policy/Policy';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/login" element={<Appp />}></Route>
        <Route path="/" element={<Landing />}></Route>
        <Route
          path="/event"
          element={<AuthHOC WrappedComponent={PersistentDrawerLeft} />}
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
          element={<AuthHOC WrappedComponent={Viewdetails} />}
        ></Route>
        {/* <Route
          path="/admin"
          element={<AuthHOC WrappedComponent={Admin} />}
        ></Route> */}
        <Route
          path="/profile"
          element={<AuthHOC WrappedComponent={Profile} />}
        ></Route>
        <Route path='/faq' element={<FAQ/>}></Route>
        <Route path='/termsandconditions' element={<Terms_N_Conditions/>}></Route>
        <Route path='/privacypolicy' element={<Privacy_Policy/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
