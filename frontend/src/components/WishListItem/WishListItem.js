import { toast } from "react-toastify";
import mtbImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";
import RemoveFromCart from "../../assets/DeleteFromCart.svg";
import SaveItem from "../../assets/Left.svg";
import "./WishListItem.scss";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import StarRating from "../Rating/StarRating";
import { Col, Row } from "reactstrap";

const WishListItem = ({ wishlistObj }) => {
  const { photoUrl, price, name, rating, discount } = wishlistObj;

  const { addItemToCart } = useCart();
  const { removeItemFromWishList } = useWishlist();

  const addToCart = () => {
    wishlistObj = { ...wishlistObj, count: 1 };
    addItemToCart(wishlistObj);
    toast.success(`${wishlistObj.name} added to cart`);
  };

  return (
    <Row className="cartItem_parent">
      <Col md={6} className="item_image">
        <img src={photoUrl[0] || mtbImg} alt="MTB" />
      </Col>
      <Col md={6} className="item_details">
        <div style={{ padding: "10px 5px" }}>
          <h3>
            &#8377; {price || 12999}
            <span className="discount_tag">{discount || 10}% OFF</span>
          </h3>
        </div>
        <p>{name}</p>
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
          <button
            className="remove_from_cart_btn"
            onClick={() => {
              removeItemFromWishList(wishlistObj.productId);
              toast.warning(`${wishlistObj.name} removed to cart`);
            }}
          >
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
          </button>
          <button className="add_to_wishlist_btn" onClick={addToCart}>
            <h6>
              <span>
                <img src={SaveItem} alt="" style={{ margin: "0 5px" }} />
              </span>
              Add to Cart
            </h6>
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default WishListItem;
