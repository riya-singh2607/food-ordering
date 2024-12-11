import Restaurant from "./Restaurant";
import {
  getRestaurants,
  sortByRatings,
  sortByReviews,
  toggleVegOnly
} from "../actions/restaurantAction";
import Loader from "../components/layout/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CountRestaurants from "./CountRestaurants";
import { useParams } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const {
    loading: restaurantsLoading,
    error: restaurantsError,
    restaurants,
    showVegOnly
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (restaurantsError) {
      return alert.error(restaurantsError);
    }
    dispatch(getRestaurants(keyword));
  }, [dispatch, restaurantsError, keyword]);

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  };

  const handleSortByReviews = () => {
    dispatch(sortByReviews());
  };

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  };

  return (
    <>
      <CountRestaurants />
      {restaurantsLoading ? (
        <Loader />
      ) : restaurantsError ? (
        <Message variant="danger">{restaurantsError}</Message>
      ) : (
        <>
          <section>  
            <div className="sort">
              <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
                {showVegOnly ? "Show All" : "Pure Veg"}
              </button>

              <button className="sort_rate p-3" onClick={handleSortByRatings}>
                Sort By Ratings
              </button>

              <button className="sort_rev p-3" onClick={handleSortByReviews}>
                Sort By Reviews
              </button>
            </div>

            <div className="row mt-4">
              {restaurants && restaurants.restaurants ? (
                restaurants.restaurants.map((restaurant) =>
                  !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                    <Restaurant key={restaurants._id} restaurant={restaurant} />
                  ) : null
                )
              ) : (
                <Message variant="info">No Restaurant Found.</Message>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
