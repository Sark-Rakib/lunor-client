import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";

const EditProfile = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Profile updated successfully 🎉");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

      <form onSubmit={handleUpdateProfile} className="space-y-4">
        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full border-amber-400 outline-none"
            required
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="input input-bordered w-full border-amber-400 outline-none"
            placeholder="https://image-url.com"
          />
        </div>

        {/* Preview */}
        <div className="flex justify-center">
          <img
            src={photo || "/avatar.png"}
            alt="Preview"
            className="w-24 h-24 rounded-full ring ring-amber-400 ring-offset-2"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="btn bg-amber-400 w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
