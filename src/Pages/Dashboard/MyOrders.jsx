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
        Swal.fire("Error", "Failed to cancel order.", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 font-semibold">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6">
      <title>Lunor | My Order</title>

      <h1 className="text-3xl font-bold text-center mb-8">
        My Orders (<span className="text-amber-500">{orders.length}</span>)
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col h-full bg-white shadow-md hover:shadow-xl transition rounded p-5 border"
            >
              {/* Image */}
              <img
                src={order.productImage}
                alt={order.productName}
                className="w-full h-100 object-cover rounded mb-4"
              />

              {/* Content */}
              <div className="flex-grow space-y-1 text-gray-700">
                <h2 className="text-xl font-semibold text-black">
                  {order.productName}
                </h2>

                <p>Quantity: {order.quantity}</p>
                <p>Size: {order.size}</p>
                {/* <p>Total Price: ৳ {order.totalPrice}</p> */}
                <p>Payment: {order.paymentMethod}</p>
                {order.transactionId && (
                  <p>Transaction ID: {order.transactionId}</p>
                )}

                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Confirmed"
                        ? "text-green-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <p className="text-xs text-gray-400">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="mt-4">
                {order.status === "Confirmed" ? (
                  <p className="text-green-600 text-center font-medium">
                    Waiting for your delivery
                  </p>
                ) : (
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
