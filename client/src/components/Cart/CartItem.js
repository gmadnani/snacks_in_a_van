import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

// For each item in cart we are mapping it back to cart
const CartItem = ({ carts }) => {
  const [allItems, setAllItems] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get(
          `https://final-snacks-backend.herokuapp.com/customers/menu/${carts?.item}`
        )
        .then((res) => setAllItems(res.data));
    });
  }, []);

  var price = allItems?.price;
  var cost = 0;
  cost = carts.quantity * price;

  return (
    <div>
      <img
        src={
          "https://final-snacks-backend.herokuapp.com/" + allItems?.itemPicture
        }
        width="200"
        height="200"
        className="menu-image"
      />
      <h1 className="menu-name">
        {carts.quantity} {allItems?.name}
      </h1>
      <h3 className="menu-small">Total cost: {cost}$ </h3>
      <h1 className="menu-name"></h1>
    </div>
  );
};

export default CartItem;
