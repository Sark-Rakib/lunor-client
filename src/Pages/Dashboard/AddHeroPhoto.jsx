// src/pages/dashboard/student/AddHeroPhoto.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxios";

const AddHeroPhoto = () => {
  const axiosSecure = useAxiosSecure();
  const [heroPhotos, setHeroPhotos] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // upload helper
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

  // fetch existing hero photos
  const fetchPhotos = async () => {
    try {
      const res = await axiosSecure.get("/photos");
      setHeroPhotos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // submit
  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Please select an image!",
      });
      return;
    }

    try {
      const imageUrl = await uploadImage(data.image[0]);
      const productData = { images: [imageUrl] };

      await axiosSecure.post("/photos", productData);
      Swal.fire({
        icon: "success",
        title: "Hero image posted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
      fetchPhotos(); // refresh list
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Upload failed" });
    }
  };

  // delete photo
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/photos/${id}`);
        Swal.fire("Deleted!", "Hero image has been deleted.", "success");
        fetchPhotos(); // refresh list
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete image", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <title>Lunor | Add Hero</title>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Hero <span className="text-[#aba65e]">Photos</span>
        </h1>
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 rounded-3xl text-black shadow-xl p-8 border border-gray-200 space-y-7 mb-10"
      >
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Hero Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#aba65e] file:text-white hover:file:bg-[#8a854d] focus:border-gray-600 focus:ring-4 focus:ring-gray-200 outline-none"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className="text-center pt-6">
          <button
            type="submit"
            className={`px-12 py-5 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-105 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-[#aba65e] to-purple-200 hover:shadow-2xl"
            }`}
          >
            Post Hero Image
          </button>
        </div>
      </form>

      {/* Existing Hero Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {heroPhotos.map((photo) => (
          <div
            key={photo._id}
            className="relative border rounded-lg overflow-hidden"
          >
            <img
              src={photo.images[0]}
              alt="Hero"
              className="w-full h-60 object-cover"
            />
            <button
              onClick={() => handleDelete(photo._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddHeroPhoto;
