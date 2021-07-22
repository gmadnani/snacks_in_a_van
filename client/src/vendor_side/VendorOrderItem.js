import React, { useState, useEffect } from "react";
import axios from "axios";

// Mapping all items in the table
const VendorOrderItem = ({ orders }) => {
  const [allOrders, setAllOrders] = useState(null);
  console.log("inside order item");
  console.log(orders);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get(
          `https://final-snacks-backend.herokuapp.com/customers/menu/${orders?.item}`
        )
        .then((res) => setAllOrders(res.data));
    });
  }, []);

  return (
    <div>
      <p>
        {orders?.quantity} <br></br>
        {allOrders?.name}
      </p>
    </div>
  );
};

export default VendorOrderItem;
