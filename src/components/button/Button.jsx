import React from "react";

const Button = ({ type, variant, className, onClick }) => {
  return (
    <button
      type={type ? type : "button"}
      variant={variant}
      className={className ? `btn-component ${className}` : "btn-component"}
      onClick={onClick}
    ></button>
  );
};

export default Button;
