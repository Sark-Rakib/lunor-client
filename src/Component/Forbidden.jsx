import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router";
import forbiddenAnimation from "../assets/forbidden403/animations/12345.json";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-xl text-center">
        <div className="w-80 md:w-96 mx-auto">
          <Lottie animationData={forbiddenAnimation} loop />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mt-4">
          403 - Access Denied
        </h1>

        <p className="text-base-content/70 mt-4">
          Sorry! You don't have permission to access this page. If you think
          this is a mistake, please contact the administrator.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>

          <Link to="/dashboard" className="btn btn-outline">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
