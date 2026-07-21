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
  const [selectedColors, setSelectedColors] = useState([]);
  const colors = [
    { name: "Black", code: "#000000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Navy Blue", code: "#000080" },
    { name: "Sky Blue", code: "#87CEEB" },
    { name: "Royal Blue", code: "#4169E1" },
    { name: "Grey", code: "#808080" },
    { name: "Ash", code: "#B2BEB5" },
    { name: "Red", code: "#FF0000" },
    { name: "Maroon", code: "#800000" },
    { name: "Green", code: "#008000" },
    { name: "Olive Green", code: "#808000" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Orange", code: "#FFA500" },
    { name: "Pink", code: "#FFC0CB" },
    { name: "Purple", code: "#800080" },
    { name: "Brown", code: "#A52A2A" },
    { name: "Beige", code: "#F5F5DC" },
    { name: "Cream", code: "#FFFDD0" },
    { name: "Khaki", code: "#C3B091" },
    { name: "Off White", code: "#FAF9F6" },
  ];

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
        piece: tuition.piece || "",
        discountPrice: tuition.discountPrice || "",
        description: tuition.description || "",
      });

      setSelectedSizes(tuition.sizes || []);
      setSelectedColors(tuition.color || []);
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

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.some((item) => item.name === color.name)
        ? prev.filter((item) => item.name !== color.name)
        : [...prev, color],
    );
  };

  // submit
  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        sizes: selectedSizes,
        color: selectedColors,
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
      <div className="w-full max-w-lg p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
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

          {/* Colors */}
          <div>
            <label className="font-semibold mb-2 block">Product Colors</label>

            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => {
                const isSelected = selectedColors.some(
                  (item) => item.name === color.name,
                );

                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`flex items-center gap-3 border p-2 rounded ${
                      isSelected ? "border-black" : "border-gray-300"
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border"
                      style={{
                        backgroundColor: color.code,
                      }}
                    ></span>

                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

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
                        : "border-gray-300 "
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

          {/* piece */}

          <input
            {...register("piece")}
            className="input w-full border p-2"
            placeholder="Piece"
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
            className="w-full bg-black text-white py-2 rounded hover:bg-amber-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
