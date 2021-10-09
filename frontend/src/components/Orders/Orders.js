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
          maxWidth: "1220px",
          margin: "0em auto",
          width: "100%",
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
