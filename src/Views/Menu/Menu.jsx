import MenuBody from "../../Components/Menu/MenuBody/MenuBody";
import FooterMenu from "../../Components/Menu/FooterMenu/FooterMenu";
import HeaderMenu from "../../Components/Menu/HeaderMenu/HeaderMenu";
import { useState } from "react";

const Menu = () => {
  const artInCart = useState(1);

  return (
    <>
      <HeaderMenu />

      <MenuBody></MenuBody>

      <FooterMenu artInCart={artInCart} />
    </>
  );
};

export default Menu;
