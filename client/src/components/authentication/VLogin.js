import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginVendor } from "../../actions/authActions";
import classnames from "classnames";
import vloginbg from "./bgv.png";

// Vendor Login Component
class VLogin extends Component {
  constructor() {
    super();
    this.state = {
      Vname: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and vendor navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Vendor_Profile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Vendor_Status"); // push vendor to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  // change state
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  //submit state
  onSubmit = (e) => {
    e.preventDefault();
    const vendorData = {
      Vname: this.state.Vname,
      password: this.state.password,
    };

    console.log(vendorData);
    this.props.loginVendor(vendorData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${vloginbg})`,
        }}
        className="row"
      >
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back
                to home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h1>
                  <b>Login</b>
                </h1>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div
                  style={{ marginTop: "3rem" }}
                  className="input-field col s11"
                >
                  <input
                    onChange={this.onChange}
                    value={this.state.Vname}
                    error={errors.Vname}
                    id="Vname"
                    type="email"
                    className={classnames("", {
                      invalid: errors.Vname || errors.Vnamenotfound,
                    })}
                  />
                  <label style={{ marginTop: "-3rem" }} htmlFor="Vname">
                    Vendor name
                  </label>
                  <span className="red-text">
                    {errors.Vname}
                    {errors.Vnamenotfound}
                  </span>
                </div>
                <div className="input-field col s11">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect,
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                      color: "#FFFFFF",
                      backgroundColor: "#8C30F5",
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export default Login;
VLogin.propTypes = {
  loginVendor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginVendor })(VLogin);
