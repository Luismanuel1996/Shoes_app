import React from "react";
import ShoesCase from "../images/ShoesCase.jpg";

function app() {
  return (
    <div>
      <h1 className="HomePage">My Shoe Collection</h1>
      <img className="HomePagePhoto" alt="" src={ShoesCase} />
    </div>
  );
}

export default app;
