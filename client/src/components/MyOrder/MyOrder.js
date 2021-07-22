import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OrderItems from "./OrderItems";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavbarComponent from "../Navbar/navbar_component";
import "./MyOrder.css";

// Orders component
const OrdersComponent = (props) => {
  const [orders, setOrders] = useState([]);

  //get customer's order
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://final-snacks-backend.herokuapp.com/customers/order")
        .then((res) => setOrders(res.data));
    }, 0);
    console.log(orders.order);
    console.log("orders are");
    console.log(orders);
  }, []);

  // check if order status is outstanding
  function isdisabledCancel() {
    if (orders?.order?.orderStatus === "Outstanding") {
      return false;
    } else {
      return true;
    }
  }

  // check if order status is completed
  function isdisabledRate() {
    if (orders?.order?.orderStatus === "Completed") {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div>
      <NavbarComponent />
      <Container>
        <br></br>
        <br></br>
        <h2>My Order</h2>
      </Container>

      <Row className="pt-5">
        <Col sm="3">
          <h5>Order Detail</h5>
        </Col>
        <Col sm="1">
          Order Items{" "}
          {orders?.order?.orderItems?.map((item) => (
            <div>
              <OrderItems orders={item} />
            </div>
          ))}
        </Col>
      </Row>
      <Row className="pt-4">
        <Col sm="1">
          <h5>Order Progress</h5>
        </Col>
        <Col sm="9">
          <Row>
            <Col sm="1">
              <hr className="d-none d-md-block" />
            </Col>
            <Col sm="8">
              <h5>Your order is </h5> {orders?.order?.orderStatus}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="order-button align-center">
        <Col sm="3" className="text-center">
          <Button
            disabled={isdisabledCancel()}
            variant="info"
            className="text-white"
            onClick={(e) =>
              axios
                .post(
                  "https://final-snacks-backend.herokuapp.com/customers/order/cancel"
                )
                .then(function (response) {
                  console.log(response);
                  alert("Deleted Order");
                  window.location = "/menu";
                })
                .catch(function (error) {
                  console.log(error);
                })
            }
          >
            Cancel Order
          </Button>
        </Col>
        <Col sm="3" className="text-center">
          <Button
            disabled={isdisabledRate()}
            variant="info"
            className="text-white"
            href="/Rate"
          >
            Rate Us
          </Button>
        </Col>
      </Row>
    </div>
  );
};

// get login auth of customer
OrdersComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(OrdersComponent);
