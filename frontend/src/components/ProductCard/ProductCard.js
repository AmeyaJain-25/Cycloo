import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import mtbImg from "../../assets/Products/MTB/_R9HOXIN-removebg-preview 2.png";
import ratings from "../../assets/Ratings.svg";
import wishlistIcon from "../../assets/Wishlist.svg";
import wishlistRedIcon from "../../assets/wishlist_red.png";
import { useAuth } from "../../hooks/useAuth";
import useWishlist from "../../hooks/useWishlist";

import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const history = useHistory();

  const { addItemToWishList, isPresentInWishlist, removeItemFromWishList } =
    useWishlist();
  const { isAuthenticated } = useAuth();

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

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isPresentInWishlist(productId));
  }, []);

  const toggleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      history.push("/login");
    }
    if (!isPresentInWishlist(productId)) {
      addItemToWishList(product);
      setIsWishlisted(true);
    } else {
      removeItemFromWishList(productId);
      setIsWishlisted(false);
    }
  };

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
            </span>
          </div>
          <div className="add_to_wishlist">
            <button onClick={toggleAddToWishlist}>
              {!isWishlisted ? (
                <>
                  <span>
                    <img src={wishlistIcon} alt="wishlistIcon" />
                  </span>
                  Watch
                </>
              ) : (
                <>
                  <span>
                    <img src={wishlistRedIcon} alt="wishlistIcon" />
                  </span>
                  Added
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
