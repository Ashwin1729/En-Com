import React, { useContext } from "react";
import classes from "./StartingPageContent.module.css";
import AuthContext from "../../store/auth-context";
import mealsImage from "../../assets/meals.jpg";
import Image from "next/image";
import Meals from "../../componentsOnLogin/Meals/Meals";
import Cart from "../../componentsOnLogin/Cart/Cart";
import MealsSummary from "../../componentsOnLogin/Meals/MealsSummary";

const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const cartIsShown = authCtx.cartIsShown;
  const hideCart = authCtx.hideCart;

  return (
    <section className={classes.starting}>
      {!isLoggedIn && (
        <React.Fragment>
          <Image
            src={mealsImage}
            alt="A table full of delicious food!"
            style={{
              width: "100%",
              height: "100%",
              transform: "rotateZ(-5deg) translateY(-4rem) translateX(-1rem)",
            }}
          />
          <main>
            <MealsSummary />
          </main>
        </React.Fragment>
      )}
      {isLoggedIn && (
        <React.Fragment>
          {cartIsShown && <Cart onHideCart={hideCart} />}
          <Image
            src={mealsImage}
            alt="A table full of delicious food!"
            style={{
              width: "100%",
              height: "100%",
              transform: "rotateZ(-5deg) translateY(-4rem) translateX(-1rem)",
            }}
          />
          <main>
            <Meals />
          </main>
        </React.Fragment>
      )}
    </section>
  );
};

export default StartingPageContent;
