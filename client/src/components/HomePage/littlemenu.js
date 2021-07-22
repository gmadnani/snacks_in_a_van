import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../loader";
import "./home_component.css";
import Van_1 from "../images/Van-1.png";

// All Vendors

function Menu(name) {
  return (
    <div className="container mt-5 home-van-card">
      <ul className="list-unstyled bg-white rounded-3">
        <li className="media my-2 p-5">
          <img src={Van_1} className="mr-3 ii border border-2" alt="..." />
          <div className="media-body">
            <div className="row">
              <div className="col-lg-8">
                <h3 className="mb-1 text-primary fw-bold">{name}</h3>
                <i className="fas fa-quote-left text-primary mb-0">
                  <p className="ml-4 mt-0 text-dark description">
                    {" "}
                    Hot Chocolate is to die for{" "}
                  </p>
                </i>
              </div>
              <div className="col-lg-4 al-lft">
                <p className="mt-3 text-primary meters"> 100 Meters Away </p>
                <a href="/Menu">
                  <button
                    type="button"
                    className="btn btn-primary"
                    href="/Menu"
                  >
                    LookUp Menu
                  </button>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

const LittleMenu = (props) => {
  const [vendors, setVendors] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://final-snacks-backend.herokuapp.com/vendors")
        .then((res) => setVendors(res.data), setLoader(false));
    }, 500);
  }, []);

  return (
    <div>
      <div>
        <div className="row mt-5 my-5 five-closest">
          <h3>Five Closest Vans Around You</h3>
        </div>
        {loader ? <Loader /> : null}

        {vendors?.map((vendor) => (
          <div>{Menu(vendor.Vname)}</div>
        ))}
      </div>
    </div>
  );
};

export default LittleMenu;
