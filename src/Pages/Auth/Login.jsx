import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import userAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = userAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="space-y-2 text-black">
      <h1 className="font-bold text-4xl">Welcome Back</h1>
      <p>
        Login with <span className="text-gray-500">LUNOR</span>
      </p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="input w-full bg-gray-200"
            placeholder="Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password */}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input w-full bg-gray-200"
            placeholder="Password"
          />

          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 character or longer
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn w-full bg-gray-500 border-none mt-4">
            Login
          </button>
        </fieldset>
        <p className="text-center">Or</p>
      </form>
      <SocialLogin></SocialLogin>
      <h1>
        Don't have an account?{" "}
        <Link
          state={location.state}
          className="underline text-red-400"
          to="/register"
        >
          Register
        </Link>{" "}
      </h1>
    </div>
  );
};

export default Login;
