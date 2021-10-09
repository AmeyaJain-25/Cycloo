import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { app } from "./utils/firebaseConfig";
import { AuthContextProvider } from "./hooks/useAuth";
import Login from "./pages/loginpage/Login";
import HomePage from "./pages/homepage/HomePage";
import ViewProductCard from "./components/ViewProductCard/ViewProductCard";
import SignInRoute from "./components/SignInRoute";
import PrivateRoute from "./components/PrivateRoute";
import Orders from "./components/Orders/Orders";
import { CartContextProvider } from "./hooks/useCart";
import CartPage from "./pages/cartpage/CartPage";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <CartContextProvider>
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
              <Route exact path="/" component={HomePage} />
              <SignInRoute exact path="/login" component={Login} />
              <PrivateRoute exact path="/orders" component={Orders} />
              <Route exact path="/cart" component={CartPage} />
              <Route path="/product/:productId" component={ViewProductCard} />
              <Route path="/wishlist" component={ViewProductCard} />
            </Switch>
          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
