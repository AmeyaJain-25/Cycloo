import { auth } from "../utils/firebaseConfig";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: C, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) =>
        !auth.currentUser ? <Redirect to="/login" /> : <C {...routeProps} />
      }
    />
  );
};

export default PrivateRoute;
