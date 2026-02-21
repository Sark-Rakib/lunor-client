// src/pages/dashboard/MyOrders.jsx

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../Component/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders-customer?email=${user.email}`);
      return res.data;
    },
  });

  // 🗑️ delete order
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/orders/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Cancelled!", "Order has been cancelled.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire(error, "Failed to cancel order.", "error");
      }
    }
    refetch();
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 font-semibold">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="p-6 ">
      <title>Lunor | My Order</title>
      <h1 className="text-2xl font-bold  text-center mb-6">
        My Orders (<span className="text-amber-500">{orders.length}</span>)
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-400"
            >
              <img
                src={order.productImage}
                alt={order.productName}
                className=" w-full object-cover rounded-lg mb-4"
              />

              <h2 className="font-bold text-xl mb-1">{order.productName}</h2>

              <p className="text-lg">Quantity : {order.quantity}</p>

              <p className="text-lg">Size : {order.size}</p>

              <p className="text-lg">Total Price : ৳ {order.totalPrice}</p>

              <p className="text-lg">
                Status :{" "}
                <span className="font-semibold text-lg text-green-600">
                  {order.status}
                </span>
              </p>

              <p className="text-sm mt-1">
                Ordered on : {new Date(order.createdAt).toLocaleDateString()}
              </p>

              {order.status === "Confirmed" ? (
                <h1 className="text-green-600 text-center font-semibold mt-2">
                  Waiting For Your Delivary
                </h1>
              ) : (
                <button
                  onClick={() => handleDelete(order._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
