import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import loginbg from "./bg.png";
import NavbarComponent from "../Navbar/navbar_component";

// Login Component
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // console.log(userData);
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <NavbarComponent />
        <div style={{ maxHeight: "100vh", maxWidth: "100vw" }}>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              overflow: "hidden",
              backgroundImage: `url(${loginbg})`,
            }}
            className="row"
          >
            <Container
              style={{
                paddingLeft: "23vw",
                paddingTop: "5%",
                marginBottom: "15%",
              }}
            >
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back
                to home
              </Link>
              <div className="col s12" /*style={{ paddingLeft: "11.250px" }}*/>
                <h2>
                  <b>Login</b>
                </h2>
                <p
                  className="grey-text text-darken-1"
                  style={{ marginTop: "1rem" }}
                >
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div
                  className="input-field col s12"
                  style={{ marginTop: "2rem", width: "60%" }}
                >
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email || errors.emailnotfound,
                    })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                </div>
                <div
                  className="input-field col s12"
                  style={{ marginTop: "1rem", width: "60%" }}
                >
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
                      backgroundColor: "#8C30F5",
                      width: "200px",
                      borderRadius: "4px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable accent-3"
                  >
                    Login
                  </button>
                </div>
              </form>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
// export default Login;
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
