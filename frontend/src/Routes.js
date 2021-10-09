import { BrowserRouter, Switch, Route } from "react-router-dom";
import { app } from "./utils/firebaseConfig";
import { AuthContextProvider } from "./hooks/useAuth";
import Login from "./pages/loginpage/Login";
import HomePage from "./pages/homepage/HomePage";
import ViewProductCard from "./components/ViewProductCard/ViewProductCard";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/product/:productId" component={ViewProductCard} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
