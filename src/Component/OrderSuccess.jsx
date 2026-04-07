import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useEffect } from "react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    orderId,
    product,
    quantity,
    totalPrice,
    formData,
    paymentMethod,
    selectedSize,
  } = location.state || {};

  useEffect(() => {
    if (!product || !formData) {
      navigate("/");
    }
  }, [product, formData, navigate]);

  const deliveryCharge = 120;
  const grandTotal = totalPrice + deliveryCharge;

  // Fake Order ID
  const finalOrderId = orderId;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-4xl font-bold text-green-600">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Thank you for shopping with LUNOR
          </p>
        </div>

        {/* Order Slip Card */}
        <div className="bg-white rounded-3xl  overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-75">Order ID</p>
                <p className="text-2xl font-bold tracking-wider">
                  {finalOrderId}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Date</p>
                <p className="font-medium">
                  {new Date().toLocaleDateString("en-BD")}
                </p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-8 border-b">
            <h3 className="font-semibold text-lg mb-4 text-black">
              Product Details
            </h3>
            <div className="flex gap-5">
              {product?.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold text-xl text-black">
                  {product?.name}
                </p>
                <p className="text-gray-600 mt-1">
                  Quantity : <span className="font-medium">{quantity}</span>
                </p>
                <p className="text-black">
                  Size : <span>{selectedSize}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  ৳{totalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-8 border-b grid grid-cols-2 gap-8 text-black">
            <div>
              <h3 className="font-semibold mb-2 border-b">
                Shipping Information
              </h3>
              <p className="font-medium">{formData.name}</p>
              <p>{formData.phone}</p>
              <p>{formData.street}</p>
              <p>{formData.district}, Bangladesh</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 border-b">
                Payment Information
              </h3>
              <p>
                Method:{" "}
                <span className="font-medium capitalize">
                  {paymentMethod === "cashOnDelivery"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </span>
              </p>
              {paymentMethod === "onlinePayment" && formData.transactionId && (
                <p className="mt-1">
                  Transaction ID:{" "}
                  <span className="font-mono font-medium">
                    {formData.transactionId}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-8 bg-gray-50">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Product Price</span>
                <span className="text-black">৳{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="text-black">৳{deliveryCharge}</span>
              </div>
              <div className="border-t border-black pt-3 flex justify-between text-lg font-bold">
                <span className="text-black">Total Paid</span>
                <span className="text-green-600">৳{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="p-8 text-center text-sm text-gray-500">
            Your order has been received and will be processed soon.
            <br />
            You will receive a confirmation call shortly.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-4 bg-gray-800 text-white rounded-2xl font-semibold hover:bg-black transition"
          >
            Back to Home
          </button>

          <button
            onClick={() => {
              Swal.fire({
                title: "Downloaded!",
                text: "Order slip has been saved (Demo)",
                icon: "success",
              });
            }}
            className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition"
          >
            Download Order Slip (PDF)
          </button>

          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="flex-1 py-4 border border-gray-300 rounded-2xl font-semibold text-black hover:bg-gray-100 transition"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
