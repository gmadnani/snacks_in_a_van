import { Link, Container } from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import checkoutbg from "./checkoutbg.png";
import "./Checkout.css";
import NavbarComponent from "../Navbar/navbar_component";

//checkout page
function Checkout() {
  return (
    <div><NavbarComponent />
      <Container style={{ maxHeight: "100%", maxWidth: "90%" }}>
        <div
          style={{
            height: "100vh",
            backgroundPosition: "900px 80px",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${checkoutbg})`,
          }}
        >
          <Typography
            style={{ paddingTop: "18%" }}
            variant="h4"
            color="textPrimary"
            align="left"
          >
            {"Your order has been placed!"} <br />
            {"Track your order's progress in "}
            <Link variant="h4" color="primary" href="/MyOrder">
              My Order
            </Link>{" "}
            {"page."}
            <div style={{ paddingTop: "5%", fontSize: 20 }}>
              {" "}
              Please go to your Order page to check for more information. <br />
              If we haven't deliver in 10min, you will receive a 20% off.{" "}
            </div>
          </Typography>
        </div>
      </Container>
    </div>
  );
}

export default Checkout;
