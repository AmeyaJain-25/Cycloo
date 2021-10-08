import React from "react";

import mtbImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";
import wishlist from "../../assets/Wishlist.svg";

import "./Card.scss";

const Card = () => {
  return (
    <>
      <div className="product_card_parent">
        <div className="product_img">
          <img src={mtbImg} alt="MTB" />
        </div>
        <div className="product_desc">
          <p>Geekay Single Speed Mountain Bicycle Hashtag Bike |MTB Bike</p>
        </div>
        <div className="product_price">
          <p>$49.50</p>
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
              </span>{" "}
              Watch
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
