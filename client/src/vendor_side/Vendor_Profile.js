import React from "react";
import "./Vendor_Profile.css";
import location from "./images/location.png";
import user from "./images/user.png";
import order from "./images/order.png";
import cup from "./images/CupLids.png";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
const StyleBtn = withStyles((theme) => ({
  root: {
    borderRadius: "100px",
    background: "#8D30F5",
    boxShadow: "none",
    padding: "8px 20px 8px",
    "&:hover": {
      backgroundColor: "#9431f6",
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#a830fd",
    },
  },
}))(Button);

// Vendor profile - logout page for vendor
const Vendor_Profile = (props) => {
  function onLogoutClick(e) {
    e.preventDefault();
    props.logoutUser();
    window.location.href = "/Vendor_login";
  }
  const user2 = props.auth;

  return (
    <div className="page">
      <div className="left_nav">
        <p id="icon">
          <img src={cup} alt="error" />
        </p>
        <p>
          <a href="/Vendor_Status">
            <img src={location} alt="error" />
          </a>
        </p>
        <p>
          <a href="/Vendor_Order">
            <img src={order} alt="error" />
          </a>
        </p>
        <p style={{ background: "#F0E3FF" }}>
          <a href="/Vendor_Profile">
            <img src={user} alt="error" />
          </a>
        </p>
      </div>
      <div className="body">
        <p className="page_title">Profile</p>
        <div className="profile_box">
          <span>
            <b>Vendor Name</b>
            <p>{user2.user.Vname}</p>
          </span>
          <br />
          <br />

          <StyleBtn
            className="pwd-btn"
            variant="contained"
            color="primary"
            onClick={onLogoutClick}
          >
            Logout
          </StyleBtn>
        </div>
      </div>
    </div>
  );
};

Vendor_Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Vendor_Profile);
