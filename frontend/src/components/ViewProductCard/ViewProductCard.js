import React from "react";
import prodImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";

import "./ViewProductCard.scss";

const ViewProductCard = props => {
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
    <div className="prod_content">
      <div className="prod_image">
        <img src={photoUrl || prodImg} alt="" />
      </div>
      <div className="prod_details">
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
      </div>
      <div className="prod_filters">
        <p style={{ fontWeight: "bold" }}>Select Size</p>
        <div className="prod_size">
          <button>{size}</button>
          {/* <button>M</button>
          <button>L</button> */}
        </div>
        <div className="prod_price">
          <p>
            &#8377;{price || "$9.35"}{" "}
            <span className="discount_tag">10% OFF</span>{" "}
          </p>
        </div>
        <div className="add_to_cart_btn">
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductCard;