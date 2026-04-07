// src/pages/dashboard/student/AddProducts.jsx
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const AddProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const sizesList = ["S", "M", "L", "XL", "2XL"];

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Image Upload Helper
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
      { method: "POST", body: formData },
    );

    const data = await res.json();
    return data.data.url;
  };

  const onSubmit = async (data) => {
    if (selectedSizes.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please select at least one size",
      });
      return;
    }

    try {
      const image1 = await uploadImage(data.image1[0]);
      const image2 = await uploadImage(data.image2[0]);
      const image3 = await uploadImage(data.image3[0]);
      const image4 = await uploadImage(data.image4[0]);

      const productData = {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice || 0),
        description: data.description,
        ability: data.ability,
        sizes: selectedSizes,
        images: [image1, image2, image3, image4],
        status: "Pending",
        postedAt: new Date().toISOString(),
      };

      await axiosSecure.post("/tuitions", productData);

      Swal.fire({
        icon: "success",
        title: "Product posted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      setSelectedSizes(["S", "M", "L"]);
      setPreviewImages({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Product post failed",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Post a <span className="text-gray-400">New Product</span>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 rounded-3xl text-black shadow-xl p-8 border border-gray-200 space-y-7"
      >
        {/* User Info */}
        <div className="flex flex-col items-center gap-4 md:gap-6 md:flex-row bg-gray-100 p-6 md:p-8 rounded-2xl shadow-lg">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-gray-300 object-cover"
          />
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              {user?.displayName}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Formal Shirt"
            {...register("name", { required: "Name is required" })}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Category & Price */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200"
            >
              <option value="">Select Category</option>
              {[
                "Formal Shirt",
                "Casual Shirt",
                "T-Shirt",
                "Pant",
                "Panjabi",
                "Other...",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 250"
              {...register("price", { required: "Price is required" })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* Discount & Ability */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Discount Price
            </label>
            <input
              type="number"
              placeholder="e.g. 150"
              {...register("discountPrice")}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Ability <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. In Stock / Limited"
              {...register("ability", { required: "Ability is required" })}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
            />
            {errors.ability && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ability.message}
              </p>
            )}
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Available Sizes <span className="text-red-500">*</span>
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
          <p className="text-xs text-gray-500 mt-2">
            Click to select / deselect sizes
          </p>
        </div>

        {/* Images */}
        {["image1", "image2", "image3", "image4"].map((img, i) => (
          <div key={img}>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Product Image {i + 1} <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register(img, { required: `Image ${i + 1} is required` })}
              onChange={(e) =>
                setPreviewImages((prev) => ({
                  ...prev,
                  [img]: e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : null,
                }))
              }
              className="w-full px-5 py-4 rounded-xl border border-gray-300 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-800"
            />
            {errors[img] && (
              <p className="text-red-500 text-sm mt-1">{errors[img].message}</p>
            )}
          </div>
        ))}

        {/* Preview Images */}
        <div className="flex gap-4 flex-wrap">
          {Object.values(previewImages).map(
            (img, i) =>
              img && (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-20 object-cover rounded-xl"
                />
              ),
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            placeholder="Describe your product..."
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-12 py-5 rounded-2xl text-white font-bold text-lg transition-all ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Posting..." : "Post Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
