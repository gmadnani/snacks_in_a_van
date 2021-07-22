import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./menu.css";
import Box from "./box.png";
import axios from "axios";
import Loader from "../loader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavbarComponent from "../Navbar/navbar_component";

const divStyleTitle = {
  font: "Manrope",
  fontSize: "medium",
  marginTop: 0,
  marginBottom: 20,
  marginLeft: 15,
};

const divStyle2 = {
  color: "#2EC5CE",
  fontSize: "50px",
};

function Item(
  name,
  price,
  description,
  itemPicture,
  id,
  isAuthenticated,
  userId
) {
  let data = JSON.stringify({
    cartItems: {
      item: id,
      quantity: 1,
    },
  });

  return (
    <div>
      <Card className="menu-card">
        <Card.Img className="image-card" variant="top" src={itemPicture} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div
            className="container_price"
            style={{ marginLeft: 0, marginTop: 15, marginBottom: 15 }}
          >
            <img src={Box} alt="Snow"></img>
            <div className="centre-left">${price}</div>
          </div>
          <Button
            variant="primary"
            //only allowing logged in user to add to cart
            // post request to add to cart
            onClick={(e) =>
              isAuthenticated
                ? axios
                    .post(
                      "https://final-snacks-backend.herokuapp.com/customers/cart/add",
                      data,
                      {
                        headers: { "Content-Type": "application/json" },
                      }
                    )
                    .then(function (response) {
                      console.log(response);
                      alert("Added to cart");
                    })
                    .catch(function (error) {
                      console.log(data);
                      console.log(error);
                    })
                : alert("Please Login")
            }
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

// Menu Component
const MenusComponent = (props) => {
  const { isAuthenticated } = props.auth;

  const userData = props.auth.user.id;

  const [menus, setMenus] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://final-snacks-backend.herokuapp.com/customers/menu")
        .then((res) => setMenus(res.data), setLoader(false));
    }, 500);
  }, []);

  return (
    <div>
      <NavbarComponent />
      <Container
        style={{
          marginTop: 30,
          maxWidth: 800,
          maxHeight: 6000,
        }}
      >
        <Row>
          <Col>
            <div style={divStyleTitle}>
              <br />
              <p className="menu-heading">
                <b style={divStyle2}> Menu </b>
              </p>
            </div>
          </Col>
        </Row>

        <Container style={{ display: "flex", overflow: "hidden" }}>
          <Row style={{ marginRight: 0, maxHeight: 6000 }}>
            {loader ? <Loader /> : null}
            {/* Mapping each item */}
            {menus?.map((menu) => (
              <div>
                {Item(
                  menu.name,
                  menu.price,
                  menu.description,
                  "https://final-snacks-backend.herokuapp.com/" +
                    menu.itemPicture,
                  menu._id,
                  isAuthenticated,
                  userData
                )}
              </div>
            ))}
          </Row>
        </Container>
      </Container>

      <div className="text-center" style={{ position: "relative", bottom: 0 }}>
        {/* Only show the cart button if authenticated */}
        <Button
          variant="primary"
          size="xx"
          onClick={(e) =>
            isAuthenticated
              ? (window.location = "/Cart")
              : alert("Please Login")
          }
        >
          <b>View Cart</b>
        </Button>{" "}
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

// Checking if customer has logged in to change navbar
MenusComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MenusComponent);
