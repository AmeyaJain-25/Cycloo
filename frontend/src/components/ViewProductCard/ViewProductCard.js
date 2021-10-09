import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import prodImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
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

  const { addItemToCart, isPresentInCart } = useCart();
  const history = useHistory();

  const [isPresent, setIsPresent] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsPresent(isPresentInCart(productId));
  }, []);

  const toggleAddToCart = () => {
    if (!isAuthenticated) {
      return history.push("/login");
    }
    if (!isPresent) {
      addItemToCart({ ...props.location.state, count: 1 });
    }
    setIsPresent(isPresentInCart(productId));
  };

  return (
    <>
      <Navbar />
      <div className="prod_content">
        <div className="prod_image">
          <img src={photoUrl[0] || prodImg} alt="" />
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
          <p style={{ fontWeight: "bold" }}>Size</p>
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
            <span className="discount_tag">{type}</span>{" "}
            <div className="ratings">
              <span>
                <img src={ratings} alt="" />
              </span>{" "}
            </div>
          </div>
          <div className="prod_filters">
            <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>Size</p>
            <div className="prod_size">
              <button>{size}</button>
            </div>
            <div className="prod_price">
              <p>
                &#8377;{price || "$9.35"}{" "}
                <span className="discount_tag">10% OFF</span>{" "}
              </p>
            </div>
            <div className="add_to_cart_btn">
              <button onClick={toggleAddToCart}>
                {isPresent ? "Added to the Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProductCard;
