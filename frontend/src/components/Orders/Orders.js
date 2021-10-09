import React from "react";
import Navbar from "../Navbar/Navbar";
import OrderItem from "../OrderItem/OrderItem";

const Orders = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </div>
    </>
  );
};

export default Orders;
