import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxios";

const OrderCard = ({ order, onDelete }) => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState(order.status || "Pending"); // default Pending

  // ✅ Confirm order
  const handleConfirm = async () => {
    try {
      await axiosSecure.patch(`/orders/${order._id}`, { status: "Confirmed" });
      setStatus("Confirmed");
      Swal.fire("Confirmed!", "Order status updated.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to confirm order.", "error");
    }
  };

  // ✅ Cancel order
  const handleCancel = async () => {
    try {
      await axiosSecure.patch(`/orders/${order._id}`, { status: "Cancelled" });
      setStatus("Cancelled");
      Swal.fire("Cancelled!", "Order has been cancelled.", "info");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to cancel order.", "error");
    }
  };

  return (
    <div className="border border-gray-400 rounded-xl p-4 m-2">
      <img
        src={order.productImage}
        alt={order.productName}
        className="w-full h-60 object-cover rounded-lg"
      />
      <h2 className="font-semibold mt-2">Product Name: {order.productName}</h2>
      <p>Quantity : {order.quantity}</p>
      <p>Products Price : ৳{order.totalPrice}</p>
      <p>Delivery Charge : ৳{order.deliveryCharge}</p>
      <p>Total Price : ৳{order.grandTotal}</p>
      {order.size ? <p>Size: {order.size}</p> : <p>Weight: Not set</p>}
      <hr />
      <p>Customer Name : {order.name}</p>
      <p>Customer Email : {order.email}</p>
      <p>Customer Phone : {order.phone}</p>
      <p>Customer District : {order.district}</p>
      <p>Customer Street : {order.street}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <p>Transaction ID : {order.transactionId}</p>

      <p className="mt-2 font-semibold">
        Status:{" "}
        <span
          className={`text-${status === "Confirmed" ? "green" : status === "Cancelled" ? "red" : "amber"}-600`}
        >
          {status}
        </span>
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleConfirm}
          disabled={status === "Confirmed"}
          className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${
            status === "Confirmed"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {status === "Confirmed" ? "Confirmed" : "Confirm"}
        </button>
        <button
          onClick={handleCancel}
          disabled={status === "Cancelled"}
          className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${
            status === "Cancelled"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {status === "Cancelled" ? "Cancelled" : "Cancel"}
        </button>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(order._id)}
        className="mt-4 w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
      >
        Delete Order
      </button>
    </div>
  );
};

export default OrderCard;
