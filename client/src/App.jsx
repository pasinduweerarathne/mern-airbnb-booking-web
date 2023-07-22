import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account";
import PlacesForm from "./pages/PlacesForm";
import Places from "./pages/Places";
import Place from "./pages/Place";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";

axios.defaults.baseURL = "https://vercel.com/pasinduweerarathne/mern-airbnb-booking-web";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/places" element={<Places />} />
            <Route path="/account/places/new" element={<PlacesForm />} />
            <Route path="/account/bookings" element={<Bookings />} />

            <Route path="/account/places/:id" element={<PlacesForm />} />
            <Route path="/place/:id" element={<Place />} />
            <Route path="/account/bookings/:id" element={<Booking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
