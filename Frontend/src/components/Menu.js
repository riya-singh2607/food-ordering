import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMenus } from "../actions/menuAction";
import { getRestaurants } from "../actions/restaurantAction";
import FoodItem from "./FoodItem";
import { setRestaurantID } from "../actions/cartAction";

export default function Menu(storeId) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { menus, loading, error } = useSelector((state) => state.menus);

  dispatch(setRestaurantID(id));

  useEffect(() => {
    dispatch(getMenus(id));
    dispatch(getRestaurants());
  }, [dispatch, id, storeId]);

  return (
    <div>
      {loading ? (
        <p>Loading Menus...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : menus && menus.length > 0 ? (
        menus.map((menu) => (
          <div key={menu._id}>
            <h2>{menu.category}</h2>
            <hr />
            {menu.items && menu.items.length > 0 ? (
              <div className="row">
                {menu.items.map((fooditem) => (
                  <FoodItem key={fooditem._id} fooditem={fooditem} />
                ))}
              </div>
            ) : (
              <p>No Fooditems Available</p>
            )}
          </div>
        ))
      ) : (
        <p>No Menus Available</p>
      )}
    </div>
  );
}
