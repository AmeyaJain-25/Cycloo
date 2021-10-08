import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/loginpage/Login";
import HomePage from "./pages/homepage/HomePage";
import { app } from "./utils/firebaseConfig";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
