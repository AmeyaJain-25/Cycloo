import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import WishListItem from "../../components/WishListItem/WishListItem";
import useWishlist from "../../hooks/useWishlist";
import "./wishlistpage.scss";

const WishListPage = () => {
  const { wishItems } = useWishlist();

  return (
    <>
      <Navbar />
      <div className="wishlistpage">
        <h3 style={{ padding: "0.6em" }}>My Wishlist</h3>
        {wishItems.length ? (
          wishItems.map((wishlistObj) => (
            <WishListItem
              wishlistObj={wishlistObj}
              key={wishlistObj.productId}
            />
          ))
        ) : (
          <p className="no-products">No Wishlist Items found!</p>
        )}
      </div>
    </>
  );
};

export default WishListPage;
