import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home_component.css";

// Achievements on landing page
function LastSection() {
  return (
    <div className="container achieve-section">
      <div className="row mt-5">
        <div className="col-lg-6 mt-3 mb-3">
          <h2>Our Achievements</h2>
          <p className="mb-0">With our super powers and your support</p>
          <p>we have reached here</p>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <ul className="list-unstyled">
                <li className="media">
                  <i className="fas fa-align-justify fa-2x mr-3 mt-3 text-info"></i>
                  <div className="media-body">
                    <div className="row">
                      <div className="col">
                        <h3 className="mb-0">10,000+</h3>
                        <p>Downloads per day</p>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="media">
                  <i className="fas fa-align-justify fa-2x mr-3 mt-3 text-success"></i>
                  <div className="media-body">
                    <div className="row">
                      <div className="col">
                        <h3 className="mb-0">500+</h3>
                        <p>Clients</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="list-unstyled">
                <li className="media">
                  <i className="fas fa-align-justify fa-2x mr-3 mt-3 text-danger"></i>
                  <div className="media-body">
                    <div className="row">
                      <div className="col">
                        <h3 className="mb-0">2 Million</h3>
                        <p>Users</p>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="media">
                  <i className="fas fa-align-justify fa-2x mr-3 mt-3 text-warning"></i>
                  <div className="media-body">
                    <div className="row">
                      <div className="col">
                        <h3 className="mb-0">140</h3>
                        <p>Countries</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastSection;
