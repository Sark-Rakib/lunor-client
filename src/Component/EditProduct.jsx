import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";

const sizesList = ["S", "M", "L", "XL", "2XL"];

const EditProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [selectedSizes, setSelectedSizes] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  // 🔥 Fetch data
  const { data: tuition, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  // ✅ set sizes from DB
  useEffect(() => {
    if (tuition?.sizes) {
      setSelectedSizes(tuition.sizes);
    }
  }, [tuition]);

  // ✅ set other form data
  useEffect(() => {
    if (tuition) {
      reset({
        name: tuition.name || "",
        category: tuition.category || "",
        ability: tuition.ability || "",
        price: tuition.price || "",
        discountPrice: tuition.discountPrice || "",
        description: tuition.description || "",
        image: tuition.image || "",
      });
    }
  }, [tuition, reset]);

  // 🔥 toggle size
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // 🔥 submit
  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        sizes: selectedSizes,
      };

      const res = await axiosSecure.put(`/tuitions/${id}`, updatedData);

      if (res.data.success) {
        Swal.fire("Updated!", "Product updated successfully.", "success");
        navigate(`/products-details/${id}`);
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
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Name</label>
            <input
              {...register("name")}
              className="input w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Category</label>
            <input
              {...register("category")}
              className="input w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Ability */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Ability</label>
            <input
              {...register("ability")}
              className="input w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              {...register("price")}
              className="input w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">
              Discount Price
            </label>
            <input
              type="number"
              {...register("discountPrice")}
              className="input w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Available Sizes
            </label>

            <div className="flex flex-wrap gap-3">
              {sizesList.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-10 h-10 rounded-2xl border-2 font-medium transition-all ${
                    selectedSizes.includes(size)
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              className="textarea w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition-all"
          >
            Update Product Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
