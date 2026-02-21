import React from "react";
import { FaUserEdit } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-amber-300 ring-offset-base-100 ring-offset-4">
                <img src={user?.photoURL || "/avatar.png"} alt="User" />
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left space-y-1">
              <h2 className="text-2xl font-bold">
                {user?.displayName || "Anonymous User"}
              </h2>
              <p className="text-gray-500">{user?.email || "No email found"}</p>

              <span className="badge border border-green-500 badge-outline mt-2">
                Active User
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="divider my-6"></div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-base-200 p-4 rounded-xl">
              <h4 className="font-semibold mb-1">Full Name</h4>
              <p>{user?.displayName || "Not set"}</p>
            </div>

            <div className="bg-base-200 p-4 rounded-xl">
              <h4 className="font-semibold mb-1">Email Address</h4>
              <p>{user?.email}</p>
            </div>

            <div className="bg-base-200 p-4 rounded-xl">
              <h4 className="font-semibold mb-1">Account Created</h4>
              <p>
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="bg-base-200 p-4 rounded-xl">
              <h4 className="font-semibold mb-1">Last Login</h4>
              <p>
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 text-right">
            <button
              onClick={() => navigate("/dashboard/edit-profile")}
              className="btn bg-amber-500 gap-2"
            >
              <FaUserEdit />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
