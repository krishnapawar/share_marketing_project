import React from 'react';
import style from "./Button.module.css";
import PropTypes from 'prop-types';

const Button = ({ className = "", btn_bg = "blue", type = "button", onClick, name = "Button" }) => {
  return (
    <button 
      className={`${style[btn_bg]} ${className}`} 
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  btn_bg: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
