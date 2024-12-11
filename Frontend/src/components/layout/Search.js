import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    function searchHandler(e) {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/eats/stores/search/${keyword}`);
        } else {
            navigate("/");
        }
    }
    
    return (
        <form onSubmit={searchHandler}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="search_field"
              placeholder="Enter Your Favourite Resturant.."
              onChange={(e) => setKeyword(e.target.value)}
              autoComplete="off"
            />

            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </form>
    )
}