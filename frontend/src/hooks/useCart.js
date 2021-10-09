const useCart = () => {
  const addItemToCart = (item) => {
    if (isPresentInCart(item.productId)) {
      return "Already present in Cart";
    }
    let currentCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    currentCart = [...currentCart, item];
    localStorage.setItem("cart", JSON.stringify(currentCart));
    console.log("Added to Cart");
    return "Added to Cart";
  };
  const removeItemFromCart = (uid) => {
    let currentCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    currentCart = currentCart.filter((wish) => {
      return wish.productId !== uid;
    });
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };
  const isPresentInCart = (uid) => {
    let currentCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (currentCart.length) {
      currentCart = currentCart.filter((wish) => {
        return wish.productId === uid;
      });
    }
    if (currentCart.length) return true;
    return false;
  };
  return {
    addItemToCart,
    removeItemFromCart,
    isPresentInCart,
  };
};

export default useCart;
