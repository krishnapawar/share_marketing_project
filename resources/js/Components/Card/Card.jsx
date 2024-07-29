import React from "react";
import "./Card.module.css";
const Card = ({className="card text-center card-transparent mt-5",style={ background: "gray" }, children }) => {
  return (
    <div className={className}>
      <div className="card-body" style={style}>
        {children}
      </div>
    </div>
  );
};

export default Card;
