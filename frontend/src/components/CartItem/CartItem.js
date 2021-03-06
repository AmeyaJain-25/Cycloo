import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import mtbImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import RemoveFromCart from "../../assets/DeleteFromCart.svg";
import SaveItem from "../../assets/Left.svg";
import "./CartItem.scss";
import useCart from "../../hooks/useCart";
import { Col, Row } from "reactstrap";
import StarRating from "../Rating/StarRating";

const CartItem = ({ cartObj, setItems, isOpen }) => {
  const { photoUrl, price, name, rating, discount, count } = cartObj;
  const { cartItems, setCartItems, removeItemFromCart } = useCart();

  const [productCount, setProductCount] = useState(count);

  useEffect(() => {
    let arr = cartItems;
    arr.find((obj, idx) => {
      if (obj.productId === cartObj.productId) {
        obj.count = productCount;
        return true;
      }
      return false;
    });
    localStorage.setItem("cart", JSON.stringify(arr));
    setCartItems(arr);
    setItems(arr);
  }, [productCount]);

  const removeCartItem = () => {
    removeItemFromCart(cartObj.productId);
    setItems(cartItems);
    toast.warning(`${cartObj.name} removed from cart`);
  };

  return (
    <Row className="cartItem_parent">
      <Col md={6} className="item_image">
        <img src={photoUrl[0] || mtbImg} alt="MTB" />
        {/* {!isOpen && (
          <div className="cartItem_actions">
            <button
              className="add_item_btn"
              onClick={() => setProductCount(productCount + 1)}
            >
              +
            </button>
            <h3 className="cartValue_action">{productCount}</h3>
            <button
              className="remove_item_btn"
              onClick={() =>
                productCount > 1 ? setProductCount(productCount - 1) : ""
              }
            >
              -
            </button>
          </div>
        )} */}
      </Col>
      <Col md={6} className="item_details">
        <div style={{ padding: "10px 5px" }}>
          <h3>
            &#8377; {price || 12999}
            <span className="discount_tag">{discount || 10}% OFF</span>
          </h3>
          <p>{name}</p>
        </div>

        <div
          className="ratings"
          style={{
            margin: "0.4em",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <StarRating ratingCount={rating} />
          <span style={{ fontSize: "18px", padding: "0px 0.4em" }}>
            {rating}
          </span>
        </div>
        <div className="cart_featured_action">
          <button className="remove_from_cart_btn" onClick={removeCartItem}>
            <h6>
              <span>
                <img
                  src={RemoveFromCart}
                  alt=""
                  style={{ width: "21px", margin: "0px 5px" }}
                />
              </span>
              Remove
            </h6>
          </button>{" "}
        </div>
      </Col>
    </Row>
  );
};

export default CartItem;
