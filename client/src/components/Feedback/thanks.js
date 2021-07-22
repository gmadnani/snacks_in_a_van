import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NavbarComponent from "../Navbar/navbar_component";
import "./thanks.css";

// Last Thank you after the feedback
class Thanks extends Component {
  render() {
    return (
      <div>
        {" "}
        <NavbarComponent />
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h1 className="ty">Thanks you for Your Feedback</h1>

              <Button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                href="/"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Thanks;
