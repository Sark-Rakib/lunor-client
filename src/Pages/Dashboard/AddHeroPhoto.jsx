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
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      mediaType: "image",
    },
  });

  const mediaType = watch("mediaType");

  // Upload Image to ImgBB

  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST_KEY
      }`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.display_url;
  };

  // Upload Video to Cloudinary

  const uploadVideo = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/video/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error?.message || "Video upload failed");
    }

    return data.secure_url;
  };

  // Fetch Hero Media

  const fetchPhotos = async () => {
    try {
      const res = await axiosSecure.get("/photos");

      setHeroPhotos(res.data);
    } catch (error) {
      console.error("Failed to fetch hero media:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to load hero media",
      });
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [axiosSecure]);

  // Submit

  const onSubmit = async (data) => {
    if (!data.media || data.media.length === 0) {
      Swal.fire({
        icon: "error",
        title: `Please select a ${data.mediaType}!`,
      });

      return;
    }

    const file = data.media[0];

    // File validation
    if (data.mediaType === "image") {
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid file",
          text: "Please select an image file.",
        });

        return;
      }
    }

    if (data.mediaType === "video") {
      if (!file.type.startsWith("video/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid file",
          text: "Please select a video file.",
        });

        return;
      }
    }

    try {
      let mediaUrl = "";

      // Image Upload

      if (data.mediaType === "image") {
        mediaUrl = await uploadImage(file);
      }

      // Video Upload

      if (data.mediaType === "video") {
        mediaUrl = await uploadVideo(file);
      }

      // Save to Backend

      const heroData = {
        type: data.mediaType,
        url: mediaUrl,
      };

      await axiosSecure.post("/photos", heroData);

      Swal.fire({
        icon: "success",
        title: `${
          data.mediaType === "image" ? "Image" : "Video"
        } posted successfully!`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Reset form
      reset({
        mediaType: "image",
      });

      // Refresh data
      await fetchPhotos();
    } catch (error) {
      console.error("Upload error:", error);

      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: error?.message || "Something went wrong while uploading.",
      });
    }
  };

  // Delete Hero Media

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

    if (!result.isConfirmed) {
      return;
    }

    try {
      await axiosSecure.delete(`/photos/${id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Hero media has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      await fetchPhotos();
    } catch (error) {
      console.error("Delete error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete hero media.",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10">
      <title>Lunor | Add Hero</title>

      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">
          Hero <span className="text-[#aba65e]">Media</span>
        </h1>

        <p className="text-gray-500 mt-2">
          Add an image or video to your hero section.
        </p>
      </div>

      {/*  Upload Form*/}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 rounded text-black shadow-xl p-6 md:p-8 border border-gray-200 space-y-7 mb-10"
      >
        {/* Media Type */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Media Type
          </label>

          <select
            {...register("mediaType", {
              required: "Please select media type",
            })}
            className="w-full px-5 py-4 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#aba65e]"
          >
            <option value="image">Image</option>

            <option value="video">Video</option>
          </select>

          {errors.mediaType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mediaType.message}
            </p>
          )}
        </div>

        {/* Media Upload */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            {mediaType === "video" ? "Hero Video" : "Hero Image"}{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="file"
            accept={
              mediaType === "video"
                ? "video/mp4,video/webm,video/ogg"
                : "image/*"
            }
            {...register("media", {
              required: "Media is required",
            })}
            className="w-full px-5 py-4 rounded border border-gray-300 bg-white file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#aba65e] file:text-white hover:file:bg-[#8a854d] cursor-pointer"
          />

          {errors.media && (
            <p className="text-red-500 text-sm mt-1">{errors.media.message}</p>
          )}

          {mediaType === "video" && (
            <p className="text-gray-500 text-sm mt-2">
              Recommended format: MP4. Keep the video optimized for faster
              loading.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-10 md:px-12 py-4 md:py-5 rounded text-white font-bold text-base md:text-lg transition-all transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-[#aba65e] to-purple-200 hover:shadow-2xl hover:scale-105"
            }`}
          >
            {isSubmitting
              ? "Uploading..."
              : mediaType === "video"
                ? "Post Hero Video"
                : "Post Hero Image"}
          </button>
        </div>
      </form>

      {/* Existing Hero Media*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroPhotos.map((photo) => {
          // New structure
          const isVideo = photo.type === "video";

          // Support old image structure
          const mediaUrl =
            photo.url || photo.images?.[0]?.url || "/placeholder.jpg";

          return (
            <div
              key={photo._id}
              className="relative border rounded-lg overflow-hidden bg-black shadow-md"
            >
              {/* Video */}
              {isVideo ? (
                <video
                  src={mediaUrl}
                  controls
                  muted
                  playsInline
                  className="w-full h-60 object-cover"
                />
              ) : (
                /* Image */
                <img
                  src={mediaUrl}
                  alt="Hero"
                  className="w-full h-60 object-cover"
                />
              )}

              {/* Media Type Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {isVideo ? "VIDEO" : "IMAGE"}
                </span>
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() => handleDelete(photo._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {heroPhotos.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No hero media found.
        </div>
      )}
    </div>
  );
};

export default AddHeroPhoto;
