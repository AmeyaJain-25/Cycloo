import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./hooks/useAuth";
import { CartContextProvider } from "./hooks/useCart";
import { WishListContextProvider } from "./hooks/useWishlist";
import SignInRoute from "./components/SignInRoute";
import PrivateRoute from "./components/PrivateRoute";
import React, { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const Login = React.lazy(() => import("./pages/loginpage/Login"));
const HomePage = React.lazy(() => import("./pages/homepage/HomePage"));
const Orders = React.lazy(() => import("./components/Orders/Orders"));
const CartPage = React.lazy(() => import("./pages/cartpage/CartPage"));
const WishListPage = React.lazy(() => import("./pages/wishlist/WishListPage"));
const ViewProductCard = React.lazy(() =>
  import("./components/ViewProductCard/ViewProductCard")
);

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Switch>
                <Suspense fallback={<Loader />}>
                  <Route exact path="/" component={HomePage} />
                  <SignInRoute exact path="/login" component={Login} />
                  <PrivateRoute exact path="/orders" component={Orders} />
                  <Route exact path="/cart" component={CartPage} />
                  <Route
                    path="/product/:productId"
                    component={ViewProductCard}
                  />
                  <Route path="/wishlist" component={WishListPage} />
                </Suspense>
              </Switch>
            </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
