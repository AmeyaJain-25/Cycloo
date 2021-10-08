import React from "react";

import mtbImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";
import AddItem from "../../assets/AddItem.png";
import RemoveItem from "../../assets/RemoveItem.png";
import RemoveFromCart from "../../assets/DeleteFromCart.svg";
import SaveItem from "../../assets/Left.svg";

import "./CartItem.scss";

const CartItem = () => {
  return (
    <>
      <div className="cartItem_parent">
        <div className="item_image">
          <img src={mtbImg} alt="MTB" />
          <div className="cartItem_actions">
            <div className="add_action">
              <button className="add_item_btn">
                <img
                  src={AddItem}
                  alt="Add Item"
                  style={{ width: "14px", marginTop: "-3px" }}
                />
              </button>
            </div>
            <div className="cartValue_action">
              <h3>2</h3>
            </div>
            <div className="remove_action">
              <button className="remove_item_btn">
                <img
                  src={RemoveItem}
                  alt="Add Item"
                  style={{ width: "14px", marginTop: "-3px" }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="item_details">
          <h3>
            $13.95 <span className="discount_tag">10% OFF</span>{" "}
          </h3>
          <p>KROSS Kids Evox 20 T BMX 14, Steel Bike Bicycle</p>
          <div className="ratings" style={{ marginBottom: "10px" }}>
            <span>
              <img src={ratings} alt="" />
            </span>{" "}
          </div>
          <div className="cart_featured_action">
            <button className="remove_from_cart_btn">
              <h6>
                <span>
                  <img
                    src={RemoveFromCart}
                    alt=""
                    style={{ width: "21px", margin: "0px 5px", height: "28px" }}
                  />
                </span>
                Remove
              </h6>
            </button>{" "}
            <button className="add_to_wishlist_btn">
              <h6>
                <span>
                  <img src={SaveItem} alt="" style={{ margin: "0 5px" }} />
                </span>
                Save For Later
              </h6>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
