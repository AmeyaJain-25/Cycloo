import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import "./OrderItem.scss";

const OrderItem = ({ order }) => {
  console.log({ order });
  let date = new Date(order.orderDate).toDateString();
  return (
    <>
      <Row className="orderItem_details">
        <Col md={6} className="ordered_prod_img">
          <img src={order.products[0].photoUrl[0]} width="90%" />
        </Col>
        <Col md={6} className="order_content">
          <h2>{order.products[0].name}</h2>
          <p>{order.products[0].description}</p>
          <h3>₹ {order.amount}</h3>
          <div className="order_info">
            <div className="order_prop">
              <h3>Ordered date</h3> <span className="discount_tag">{date}</span>{" "}
            </div>
            <div className="order_prop">
              <h3>Order ID</h3>
              <span className="discount_tag">
                {order.orderId.substring(0, 18)}
              </span>{" "}
            </div>
            <div className="order_prop">
              <h3>Payment method</h3>{" "}
              <span className="discount_tag">{order.paymentMethod}</span>{" "}
            </div>
            <div className="order_prop">
              <h3>Order status</h3>{" "}
              <span className="discount_tag">{order.status}</span>{" "}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default OrderItem;
