import { createContext, useContext, useEffect, useState } from "react";

// auth context & custom hook
export const WishListContext = createContext();

// readymade provider to be called at parent level(Routes.js)
export const WishListContextProvider = (props) => {
  const [wishItems, setWishItems] = useState([]);
  useEffect(() => {
    setWishItems(
      localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist"))
        : []
    );
  }, []);
  return (
    <WishListContext.Provider value={{ wishItems, setWishItems }} {...props} />
  );
};

const useWishlist = () => {
  const { wishItems, setWishItems } = useContext(WishListContext);
  const addItemToWishList = (item) => {
    if (isPresentInWishlist(item.productId)) {
      return "Already present in wishlist";
    }
    let currentWishList = localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [];
    currentWishList = [...currentWishList, item];
    localStorage.setItem("wishlist", JSON.stringify(currentWishList));
    console.log("Added to wishlist");
    setWishItems(currentWishList);
    return "Added to wishlist";
  };
  const removeItemFromWishList = (uid) => {
    let currentWishList = localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [];
    currentWishList = currentWishList.filter((wish) => {
      return wish.productId !== uid;
    });
    localStorage.setItem("wishlist", JSON.stringify(currentWishList));
    setWishItems(currentWishList);
  };
  const isPresentInWishlist = (uid) => {
    let currentWishList = localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [];
    if (currentWishList.length) {
      currentWishList = currentWishList.filter((wish) => {
        return wish.productId === uid;
      });
    }
    if (currentWishList.length) return true;
    return false;
  };
  return {
    addItemToWishList,
    removeItemFromWishList,
    isPresentInWishlist,
    wishItems,
  };
};

export default useWishlist;
