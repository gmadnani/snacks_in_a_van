import React, { useState, useEffect } from "react";
import axios from "axios";

// get each item from id and do a get request fom menu to show in orders
const OrderItems = ({ orders }) => {
  console.log(orders);

  const [newOrderItems, setNewOrderItems] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get(
          `https://final-snacks-backend.herokuapp.com/customers/menu/${orders?.item}`
        )
        .then((res) => setNewOrderItems(res.data));
    });
    console.log(newOrderItems);
  }, []);

  return (
    <div>
      <h1 className="order-info">
        <div>
          {orders.quantity} {newOrderItems?.name}
        </div>
      </h1>
    </div>
  );
};

export default OrderItems;
