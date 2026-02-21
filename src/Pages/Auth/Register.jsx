import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxios";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    console.log(data.photo[0]);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        reset();

        // update user profile
        const formData = new FormData();
        formData.append("image", profileImg);

        // send the photo url
        const img_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        axios.post(img_Api_Url, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.acknowledged && res.data.insertedId) {
              console.log("User created in the DB:", res.data.insertedId);
            } else if (res.data.message === "user exists") {
              console.log("User already exists in DB");
            } else {
              console.log("Unexpected response:", res.data);
            }
          });

          updateUserProfile(userProfile)
            .then((res) => {
              console.log(res);
              navigate(location?.state || "/");
            })
            .then((error) => {
              console.log(error);
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="space-y-2 text-black">
      <h1 className="font-bold text-4xl">Create an Account</h1>
      <p>
        Register with <span className="text-gray-500">LUNOR</span>
      </p>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full bg-gray-200"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
          {/* photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full bg-gray-200"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
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
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
            className="input w-full bg-gray-200"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have at least one uppercase, at least one lowercase,
              at least one number, and at least one special characters
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-gray-500 border-none mt-4">Register</button>
        </fieldset>
        <p className="text-center">Or</p>
      </form>
      <SocialLogin></SocialLogin>
      <h1>
        Already have an account?{" "}
        <Link
          state={location.state}
          className="underline text-red-400"
          to="/login"
        >
          Login
        </Link>
      </h1>
    </div>
  );
};

export default Register;
