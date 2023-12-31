import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { filterData } from "./Constants";
import Shimmer from "./Shimmer";
import Nav from "./Navbar";

function Restaurant() {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    
    );

    const json = await data.json();
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const data = filterData(searchText, restaurants);
      setFilteredRestaurants(data);
      setErrorMessage("");
      if (data.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchText}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };


  if (!allRestaurants) return null;

  return (
    <>
      <Nav />
      <div className="search-container p-3 text-center w-full">
        <input
          data-testid="search-input"
          type="text"
          className="focus:bg-blue-100 p-2 w-1/5 m-2 border-solid border-2 border-purple-400 rounded-full"
          placeholder="Search Restaurants"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            searchData(e.target.value, allRestaurants);
          }}
        />
        <button
          data-testid="search-btn"
          className="p-2 m-2 bg-purple-400 hover:bg-gray-100 hover:text-black text-white rounded-md"
          onClick={() => {
           
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                onclick="scrollWin()"
                to={"/restaurant/" + restaurant.data.id}
                key={restaurant.data.id}
              >
                <RestaurantCard {...restaurant.data} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Restaurant;
