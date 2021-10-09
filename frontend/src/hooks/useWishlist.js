const useWishlist = () => {
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
  };
};

export default useWishlist;
