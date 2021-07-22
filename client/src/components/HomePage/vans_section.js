import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Map - to be implemented

function VansSection() {
  return (
    <div>
      <section id="vans">
        <div className="container-fluid text-center">
          <div className="row">
            <div className="col pt-5">
              <h2 className="fw-bold">Vans Near You</h2>
              <p className="fw-bold">
                Heres a map to pick the best vans near you. Enable Location
                Services to detect
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="container-fluid bg-1 p-1">
        <div className="row text-center">
          <div className="col">
            <iframe
              title="Google Map"
              className="border border-1 border-dark mt-3"
              src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d28477.016773500967!2d80.96295468584297!3d26.851810521830366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d26.851049399999997!2d80.99815679999999!4m5!1s0x399bfd30a72dfa5b%3A0x35c4b4954027142b!2siq%20classes!3m2!1d26.858218899999997!2d80.9631824!5e0!3m2!1sen!2sin!4v1618468625435!5m2!1sen!2sin"
              style={{ width: "70%", height: "200px" }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VansSection;
