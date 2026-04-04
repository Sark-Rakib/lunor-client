// src/pages/dashboard/student/AddTuitionForm.jsx
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

// Validation rules
const tuitionSchema = {
  name: { required: "Name is required" },
  category: { required: "Please select your product category" },
  price: { required: "Price is required" },
  // discountPrice: { required: "Discount is required" },
  ability: { required: "Ability is required" },
  size: { required: "Size is required" },
  image1: { required: "Image 1 is required" },
  image2: { required: "Image 2 is required" },
  image3: { required: "Image 3 is required" },
  image4: { required: "Image 4 is required" },
  description: { required: "Description is required" },
};

const AddProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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

  // helper to upload a single image
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
    try {
      // upload all 4 images
      const image1 = await uploadImage(data.image1[0]);
      const image2 = await uploadImage(data.image2[0]);
      const image3 = await uploadImage(data.image3[0]);
      const image4 = await uploadImage(data.image4[0]);

      const productData = {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice),
        description: data.description,
        ability: data.ability,
        size: data.size,
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
      <title>Lunor | Add Product</title>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Post a <span className="text-gray-400">New Product</span>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 rounded-3xl text-black shadow-xl p-8 border border-gray-200 space-y-7"
      >
        {/* Student info */}
        <div className="flex flex-col items-center gap-4 md:gap-6 md:flex-row bg-gray-100 p-6 md:p-8 rounded-2xl shadow-lg">
          <img
            src={user?.photoURL}
            alt={user?.displayName || "User Photo"}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-gray-300 object-cover"
          />
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              {user?.displayName || "No Name"}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              {user?.email || "No Email"}
            </p>
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
            {...register("name", tuitionSchema.name)}
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
              Product Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category", tuitionSchema.category)}
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
              type="text"
              placeholder="e.g. 250"
              {...register("price", tuitionSchema.price)}
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
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 150"
              {...register("discountPrice")}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
            />
            {/* {errors.discountPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discountPrice.message}
              </p>
            )} */}
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Product Ability <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Sale or Sold Out"
              {...register("ability", tuitionSchema.ability)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
            />
            {errors.ability && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ability.message}
              </p>
            )}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Product Size <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Small, Medium, Large"
            {...register("size", tuitionSchema.size)}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
          />
          {errors.size && (
            <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>
          )}
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
              {...register(img, tuitionSchema[img])}
              onChange={(e) =>
                setPreviewImages((prev) => ({
                  ...prev,
                  [img]: e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : null,
                }))
              }
              className="w-full px-5 py-4 rounded-xl border border-gray-300 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-600 file:text-white hover:file:bg-gray-700 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
            />
            {errors[img] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[img]?.message}
              </p>
            )}
          </div>
        ))}

        {/* Preview */}
        <div className="flex gap-4 mt-2">
          {Object.values(previewImages).map(
            (img, i) =>
              img && (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-20 object-cover rounded"
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
            placeholder="Describe product..."
            {...register("description", tuitionSchema.description)}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className={`px-12 py-5 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-105 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-gray-600 to-purple-300 hover:shadow-2xl"
            }`}
          >
            Post Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
