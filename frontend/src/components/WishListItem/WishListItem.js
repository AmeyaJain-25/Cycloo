import mtbImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";
import RemoveFromCart from "../../assets/DeleteFromCart.svg";
import SaveItem from "../../assets/Left.svg";
import "./WishListItem.scss";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const WishListItem = ({ wishlistObj }) => {
  const { photoUrl, price, name, rating, discount, count } = wishlistObj;

  const { addItemToCart } = useCart();
  const { removeItemFromWishList } = useWishlist();

  const addToCart = () => {
    wishlistObj = { ...wishlistObj, count: 1 };
    addItemToCart(wishlistObj);
  };

  return (
    <div className="cartItem_parent">
      <div className="item_image">
        <img src={photoUrl[0] || mtbImg} alt="MTB" />
      </div>
      <div className="item_details">
        <h3>
          &#8377; {price || 12999}
          <span className="discount_tag">{discount || 10}% OFF</span>
        </h3>
        <p>{name}</p>
        <div className="ratings" style={{ marginBottom: "10px" }}>
          <span>
            <img src={ratings} alt="" />
          </span>
        </div>
        <div className="cart_featured_action">
          <button
            className="remove_from_cart_btn"
            onClick={() => {
              removeItemFromWishList(wishlistObj.productId);
            }}
          >
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
      </div>
    </div>
  );
};

export default WishListItem;
