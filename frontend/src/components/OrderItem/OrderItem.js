import React from "react";
import ProductImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import "./OrderItem.scss";

const OrderItem = () => {
  return (
    <>
      <div className="orderItem_details">
        <div className="ordered_prod_img">
          <img src={ProductImg} alt="Add Item" />
        </div>
        <div className="order_content">
          <h2>Order details</h2>
          <p>KROSS Kids Evox 20 T BMX 14,Steel Bike Bicycle</p>
          <h3>$13.95</h3>
          <div className="order_info">
            <div className="order_prop">
              <h3>Ordered date</h3>{" "}
              <span className="discount_tag">13 June, 2021</span>{" "}
            </div>
            <div className="order_prop">
              <h3>Order ID</h3>
              <span className="discount_tag">
                26198255-ebdf-4ca2-82be-55e2b1e0bd60
              </span>{" "}
            </div>
            <div className="order_prop">
              <h3>Payment method</h3> <span className="discount_tag">COD</span>{" "}
            </div>
            <div className="order_prop">
              <h3>Order status</h3>{" "}
              <span className="discount_tag" style={{ background: "#9AFE11" }}>
                shipped
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
