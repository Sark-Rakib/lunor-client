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

  // Cancel Order
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
          Swal.fire({
            icon: "success",
            title: "Cancelled!",
            text: "Order has been cancelled.",
            timer: 1500,
            showConfirmButton: false,
          });

          refetch();
        }
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to cancel order.",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <title>Lunor | My Orders</title>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>

          <p className="mt-1 text-sm ">View and manage all your orders.</p>
        </div>

        <div className="rounded bg-amber-50 px-4 py-2">
          <span className="text-sm text-gray-600">Total Orders: </span>

          <span className="font-bold text-amber-600">{orders.length}</span>
        </div>
      </div>

      {/* No Orders */}
      {orders.length === 0 ? (
        <div className="rounded border border-gray-200 bg-white py-16 text-center shadow-sm">
          <p className="text-gray-500">You have no orders yet.</p>
        </div>
      ) : (
        /* Single Table */
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-scroll">
            <table className="w-full min-w-[1300px] text-sm">
              {/* Table Header */}
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    #
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Product
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Quantity
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Size
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Color
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Product Price
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Delivery
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Total
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Payment
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Transaction ID
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Ordered On
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {orders.map((order, index) => {
                  const status = order.status || "Pending";

                  return (
                    <tr
                      key={order._id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      {/* Serial */}
                      <td className="px-4 py-4 font-medium text-gray-500">
                        {index + 1}
                      </td>

                      {/* Product */}
                      <td className="px-4 py-4">
                        <div className="flex min-w-[230px] items-center gap-3">
                          <img
                            src={order.productImage}
                            alt={order.productName}
                            className="h-14 w-14 rounded-lg border border-gray-200 object-cover"
                          />

                          <p className="max-w-[160px] font-semibold uppercase text-gray-800">
                            {order.productName}
                          </p>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-4">
                        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-gray-100 px-2 font-semibold text-gray-700">
                          {order.quantity}
                        </span>
                      </td>

                      {/* Size */}
                      <td className="px-4 py-4">
                        {order.size ? (
                          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                            {order.size}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>

                      {/* Color */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-5 w-5 rounded-full border border-gray-300 shadow-sm"
                            style={{
                              backgroundColor: order.color?.code || "#ffffff",
                            }}
                          />

                          <span className="text-gray-700">
                            {order.color?.name || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Product Price */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-700">
                          ৳{order.totalPrice}
                        </span>
                      </td>

                      {/* Delivery */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-gray-600">
                          ৳{order.deliveryCharge}
                        </span>
                      </td>

                      {/* Grand Total */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">
                          ৳{order.grandTotal}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                            order.paymentMethod === "cod"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {order.paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : "Online Payment"}
                        </span>
                      </td>

                      {/* Transaction ID */}
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs text-gray-600">
                          {order.transactionId || "N/A"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                            status === "Confirmed"
                              ? "border-green-200 bg-green-100 text-green-700"
                              : status === "Cancelled"
                                ? "border-red-200 bg-red-100 text-red-700"
                                : "border-amber-200 bg-amber-100 text-amber-700"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Ordered On */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-xs text-gray-600">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4 text-center">
                        {status === "Confirmed" ? (
                          <span className="inline-flex whitespace-nowrap rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600">
                            Waiting for delivery
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                          >
                            Cancel Order
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
