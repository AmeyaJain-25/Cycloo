import { createContext, useContext, useEffect, useState } from "react";

// auth context & custom hook
export const CartContext = createContext();

// readymade provider to be called at parent level(Routes.js)
export const CartContextProvider = (props) => {
  const [cartCount, setCartCount] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartCount(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).length
        : 0
    );
    setCartItems(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  }, []);
  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount, cartItems, setCartItems }}
      {...props}
    />
  );
};

const useCart = () => {
  const { cartCount, setCartCount, cartItems, setCartItems } =
    useContext(CartContext);

  const addItemToCart = (item) => {
    if (isPresentInCart(item.productId)) {
      return "Already present in Cart";
    }
    let currentCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    currentCart = [...currentCart, item];
    localStorage.setItem("cart", JSON.stringify(currentCart));
    setCartCount(currentCart.length);
    setCartItems(currentCart);
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
    setCartCount(currentCart.length);
    setCartItems(currentCart);
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
  const emptyCart = () => {
    localStorage.removeItem("cart");
    setCartCount(0);
    setCartItems([]);
  };
  return {
    addItemToCart,
    removeItemFromCart,
    isPresentInCart,
    cartCount,
    cartItems,
    setCartItems,
    emptyCart,
  };
};

export default useCart;
