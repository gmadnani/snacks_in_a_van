import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./navbar.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//header references before logging in
function Navbars2(isAuthenticated) {
  return (
    <div class="nav">
      <input type="checkbox" id="nav-check" />
      <div class="nav-header">
        <div class="nav-title">Snacks in a Van</div>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/menu">Menu</a>
        <a href="/All_Vans">All Vans</a>
        <a href="/Vendor">Vendor</a>
      </div>
    </div>
  );
}

//header references changes after logging in
function Navbars(isAuthenticated) {
  return (
    <div class="nav">
      <input type="checkbox" id="nav-check" />
      <div class="nav-header">
        <div class="nav-title">Snacks in a Van</div>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/menu">Menu</a>
        <a href="/All_Vans">All Vans</a>
        <a href="/dashboard">Logout</a>
        <a href="/MyOrder">My Orders</a>
        <a className="header-cart" href="/Cart">
          <ShoppingCartIcon className="header-ShopIcon" href="/Cart" />
        </a>
      </div>
    </div>
  );
}

class NavbarComponent extends React.Component {
  //checking which header references if logged in

  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated === true) {
      return <div>{Navbars(isAuthenticated)}</div>;
    } else {
      return <div>{Navbars2(isAuthenticated)}</div>;
    }
  }
}

NavbarComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
//connecting to logged in user for nav bar change
export default connect(mapStateToProps)(NavbarComponent);
