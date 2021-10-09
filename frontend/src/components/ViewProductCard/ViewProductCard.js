import React from "react";
import { Col, Row } from "reactstrap";
import prodImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";
import Navbar from "../../components/Navbar/Navbar";
import CalorieCalc from "./CalorieCalc/CalorieCalc";
import "./ViewProductCard.scss";

const ViewProductCard = (props) => {
  const {
    brakeType,
    description,
    gear,
    name,
    photoUrl,
    price,
    productId,
    size,
    type,
  } = props.location.state;

  console.log(props.location.state);

  return (
    <>
      <Navbar />
      <div className="prodDiv">
        <Row className="prod_content">
          <Col className="prod_image">
            <img src={photoUrl[0] || prodImg} alt="" />
          </Col>
          <Col className="rightCol">
            <Col className="prod_details">
              <p>
                <strong>{name || "Product Name"}</strong>
              </p>
              <p>
                {description ||
                  "Geekay Single Speed Mountain Bicycle Hashtag Bike |MTB Bike"}
              </p>
              <span className="discount_tag">{type}</span>{" "}
              <div className="ratings">
                <span>
                  <img src={ratings} alt="" />
                </span>{" "}
              </div>
              <div>
                <CalorieCalc />
              </div>
            </Col>
            <Col className="prod_filters">
              <div className="prod_size">
                <p style={{ fontWeight: "bold" }}>Size</p>
                <div>
                  <button>{size}</button>
                </div>
              </div>
              <div className="prod_price">
                <p>
                  &#8377;{price || "$9.35"}{" "}
                  <span className="discount_tag">10% OFF</span>{" "}
                </p>
                <span className="discount_tag">{type}</span>{" "}
                <div className="ratings">
                  <span>
                    <img src={ratings} alt="" />
                  </span>{" "}
                </div>
              </div>
              <div className="addToCartDiv">
                <div className="add_to_cart_btn">
                  <button>Add to cart</button>
                </div>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ViewProductCard;
