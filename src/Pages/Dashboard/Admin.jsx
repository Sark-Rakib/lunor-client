import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Component/Loading";

const PendingTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}/admin`);
      if (res.data.modifiedCount > 0) {
        toast.success("User is now Admin ✅");
        refetch();
      }
    } catch (e) {
      console.log(e, "Failed to make admin");
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}/remove-admin`);
      if (res.data.modifiedCount > 0) {
        toast.success("Admin removed ✅");
        refetch();
      }
    } catch (e) {
      console.log(e, "Failed to remove admin");
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-8 text-gray-400">
      <title>Harir Shad | User Management</title>
      <h1 className="text-3xl font-bold mb-6">
        User Management ({users.length})
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No users found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th>SL.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((t, index) => (
                <tr key={t._id}>
                  <td>{index + 1}</td>
                  <td>{t.displayName}</td>
                  <td>{t.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.role === "admin" ? "badge-primary" : "badge-outline"
                      }`}
                    >
                      {t.role || "user"}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {t.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(t._id)}
                        className="btn btn-xs btn-success"
                      >
                        Make Admin
                      </button>
                    )}
                    {t.role === "admin" && (
                      <button
                        onClick={() => handleRemoveAdmin(t._id)}
                        className="btn btn-xs btn-error"
                      >
                        Remove Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingTuitions;
