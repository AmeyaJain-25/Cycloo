import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/loginpage/Login";
import HomePage from "./pages/homepage/HomePage";
import { app } from "./utils/firebaseConfig";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
