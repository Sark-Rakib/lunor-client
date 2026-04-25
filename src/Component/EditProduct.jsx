import React, { useEffect, useState } from "react";
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

  const [selectedSizes, setSelectedSizes] = useState([]);

  const { register, handleSubmit, reset, watch } = useForm();

  // watch category
  const watchedCategory = watch("category");

  // Fetch data
  const { data: tuition, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  // final category (watch + fallback)
  const selectedCategory = watchedCategory || tuition?.category;

  // ynamic sizes
  const sizesList =
    selectedCategory === "Pant"
      ? ["28", "30", "32", "34", "36"]
      : ["S", "M", "L", "XL", "2XL"];

  // set sizes from DB
  useEffect(() => {
    if (tuition?.sizes) {
      setSelectedSizes(tuition.sizes);
    }
  }, [tuition]);

  //  set form values
  useEffect(() => {
    if (tuition) {
      reset({
        name: tuition.name || "",
        category: tuition.category || "",
        ability: tuition.ability || "",
        price: tuition.price || "",
        discountPrice: tuition.discountPrice || "",
        description: tuition.description || "",
      });
    }
  }, [tuition, reset]);

  // reset sizes when category changes
  useEffect(() => {
    setSelectedSizes([]);
  }, [watchedCategory]);

  //  toggle size
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  //  submit
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
          <div>
            <label className="font-medium">Name</label>
            <input {...register("name")} className="input w-full border p-2" />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">Category</label>
            <select
              {...register("category")}
              className="input w-full border p-2"
            >
              <option value="">Select Category</option>
              <option value="Formal Shirt">Formal Shirt</option>
              <option value="Casual Shirt">Casual Shirt</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Panjabi">Panjabi</option>
            </select>
          </div>

          {/* Sizes */}
          <div>
            <label className="font-semibold mb-2 block">Available Sizes</label>
            <div className="flex flex-wrap gap-3">
              {sizesList.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-10 h-10 rounded border-2 ${
                    selectedSizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Ability */}
          <div>
            <label className="font-medium">Ability</label>
            <input
              {...register("ability")}
              className="input w-full border p-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">Price</label>
            <input
              type="number"
              {...register("price")}
              className="input w-full border p-2"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="font-medium">Discount Price</label>
            <input
              type="number"
              {...register("discountPrice")}
              className="input w-full border p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium">Description</label>
            <textarea
              {...register("description")}
              className="textarea w-full border p-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
