import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./dashboard.css";
import NavbarComponent from "../Navbar/navbar_component";

//logout page
class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div><NavbarComponent />
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h1 className="hi-name">
                Hi! {user.name}, Click here if you want to logout. :)
              </h1>

              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
//connect to logging user
export default connect(mapStateToProps, { logoutUser })(Dashboard);
