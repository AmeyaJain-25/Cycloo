import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import AnimatedNumber from "react-animated-number";
import { Col, Row } from "reactstrap";
import prodImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import CalorieCalc from "./CalorieCalc/CalorieCalc";
import calorieImg from "../../assets/calories-icon-0.jpg";
import "./ViewProductCard.scss";
import StarRating from "../Rating/StarRating";

const ViewProductCard = props => {
  const [weight, setWeight] = useState();
  const [duration, setDuration] = useState();
  const [calBurnt, setCalBurnt] = useState(0);

  const {
    productId,
    description,
    name,
    photoUrl,
    price,
    size,
    type,
    metValue,
    rating,
  } = props.location.state;

  console.log(props.location.state);
  //met*wt*time*3.5/200

  const calculateCal = () => {
    if (!weight || !duration) {
      return false;
    }
    let calBurntVal = (metValue * weight * duration * 3.5) / 200;

    setCalBurnt(calBurntVal);
  };

  const { addItemToCart, isPresentInCart } = useCart();
  const history = useHistory();

  const [isPresent, setIsPresent] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsPresent(isPresentInCart(productId));
  }, []);

  const toggleAddToCart = () => {
    if (!isPresent) {
      addItemToCart({ ...props.location.state, count: 1 });
      toast.success(`Product added to cart`);
    } else {
      toast.warning(`Product already there in cart`);
    }

    setIsPresent(isPresentInCart(productId));
  };

  return (
    <>
      <Navbar />
      <div className="prodDiv">
        <Row className="prod_content">
          <Col lg={6} className="prod_image">
            <img src={photoUrl[0] || prodImg} alt="" />
          </Col>
          <Col lg={6} className="rightCol">
            <div style={{ display: "flex" }}>
              <Col className="prod_details">
                <p>
                  <strong>{name || "Product Name"}</strong>
                </p>
                <p>
                  {description ||
                    "Geekay Single Speed Mountain Bicycle Hashtag Bike |MTB Bike"}
                </p>
                <span className="discount_tag">{type}</span>{" "}
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
                <div>
                  <CalorieCalc
                    calculateCal={calculateCal}
                    setWeight={setWeight}
                    setDuration={setDuration}
                    weight={weight}
                    duration={duration}
                  />
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
                    &#8377;{price || "12499"}
                    <span className="discount_tag">10% OFF</span>{" "}
                  </p>
                </div>
                <div className="addToCartDiv">
                  <div className="add_to_cart_btn">
                    <button onClick={toggleAddToCart}>Add to cart</button>
                  </div>
                </div>
                <div className="calorie_count_styles">
                  <img src={calorieImg} alt="" />
                  <div>
                    <AnimatedNumber
                      value={calBurnt}
                      style={{
                        fontSize: 50,
                      }}
                      formatValue={n => n.toFixed(0)}
                      frameStyle={percentage =>
                        percentage > 20 && percentage < 80
                          ? { opacity: 0.5 }
                          : {}
                      }
                    />
                    <span>cal</span>
                  </div>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ViewProductCard;
