import React from "react";
import { useHistory } from "react-router-dom";
import mtbImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";
import wishlist from "../../assets/Wishlist.svg";

import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const history = useHistory();
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
  } = product;
  return (
    <div
      className="card_parent"
      onClick={() => {
        history.push({
          pathname: `/product/${productId}`,
          state: {
            brakeType,
            description,
            gear,
            name,
            photoUrl,
            price,
            productId,
            size,
            type,
          },
        });
      }}
    >
      <div className="product_card_parent">
        <div className="product_img">
          <img src={photoUrl[0]} alt="MTB" />
        </div>
        <div className="product_desc">
          <p>{name}</p>
        </div>
        <div className="product_price">
          <p>&#8377; {price}</p>
        </div>
        <div className="product_actions">
          <div className="ratings">
            <span>
              <img src={ratings} alt="" />
            </span>{" "}
          </div>
          <div className="add_to_wishlist">
            <button>
              <span>
                <img src={wishlist} alt="" />
              </span>
              Watch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
