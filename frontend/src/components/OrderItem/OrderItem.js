import React, { useState } from "react";
import ProductImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import "./OrderItem.scss";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const OrderItem = ({ order }) => {
  console.log({ order });
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === order.products.map((prod) => prod.photoUrl) - 1
        ? 0
        : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0
        ? order.products.map((prod) => prod.photoUrl).length - 1
        : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <div className="orderItem_details">
        <div className="ordered_prod_img">
          <img src={order.products[0].photoUrl[0]} width="90%" />
        </div>
        <div className="order_content">
          <h2>{order.products[0].name}</h2>
          <p>{order.products[0].description}</p>
          <h3>₹ {order.amount}</h3>
          <div className="order_info">
            <div className="order_prop">
              <h3>Ordered date</h3>{" "}
              <span className="discount_tag">{order.orderDate}</span>{" "}
            </div>
            <div className="order_prop">
              <h3>Order ID</h3>
              <span className="discount_tag">{order.orderId}</span>{" "}
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
        </div>
      </div>
    </>
  );
};

export default OrderItem;
