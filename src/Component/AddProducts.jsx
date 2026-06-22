// src/pages/dashboard/student/AddProducts.jsx
import { useForm, Watch } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

const AddProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    // image3: null,
    // image4: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const selectedCategory = watch("category");

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

  const sizesList =
    selectedCategory === "sunglass"
      ? []
      : selectedCategory === "trousers" ||
          selectedCategory === "baggy" ||
          selectedCategory === "jeans" ||
          selectedCategory === "chino"
        ? ["28", "30", "32", "34", "36"]
        : ["S", "M", "L", "XL", "2XL"];

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Image Upload Helper
  const uploadImage = async (file) => {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: "image/webp",
    });

    const formData = new FormData();
    formData.append("image", compressedFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
      { method: "POST", body: formData },
    );

    const data = await res.json();
    return {
      url: data.data.display_url,
      deleteUrl: data.data.delete_url,
    };
  };

  const onSubmit = async (data) => {
    if (data.category !== "sunglass" && selectedSizes.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please select at least one size",
      });
      return;
    }

    try {
      const image1 = await uploadImage(data.image1[0]);
      const image2 = await uploadImage(data.image2[0]);

      // const image3 = await uploadImage(data.image3[0]);
      // const image4 = await uploadImage(data.image4[0]);

      const productData = {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice || 0),
        description: data.description,
        ability: data.ability,

        sizes: selectedSizes,
        images: [image1.url, image2.url],
        status: "Pending",
        postedAt: new Date().toISOString(),
      };

      // color select

      if (data.color?.length > 0) {
        productData.color = data.color;
      }

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
        // image3: null,
        // image4: null,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Product post failed",
      });
    }
  };

  useEffect(() => {
    setSelectedSizes([]);
  }, [selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">
          Post <span className="text-gray-400">New Product</span>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 rounded text-black shadow-xl p-8 border border-gray-200 space-y-7"
      >
        {/* User Info */}
        <div className="flex flex-col items-center gap-4 md:gap-6 md:flex-row bg-gray-100 p-6 md:p-8 rounded shadow">
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
            className="w-full px-5 py-4 rounded border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
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
              className="w-full px-5 py-4 rounded border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200"
            >
              <option value="">Select Category</option>
              {[
                "Formal Shirt",
                "Casual Shirt",
                "halfsleeve",
                "T-Shirt",
                "poloshirt",
                "trousers",
                "baggy",
                "jeans",
                "chino",
                "Panjabi",
                "sunglass",
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
              className="w-full px-5 py-4 rounded border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
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
              className="w-full px-5 py-4 rounded border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
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
              className="w-full px-5 py-4 rounded border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
            />
            {errors.ability && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ability.message}
              </p>
            )}
          </div>
        </div>

        {/* color add */}

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Product Color
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {colors.map((color) => (
              <label
                key={color.name}
                className="flex items-center gap-3 border border-gray-300 rounded px-3 py-3 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  value={color.name}
                  className="w-4 h-4"
                  onChange={(e) => {
                    const selectedColors = watch("color") || [];

                    if (e.target.checked) {
                      setValue("color", [...selectedColors, color]);
                    } else {
                      setValue(
                        "color",
                        selectedColors.filter(
                          (item) => item.name !== color.name,
                        ),
                      );
                    }
                  }}
                />

                {/* Color Preview */}
                <span
                  className="w-6 h-6 rounded-full border"
                  style={{
                    backgroundColor: color.code,
                  }}
                ></span>

                <span className="text-gray-700">{color.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Selector */}

        {/* <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Available Sizes <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {sizesList.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-10 h-10 rounded border-2 font-medium transition-all ${
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
        </div> */}

        {/* Size Selector */}

        {selectedCategory !== "sunglass" && (
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
                  className={`w-10 h-10 rounded border-2 font-medium transition-all ${
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
        )}

        {/* Images */}
        {["image1", "image2"].map((img, i) => (
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
              className="w-full px-5 py-4 rounded border border-gray-300 file:py-3 file:px-6 file:rounded file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-800"
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
            placeholder="Describe your product..."
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-5 py-4 rounded border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none resize-none"
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
            className={`px-12 py-5 rounded text-white font-bold text-lg transition-all ${
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
