import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";

// Header of homepage
function Header() {
  return (
    <header className="home-section">
      <div className="home-inner container">
        <div className="row">
          <div className="col-lg-6 p-5">
            <h1 className="display-4 fw-bold mb-4 pt-5">
              Order a Coffee on the GO
            </h1>
            <Button
              type="button"
              className="btn btn-outline-primary"
              href="/menu"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
