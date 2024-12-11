import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Menu from "./components/Menu";
import Cart from "./components/cart/Cart";
import Delivery from "./components/cart/Delivery";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userAction";
import store from "./store";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import ConfirmOrder from "./components/cart/ConfirmOrder";

// payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import OrderDetails from "./components/order/OrderDetails";
import { useSelector } from "react-redux";
import ListOrders from "./components/order/ListOrders";

export default function App() {

  const [stripeAPIKey, setStripeAPIKey] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    async function getStripeAPIKey() {
      try {
        const { data } = await axios.get("/api/v1/stripeapi");
        setStripeAPIKey(data.stripeApiKey);
      } catch (error) {
        console.error("Error Fetching Stripe API key:", error);
      }
    }
    if (isAuthenticated) {
      getStripeAPIKey();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/eats/stores/search/:keyword" element={<Home />} exact />
            <Route
              path="/eats/stores/search/:keyword"
              element={<Home />}
              exact
            />
            <Route path="/eats/stores/:id/menus" element={<Menu />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/delivery" element={<Delivery />} exact />

            {/* User */}
            <Route path="/users/login" element={<Login />} exact />
            <Route path="/users/signup" element={<Register />} exact />
            <Route path="/users/me" element={<Profile />} exact />
            <Route path="/users/me/update" element={<UpdateProfile />} exact />
            <Route
              path="/users/forgetPassword"
              element={<ForgotPassword />}
              exact
            />
            <Route
              path="/users/resetPassword/:token"
              element={<NewPassword />}
              exact
            />

            <Route path="/confirm" element={<ConfirmOrder />} exact />

            {stripeAPIKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeAPIKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}

            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/eats/orders/me/myOrders" element={<ListOrders />} />
            <Route path="/eats/orders/:id" element={<OrderDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
