import React from "react";
import "./Homescreen.css";
import {useNavigate} from "react-router-dom";

function Homescreen() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dishes");
  };

  return (
    <div className="Homescreen">
      <h2>Welcome to the Recipe App!</h2>
      <button onClick={handleClick}>Click here to see recipes</button>
    </div>
  );
}

export default Homescreen;
