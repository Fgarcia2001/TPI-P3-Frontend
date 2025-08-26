import MenuBody from "../../Components/Menu/MenuBody/MenuBody";
import FooterMenu from "../../Components/Menu/FooterMenu/FooterMenu";
import HeaderMenu from "../../Components/Menu/HeaderMenu/HeaderMenu";
import { useState } from "react";

const Menu = () => {
  const artInCart = useState(0);

  return (
    <>
      <HeaderMenu />
      <h1 className="mt-5">Ofertas del dia</h1>
      <MenuBody></MenuBody>

      <FooterMenu artInCart={artInCart} />
    </>
  );
};

export default Menu;
