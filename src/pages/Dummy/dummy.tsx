import React, { useState } from "react";
import Card from "../../components/Card/card";

const ThreeDotMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <></>
  );
};

export default ThreeDotMenu;
