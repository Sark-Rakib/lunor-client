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

  const watchedCategory = watch("category") || "";

  // Fetch product
  const { data: tuition, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  // safe category
  const selectedCategory = (
    watchedCategory ||
    tuition?.category ||
    ""
  ).toLowerCase();

  // pant categories
  const pantCategories = ["baggy", "trousers", "jeans", "chino"];

  const isPant = pantCategories.includes(selectedCategory);

  const sizesList = isPant
    ? ["28", "30", "32", "34", "36"]
    : ["S", "M", "L", "XL", "2XL"];

  // set form data
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

      setSelectedSizes(tuition.sizes || []);
    }
  }, [tuition, reset]);

  // category change → clear invalid sizes only
  useEffect(() => {
    const validSizes = sizesList;

    setSelectedSizes((prev) =>
      prev.filter((size) => validSizes.includes(size)),
    );
  }, [selectedCategory]);

  // toggle size
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  // submit
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
          Update Product Details
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <input
            {...register("name")}
            className="input w-full border p-2"
            placeholder="Name"
          />

          {/* Category */}
          <select {...register("category")} className="input w-full border p-2">
            <option value="">Select Category</option>
            <option value="Formal Shirt">Formal Shirt</option>
            <option value="Casual Shirt">Casual Shirt</option>
            <option value="halfsleeve">Half Sleeve</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="poloshirt">Polo-Shirt</option>
            <option value="trousers">Trousers</option>
            <option value="baggy">Baggy</option>
            <option value="jeans">Jeans</option>
            <option value="chino">Chino</option>
            <option value="Panjabi">Panjabi</option>
          </select>

          {/* Sizes */}
          <div>
            <label className="font-semibold mb-2 block">Available Sizes</label>

            <div className="flex flex-wrap gap-3">
              {sizesList.map((size) => {
                const isSelected = selectedSizes.includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`w-10 h-10 rounded border-2 transition ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ability */}
          <input
            {...register("ability")}
            className="input w-full border p-2"
            placeholder="Ability"
          />

          {/* Price */}
          <input
            type="number"
            {...register("price")}
            className="input w-full border p-2"
            placeholder="Price"
          />

          {/* Discount */}
          <input
            type="number"
            {...register("discountPrice")}
            className="input w-full border p-2"
            placeholder="Discount Price"
          />

          {/* Description */}
          <textarea
            {...register("description")}
            className="textarea w-full border p-2"
            placeholder="Description"
          />

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
