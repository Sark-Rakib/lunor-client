import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";

const EditProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  // fetch tuition/project data
  const { data: tuition, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  // auto-fill form once tuition data is fetched
  useEffect(() => {
    if (tuition) {
      reset({
        name: tuition.name || "",
        category: tuition.category || "",
        ability: tuition.ability || "",
        price: tuition.price || "",
        discountPrice: tuition.discountPrice || "",
        size: tuition.size || "",
        description: tuition.description || "",
        image: tuition.image || "",
      });
    }
  }, [tuition, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.put(`/tuitions/${id}`, data);
      if (res.data.success) {
        Swal.fire("Updated!", "Tuition updated successfully.", "success");
        navigate(`/tuition-details/${id}`); // back to products page
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Update failed.", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-lg bg-pink-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Prod<span className="text-amber-500">uct Details</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">Name</label>
            <input
              {...register("name")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              {...register("category")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Category"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Ability
            </label>
            <input
              {...register("ability")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Ability"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              {...register("price")}
              type="number"
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Price"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Discount Price
            </label>
            <input
              {...register("discountPrice")}
              type="number"
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Discount Price"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">Size</label>
            <input
              {...register("size")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Size"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              className="textarea w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Description"
            />
          </div>

          <div className="flex flex-col">
            <label className="label font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              {...register("image")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Image URL"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-semibold py-2 rounded-md hover:bg-amber-600 transition-all"
          >
            Update Products Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
