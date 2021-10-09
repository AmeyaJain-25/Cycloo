import { BrowserRouter, Switch, Route } from "react-router-dom";
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
            <Switch>
              <Route exact path="/" component={HomePage} />
              <SignInRoute exact path="/login" component={Login} />
              <PrivateRoute exact path="/orders" component={Orders} />
              <PrivateRoute exact path="/cart" component={CartPage} />
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
