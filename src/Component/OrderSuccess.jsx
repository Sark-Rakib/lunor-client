import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

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
    deliveryCharge,
    selectedSize,
  } = location.state || {};

  const safeTotal = Number(totalPrice) || 0;
  const safeDelivery = Number(deliveryCharge) || 0;
  const grandTotal = safeTotal + safeDelivery;

  const finalOrderId = orderId || `LUNOR-${Date.now()}`;

  const handlePrint = () => {
    const printContents = document.getElementById("print-area")?.innerHTML;

    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    window.location.reload();
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-green-600">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-lg">
            Thank you for shopping with LUNOR
          </p>
        </div>

        {/* CARD */}
        <div id="print-area" className=" rounded overflow-hidden">
          {/* TOP */}
          <div className="bg-green-600 text-white p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm opacity-75">Order ID</p>
                <p className=" md:text-xl font-bold">{finalOrderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Date</p>
                <p>{new Date().toLocaleDateString("en-BD")}</p>
              </div>
            </div>
          </div>

          {/* PRODUCT */}
          <div className="p-6 border-b">
            <div className="flex gap-4">
              <img
                src={product?.images?.[0] || "/placeholder.jpg"}
                alt={product?.name || "Product"}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-semibold text-sm uppercase">
                  {product?.name || "Product"}
                </p>
                <p className="text-gray-600 text-sm">
                  Quantity: {quantity || 0}
                </p>
                <p className="text-sm">Size: {selectedSize || "N/A"}</p>
              </div>

              <div className="text-right">
                <span className="font-bold text-green-600">৳{safeTotal}</span>{" "}
                BDT
              </div>
            </div>
          </div>

          {/* CUSTOMER */}
          <div className="p-6 border-b grid grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Shipping</h3>
              <p>{formData?.name || "N/A"}</p>
              <p>{formData?.phone || "N/A"}</p>
              <p>{formData?.district || "N/A"}</p>
              <p>{formData?.address || "N/A"}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Payment</h3>
              <p>
                Method:{" "}
                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>

              {paymentMethod === "onlinePayment" && formData?.transactionId && (
                <p>TXN: {formData.transactionId}</p>
              )}
            </div>
          </div>

          {/* PRICE */}
          <div className="p-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{safeTotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>৳{safeDelivery}</span>
            </div>

            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-green-600">৳{grandTotal}</span>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 text-center text-gray-500 text-sm">
            Your order has been received successfully.
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-800 text-white py-3 rounded"
          >
            Back Home
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 bg-green-600 text-white py-3 rounded"
          >
            Print Order
          </button>

          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="flex-1 border py-3 rounded"
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
