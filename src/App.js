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
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path='/login' element={<Appp/>}></Route>
      <Route path='/' element={<Landing/>}></Route>
      <Route exact path='/event' element={<PersistentDrawerLeft/>}></Route>
      <Route path='/subscription' element={<Subscription/>}></Route>
      <Route path='/explore' element={<Explore/>}></Route>
      <Route path='/createnewevent' element={<ListYourEvent />}></Route>
      <Route path='/categories' element={<Categories />}></Route>
      <Route path='/event/:eventId' element={<Viewdetails />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
      <Route path='/profile' element={<Profile />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
