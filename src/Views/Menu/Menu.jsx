import MenuBody from "../../Components/Menu/MenuBody/MenuBody";
import FooterMenu from "../../Components/Menu/FooterMenu/FooterMenu";
import HeaderMenu from "../../Components/Menu/HeaderMenu/HeaderMenu";
import { useState } from "react";
import Favorites from "../../Components/Menu/Favorites/Favorites";

const Menu = () => {
  const artInCart = useState(1);
  const [viewFavorite, setViewFavorite] = useState(false);
  const HandleFavoritesView = (value) => {
    setViewFavorite(value);
  };
  return (
    <>
      <HeaderMenu />

      {viewFavorite ? <Favorites /> : <MenuBody></MenuBody>}

      <FooterMenu
        artInCart={artInCart}
        HandleFavoritesView={HandleFavoritesView}
      />
    </>
  );
};

export default Menu;
