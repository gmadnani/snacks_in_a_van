import React from "react";
import { Button } from "react-bootstrap";
import "./rate.css";
import ReactStars from "react-rating-stars-component";
import { MDBInput } from "mdb-react-ui-kit";
import NavbarComponent from "../Navbar/navbar_component";

const divStyleTitle = {
  font: "Manrope",
  fontSize: "5vh",
  marginTop: 0,
  marginBottom: 20,
  color: "#2EC5CE",
  lineHeight: 1,
};

const ratingChanged = (newRating) => {
  console.log(newRating);
};

// Feedback Page
export default function Rate() {
  return (
    <div>
      {" "}
      <NavbarComponent />
      <div style={{ marginTop: "8vh", marginLeft: "10vw" }}>
        <b style={divStyleTitle}>Rate Your Experience! </b>
        <div>
          <p style={{ fontSize: "120%", marginTop: "7vh", width: "70%" }}>
            How do you find the accuracy of the van’s location?
          </p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            activeColor="#ffd700"
          />
        </div>
        <div>
          <p style={{ fontSize: "120%", marginTop: "5vh", width: "70%" }}>
            Do you enjoy the food?
          </p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            activeColor="#ffd700"
          />
        </div>
        <div>
          <p style={{ fontSize: "120%", marginTop: "5vh", width: "70%" }}>
            Do you find it fast for Tasty Trailer to prepare the food?
          </p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            activeColor="#ffd700"
          />
        </div>
        <div>
          <p style={{ fontSize: "120%", marginTop: "5vh", width: "70%" }}>
            How do you find the customer service?
          </p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            activeColor="#ffd700"
          />
          {/* document.getElementById("where-to-render") */}
        </div>
        <div style={{ width: "70vw" }}>
          <p style={{ fontSize: "120%", marginTop: "5vh", width: "70%" }}>
            Leave a comment about your experience with Tasty Trailer:
          </p>
          <div style={{ marginTop: "3vh" }}>
            <MDBInput
              label="Leave a comment here..."
              id="comment"
              textarea
              rows={5}
            />
          </div>
        </div>
        <Button
          href="/thanks"
          className="text-center"
          style={{ width: 130, height: 50, fontSize: "4%", marginTop: "4vh" }}
        >
          <b style={{ marginLeft: "175%" }}>Submit</b>
        </Button>{" "}
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
