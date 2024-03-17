/* eslint-disable react/no-unescaped-entities */
import React from "react";

const App = () => {
  return (
    <>
      <div className="home">
        <div className="nav">
          <h5>Home</h5>
          <h5>Popular</h5>
          <h5>Sale</h5>
          <h5>Cart</h5>
          <h5>Login</h5>
        </div>

        <div className="content">
          <h1>Flexi's best Collection</h1>
          <p>
            Visit us here to get the best collection of FLEXI and buy your
            favourite shoes
          </p>
          <button>START SHOPPING</button>
        </div>
      </div>
    </>
  );
};

export default App;
