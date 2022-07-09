import React, { useContext } from "react";
import classes from "./MealsSummary.module.css";
import AuthContext from "../../store/auth-context";

const MealsSummary = () => {
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.isLoggedIn;

  return (
    <section className={classes.summary}>
      {loggedIn && (
        <div>
          <h2>Delicious Food, Delivered To You</h2>
          <p>
            Choose your favorite meal from our broad selection of available
            meals and enjoy a delicious lunch or dinner at home.
          </p>
          <p>
            All our meals are cooked with high-quality ingredients, just-in-time
            and of course by experienced chefs!
          </p>
        </div>
      )}
      {!loggedIn && (
        <div>
          <h2>Welcome to the REAL-MEAL</h2>
          <p>
            Real-Meal is one the leading and largest online food providing
            community, providing the best of best, healthy, hygenic food made by
            our handpicked and deeply examined, experienced chefs.
          </p>
          <p>
            You are hungry and we will be there for you anytime, anywhere.
            Whatever you wish to eat, I promise my team had made it in the past
            in the best way possible and will make it for you too.
          </p>
          <p>
            Transportation and Parcel services are also provided by us so that
            we can provide what you want at you doorsteps as soon as possible in
            the shortest mean time!
          </p>
          <h3>
            Now give us a chance to serve you and SIGN UP with us. If you are
            already with us then please LOGIN.
          </h3>
        </div>
      )}
    </section>
  );
};

export default MealsSummary;
