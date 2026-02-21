import React from "react";
import img from "../assets/error-404.png";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col items-center mt-20 space-y-5">
      <img className="w-150 " src={img} alt="" />
      <Link to="/">
        <button className="bg-[#CAEB66] p-3 rounded">Back To Home</button>
      </Link>
    </div>
  );
};

export default Error;
