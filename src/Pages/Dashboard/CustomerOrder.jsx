import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import Loading from "../../Component/Loading";

const CustomerOrder = () => {
  const axiosSecure = useAxiosSecure();

  // Get orders
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  // Delete order
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/orders/${id}`);
    },

    onSuccess: () => {
      refetch();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Order has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete order.",
      });
    },
  });

  // Delete confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Update order status
  const handleStatus = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/orders/${id}`, {
        status: newStatus,
      });

      refetch();

      Swal.fire({
        icon: newStatus === "Confirmed" ? "success" : "info",
        title: `${newStatus}!`,
        text: `Order status updated to ${newStatus}.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Failed to ${newStatus.toLowerCase()} order.`,
      });
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
      <title>Lunor | Customer Order</title>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Orders</h2>

          <p className="mt-1 text-sm ">Manage all customer orders from here.</p>
        </div>

        <div className="rounded bg-amber-50 px-4 py-2">
          <span className="text-sm text-gray-600">Total Orders: </span>
          <span className="font-bold text-amber-600">{orders.length}</span>
        </div>
      </div>

      {/* No Orders */}
      {orders.length === 0 ? (
        <div className="rounded border border-gray-200 bg-white py-16 text-center shadow-sm">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        /* Single Table */
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-scroll">
            <table className="w-full min-w-[1500px] text-sm">
              {/* Table Head */}
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    #
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Product
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Customer
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Contact
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center font-semibold text-gray-700">
                    Qty
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Size / Weight
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Price
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Delivery
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Grand Total
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Address
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Payment
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Transaction ID
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left font-semibold text-gray-700">
                    Order At
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center font-semibold text-gray-700">
                    Actions
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

                          <div>
                            <p className="max-w-[160px] font-semibold uppercase text-gray-800">
                              {order.productName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-4">
                        <div className="min-w-[190px]">
                          <p className="font-semibold text-gray-800">
                            {order.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {order.email}
                          </p>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-gray-700">{order.phone}</span>
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-gray-100 px-2 font-semibold text-gray-700">
                          {order.quantity}
                        </span>
                      </td>

                      {/* Size / Weight */}
                      <td className="px-4 py-4">
                        {order.size ? (
                          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                            Size: {order.size}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            Weight: Not set
                          </span>
                        )}
                      </td>

                      {/* Product Price */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-700">
                          ৳{order.totalPrice}
                        </span>
                      </td>

                      {/* Delivery Charge */}
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

                      {/* Address */}
                      <td className="px-4 py-4">
                        <div className="min-w-[220px]">
                          <p className="font-medium text-gray-700">
                            {order.district}
                          </p>

                          <p className="mt-1 max-w-[220px] text-xs text-gray-500">
                            {order.address}
                          </p>
                        </div>
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

                      {/* Order At */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-xs text-gray-600">
                          {order.postedAt
                            ? new Date(order.postedAt).toLocaleString()
                            : "N/A"}
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

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex min-w-[180px] flex-col gap-2">
                          {/* Confirm */}
                          <button
                            onClick={() => handleStatus(order._id, "Confirmed")}
                            disabled={status === "Confirmed"}
                            className={`rounded-lg px-3 py-2 text-xs font-semibold text-white transition ${
                              status === "Confirmed"
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {status === "Confirmed" ? "Confirmed" : "Confirm"}
                          </button>

                          {/* Cancel */}
                          <button
                            onClick={() => handleStatus(order._id, "Cancelled")}
                            disabled={status === "Cancelled"}
                            className={`rounded-lg px-3 py-2 text-xs font-semibold text-white transition ${
                              status === "Cancelled"
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                          >
                            {status === "Cancelled" ? "Cancelled" : "Cancel"}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(order._id)}
                            disabled={deleteMutation.isPending}
                            className="rounded-lg bg-red-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Delete Order
                          </button>
                        </div>
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

export default CustomerOrder;
