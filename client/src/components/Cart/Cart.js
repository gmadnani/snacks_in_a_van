import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../loader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  FormGroup,
} from "react-bootstrap";
import NavbarComponent from "../Navbar/navbar_component";
import "./Cart.css";

const divStyleTitle = {
  font: "Manrope",
  fontSize: "50px",
  marginTop: 0,
  marginBottom: 50,
};

// Cart Component

const CartsComponent = (props) => {
  const [carts, setCarts] = useState([]);
  const [loader, setLoader] = useState(true);

  //get customer's cart
  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://final-snacks-backend.herokuapp.com/customers/cart")
        .then((res) => setCarts(res.data), setLoader(false));
    }, 0);
  }, []);

  // Adding data to cart
  function returndata() {
    var data = JSON.stringify({
      orderItems: carts.cart.cartItems,
    });

    return data;
  }

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          <Col>
            <div style={divStyleTitle}>
              <br />
              <p style={{ marginBottom: 0 }}>
                <b>My Cart</b>
              </p>
            </div>
          </Col>
        </Row>

        {carts?.cart?.cartItems.map((item) => (
          <div>
            <CartItem carts={item} />
          </div>
        ))}

        <Row>{loader ? <Loader /> : null}</Row>
        <Row
          style={{ maxHeight: "150px", display: "flex" }}
          className="bottom-row"
        >
          <Col style={{ marginRight: 0, width: "80%", flex: 3, marginTop: 10 }}>
            <Card className="BoxStyle">
              <div class="Special_font"> Special Instructions </div>
              <div className="rectangle"></div>
              <FormGroup style={{ marginBottom: 0, marginTop: 20 }}>
                <Form.Control
                  style={{
                    width: "80%",
                    fontSize: "0.01%",
                    marginLeft: "5%",
                  }}
                  type="text"
                  placeholder="Provide any special instructions here (Eg. No Sugar in Cappucino)"
                />
              </FormGroup>
            </Card>
          </Col>
          <Col style={{ flex: 1 }}>
            <Container style={{ marginTop: "25%", marginLeft: "15%" }}>
              <br />
              <Button
                onClick={(e, data = returndata()) =>
                  axios
                    .post(
                      "https://final-snacks-backend.herokuapp.com/customers/order/add",
                      data,
                      {
                        headers: { "Content-Type": "application/json" },
                      }
                    )
                    .then(function (response) {
                      console.log(data);
                      console.log(response);
                      window.location = "/Checkout";
                      alert("Added to order");
                    })
                    .catch(function (error) {
                      console.log(data);
                      console.log(error);
                    })
                }
              >
                <b>Checkout</b>
              </Button>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

CartsComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CartsComponent);
