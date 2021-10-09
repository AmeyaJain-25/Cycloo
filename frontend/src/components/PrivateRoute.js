import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ component: C, ...props }) => {
  const { isAuthenticated, loadingAuth } = useAuth();
  return (
    <Route
      {...props}
      render={routeProps =>
        loadingAuth ? (
          <p>Loading</p>
        ) : isAuthenticated ? (
          <C {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
