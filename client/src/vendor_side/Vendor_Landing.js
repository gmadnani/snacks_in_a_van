import React from "react";
import "./Vendor_Landing.css";
import NavbarComponent from "../components/Navbar/navbar_component";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

// Vendor Landing Page
export default function Vendor_Landing() {
  const classes = useStyles();
  return (
    <div>
      {" "}
      <NavbarComponent />
      <div class="main">
        <br />
        <div class="title_container">
          <p class="Welcome">Welcome Back</p>
          <p class="text1">Ready to start?</p>
          <p class="text2">Send your location and mark as Open</p>
          <div className={classes.root}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => (window.location.href = "/Vendor_Login")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
