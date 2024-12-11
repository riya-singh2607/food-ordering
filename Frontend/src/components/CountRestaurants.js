import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../actions/restaurantAction";

export default function CountRestaurants() {
  const dispatch = useDispatch();

  const {
    count,
    pureVegRestaurantsCount,
    showVegOnly,
    loading,
    error
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch, showVegOnly]);

  return (
    <div>
      {loading ? (
        <p>Loading Restaurant Count...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p className="NumOfRestro">
          {showVegOnly ? pureVegRestaurantsCount : count}
          <span className="Restro">
            {showVegOnly
              ? pureVegRestaurantsCount === 1
                ? " Restaurant Found"
                : " Restaurants Found"
              : count === 1
              ? " Restaurant Found"
              : " Restaurants Found"}
          </span>
          <hr/>
        </p>
      )}
    </div>
  );
}
