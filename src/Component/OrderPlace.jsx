import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";

const OrderPlace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { product, quantity, totalPrice, selectedSize } = location.state || {};

  // যদি product না পাওয়া যায় তাহলে Redirect
  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
    district: "",
    street: "",
    totalPrice: totalPrice,
    transactionId: "",
  });

  // Auto fill email if user is logged in
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!product) return;

    const deliveryCharge = 120;
    const finalTotal = Number(totalPrice) + deliveryCharge;

    try {
      const orderData = {
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0] || "",
        quantity,
        totalPrice,
        deliveryCharge,
        grandTotal: finalTotal,
        size: selectedSize || "Not specified",
        email: user?.email || formData.email,
        ...formData,
      };

      const res = await axiosSecure.post("/orders", orderData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Order Placed!",
          text: "Your order at LUNOR has been placed successfully 🎉",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#10B981",
          timer: 3000,
          toast: true,
          position: "center",
          showConfirmButton: false,
        });
        navigate("/order-success", {
          state: {
            orderId: res.data?.orderId || null, // ব্যাকএন্ড থেকে আসলে ভালো
            product,
            quantity,
            totalPrice,
            formData,
            selectedSize: selectedSize || "Not specified",
            paymentMethod: formData.paymentMethod,
          },
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          paymentMethod: "",
          district: "",
          street: "",
          transactionId: "",
        });

        // Optional: Redirect to order success page
        // navigate("/order-success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Failed!",
        text: "Failed to place order. Please try again.",
        icon: "error",
      });
    }
  };

  if (!product) {
    return <h2 className="text-center mt-10">Product not found!</h2>;
  }

  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Place Your Order
        </h1>

        {/* Order Summary */}
        <div className="p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex gap-6 items-center">
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div>
              <p className="text-lg font-medium">{product.name}</p>
              <p>
                Quantity: <span className="font-medium">{quantity}</span>
              </p>
              <p>
                Size: <span className="font-medium">{selectedSize}</span>
              </p>
              <p className="font-medium text-green-600">Total: ৳{totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Order Form */}

        <div className="inset-0 flex items-center justify-center p-4 overflow-auto">
          <div className="p-8 rounded-3xl">
            <h2 className="text-3xl font-bold text-center mb-2">
              Place Your Order
            </h2>
            <p className="text-center text-gray-500 mb-8">
              LUNOR • Secure Checkout
            </p>

            <form onSubmit={handleOrderSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-4 rounded-2xl outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!!user}
                  className={`w-full border p-4 rounded-2xl outline-none transition ${
                    user
                      ? "bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
                      : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  }`}
                />
                {user && (
                  <p className="text-xs text-green-600 mt-1">
                    Logged in as: <strong>{user.email}</strong>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-4 rounded-2xl outline-none transition"
                />
              </div>

              {/* District & Street */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    placeholder="Dhaka"
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-4 rounded-2xl outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Area / Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    placeholder="House, Road, Area"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-4 rounded-2xl outline-none transition"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  required
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 p-3 rounded-2xl outline-none transition"
                >
                  <option value="" className="text-black">
                    Select Payment Method
                  </option>
                  <option value="cashOnDelivery" className="text-black">
                    Cash on Delivery (COD)
                  </option>
                  <option value="onlinePayment" className="text-black">
                    Online Payment (bKash / Nagad)
                  </option>
                </select>
              </div>

              {/* Transaction ID - Only for Online Payment */}
              {formData.paymentMethod === "onlinePayment" && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Transaction ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    placeholder="Enter your bKash/Nagad Transaction ID"
                    required
                    value={formData.transactionId || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-4 rounded-2xl outline-none transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Provide the Transaction ID after completing the payment.
                  </p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Product Price</span>
                  <span className="font-medium text-black">৳{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium text-green-600">+ ৳120</span>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-black">Total Amount</span>
                  <span className="text-green-600">৳{totalPrice + 120}</span>
                </div>
              </div>

              {/* Online Payment Info */}
              {formData.paymentMethod === "onlinePayment" && (
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-sm">
                  <p className="font-semibold text-emerald-700 mb-3">
                    Send Payment to:
                  </p>
                  <div className="space-y-2 text-emerald-800">
                    <p>
                      <strong>bKash:</strong> 01745762857 (personal)
                    </p>
                    <p>
                      <strong>Nagad:</strong> 01745762857 (personal)
                    </p>
                  </div>
                  <p className="text-xs text-emerald-600 mt-3">
                    Enter the Transaction ID above after completing the payment.
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer font-semibold rounded-2xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-2 py-4 bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold rounded-2xl transition shadow-lg shadow-green-500/30"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlace;
