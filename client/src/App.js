import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Home from "./components/HomePage/home_component";
import Menu from "./components/Menu/menu_component";
import All_Vans from "./components/Vans/All_Vans";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Order from "./components/MyOrder/MyOrder";
import Rate from "./components/Feedback/rate";
import Thanks from "./components/Feedback/thanks";
import PrivateRoute from "./components/private-route/privateRoute";
import Dashboard from "./components/dashboard/dashboard";
import Vendor_Login from "./components/authentication/VLogin";
import Vendor_Landing from "./vendor_side/Vendor_Landing";
import Vendor_Status from "./vendor_side/Vendor_Status";
import Vendor_Order from "./vendor_side/Vendor_Order";
import Vendor_Profile from "./vendor_side/Vendor_Profile";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

// App file has all the routes and private routes
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/Menu" component={Menu} />
          <Route exact path="/All_Vans" component={All_Vans} />
          <Route exact path="/Vendor" component={Vendor_Landing} />
          <Route exact path="/Vendor_Status" component={Vendor_Status} />
          <Route exact path="/Vendor_Order" component={Vendor_Order} />
          <Route exact path="/Vendor_Profile" component={Vendor_Profile} />
          <Route exact path="/Vendor_Login" component={Vendor_Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/Checkout" component={Checkout} />
            <PrivateRoute exact path="/MyOrder" component={Order} />
            <PrivateRoute exact path="/Rate" component={Rate} />
            <PrivateRoute exact path="/Thanks" component={Thanks} />
            <PrivateRoute exact path="/Cart" component={Cart} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
