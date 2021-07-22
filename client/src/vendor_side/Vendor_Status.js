import React from "react";
import "./Vendor_Status.css";
import location from "./images/location.png";
import user from "./images/user.png";
import order from "./images/order.png";
import cup from "./images/CupLids.png";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const RightFloatBtn = withStyles((theme) => ({
  root: {
    borderRadius: "100px",
    background: "#8D30F5",
    boxShadow: "none",
    float: "right",
    padding: "10px 0 10px",
    width: "10%",
    "&:hover": {
      backgroundColor: "#9431f6",
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#a830fd",
    },
  },
}))(Button);

// vendor status component basically is there to change status of a vendor
// from ready to not ready and also add location

class Vendor_Status extends React.Component {
  constructor(props) {
    super(props);
    this.auth = props.auth;
    this.state = { value: "", vendor: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://final-snacks-backend.herokuapp.com/vendors/" +
          this.auth.user.id
      )
      .then((res) => {
        const vendor = res.data;
        console.log(vendor);
        this.setState({ vendor });
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    var data = JSON.stringify({
      location: this.state.value,
    });

    console.log(data);
    axios
      .post(
        "https://final-snacks-backend.herokuapp.com/vendors/changeStatus/" +
          this.auth.user.id,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Changed Status");
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    event.preventDefault();
  }

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    // to show the location of vendor
    for (var prop in this.state.vendor?.vendor) {
      var status = Object.values(this.state.vendor?.vendor)[0].status;
      var locationValue = Object.values(this.state.vendor?.vendor)[0].location;

      break;
    }
    return (
      <div className="page">
        <div className="left_nav">
          <p id="icon">
            <img src={cup} alt="error" />
          </p>
          <p style={{ background: "#F0E3FF" }}>
            <a href="/Vendor_Status">
              <img src={location} alt="error" />
            </a>
          </p>
          <p>
            <a href="/Vendor_Order">
              <img src={order} alt="error" />
            </a>
          </p>
          <p>
            <a href="Vendor_Profile">
              <img src={user} alt="error" />
            </a>
          </p>
        </div>
        <div className="body">
          <p id="Status">Status</p>
          <div className="address_box">
            <p id="title1">
              Set Address and Mark as Open.
              <br></br>
              Vendor Status - {status} {/* if location is null show n/a */}
              {{ locationValue } !== "N/A" ? (
                <div>Current Location : {locationValue}</div>
              ) : (
                <div></div>
              )}
            </p>

            <form onSubmit={this.handleSubmit}>
              <div id="addr_update">
                <input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="changeStatus"
                  onClick={(e) =>
                    axios
                      .post(
                        "https://final-snacks-backend.herokuapp.com/vendors/changeStatusClosed/" +
                          this.auth.user.id,
                        {
                          headers: { "Content-Type": "application/json" },
                        }
                      )
                      .then(function (response) {
                        console.log(response);

                        alert("Vendor Closed");
                        window.location.reload(true);
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                  }
                >
                  Change Vendor Status to Not Ready
                </Button>
                <RightFloatBtn
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </RightFloatBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Vendor_Status.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Vendor_Status);
