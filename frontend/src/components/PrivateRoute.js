import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
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
          <>
            {toast.error("Not Authenticated!")}
            <Redirect to="/login" />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
