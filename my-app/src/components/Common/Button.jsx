import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import './ButtonStyle.css'
const Button = ({ heading, handler }) => {
  return (
    <div>
      <button  className="btnStyle px-3 py-3 bg-black   rounded-lg text-white font-semibold  relative overflow-hidden md:w-60 w-full" onClick={handler}>
        {heading}
        <div className="arrow"><IoIosArrowRoundForward /></div>
        </button>
    </div>
  );
};

export default Button;