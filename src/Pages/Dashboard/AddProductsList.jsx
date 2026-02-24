import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import Loading from "../../Component/Loading";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const AddProductsList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch all tuitions
  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tuitions/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
          }
        } catch (err) {
          console.log(err);
        }
        Swal.fire("Deleted!", "Your tuition has been deleted.", "success");
      }
    });
  };

  const handleView = (id) => {
    navigate(`/products-details/${id}`);
  };
  const handleApprove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this product!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/tuitions/${id}/approve`, {
            email: user?.email,
          });
          if (res.data.success) {
            refetch();
            Swal.fire(
              "Approved!",
              "This product has been approved.",
              "success",
            );
          }
        } catch (err) {
          console.log(err);
          Swal.fire("Error!", "Something went wrong while approving.", "error");
        }
      }
    });
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // red
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/tuitions/${id}/reject`, {
            email: user?.email, // admin email
          });
          if (res.data.success) {
            refetch();
            Swal.fire(
              "Rejected!",
              "This product has been rejected.",
              "success",
            );
          }
        } catch (err) {
          console.log(err);
          Swal.fire("Error!", "Something went wrong while rejecting.", "error");
        }
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/tuition/${id}/edit`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-8 text-gray-400">
      <title>Lunor | Product</title>
      <h1 className="text-3xl text-center font-bold mb-6">
        All Products (<span className="text-amber-500">{tuitions.length}</span>)
      </h1>
      {tuitions.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount Price</th>
                {/* <th>Description</th> */}
                <th>PostedAt</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tuitions.map((t, index) => (
                <tr key={t._id}>
                  <td>{index + 1}</td>
                  <td>{t.name}</td>
                  <td>{t.category}</td>
                  <td>{t.price}</td>
                  <td>{t.discountPrice}</td>
                  {/* <td>{t.description}</td> */}
                  <td>${t.postedAt}</td>
                  <td>
                    {" "}
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        t.status === "Approved"
                          ? "bg-green-500"
                          : t.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-gray-400"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleView(t._id)}
                      className="btn btn-xs btn-info"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleEdit(t._id)}
                      className="btn btn-xs btn-info"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(t._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleApprove(t._id)}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(t._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
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

export default AddProductsList;
