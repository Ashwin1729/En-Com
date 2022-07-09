import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";
import HeaderCartButton from "../../componentsOnLogin/Layout/HeaderCartButton";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const showCart = authCtx.showCart;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Real Meal</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && <HeaderCartButton onClick={() => showCart()} />}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
