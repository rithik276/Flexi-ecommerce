import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import FavoriteList from "./FavoriteList";
import { fetchFavorites } from "./favoriteSlice";
import { getCart } from "../Cart/cartSlice";

const Favorite = () => {
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.favorite)
  useEffect(()=>{
    dispatch(fetchFavorites());
    dispatch(getCart());
  },[dispatch])

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex-grow  bg-bg">
        <div className="mx-24">
          <h1 className="text-2xl font-semibold text-white">Favorite</h1>
          <div className="mt-6">
            {favorites.length > 0 ? (
              favorites.map((item, i) => <FavoriteList item={item} key={i} />)
            ) : (
              <div className="flex min-h-[30dvh] items-center justify-center text-3xl">
                <h1 className="text-white">No Favorites</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default Favorite;
