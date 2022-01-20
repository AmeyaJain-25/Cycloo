import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignInRoute = ({ component: C, ...props }) => {
  const { isAuthenticated, loadingAuth } = useAuth();
  console.log("AUTH", isAuthenticated);
  return (
    <Route
      {...props}
      render={routeProps =>
        loadingAuth ? (
          <p>Loading</p>
        ) : !isAuthenticated ? (
          <C {...routeProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default SignInRoute;
