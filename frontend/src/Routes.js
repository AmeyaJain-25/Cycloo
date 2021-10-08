import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/loginpage/Login";
import HomePage from "./pages/homepage/HomePage";
import { app } from "./utils/firebaseConfig";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContextProvider } from "./hooks/useAuth";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
