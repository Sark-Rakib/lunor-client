import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomerReview from "./CustomerReview";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import ImageCarousel from "./ImageCarousel";
import UseRole from "../Hooks/useRole";
import CustomerReviewSwiper from "./CustomerReviewSwiper";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { role } = UseRole();

  // Order form modal state
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    street: "",
  });

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const res = await axiosSecure.get(`/tuitions/${id}`);
        setTuition(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTuition();
  }, [id, axiosSecure]);

  if (loading) return <Loading />;
  if (!tuition)
    return <div className="text-center py-10 text-xl">Product not found</div>;

  const price = tuition.discountPrice || tuition.price;
  const totalPrice = quantity * price;

  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity((prev) => prev + 1);
    if (type === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        productId: tuition._id,
        productName: tuition.name,
        productImage: tuition.images[0],
        quantity,
        totalPrice,
        size: tuition.size || "Not specified",
        email: user?.email || formData.email,
        ...formData,
      };
      await axiosSecure.post("/orders", orderData);
      Swal.fire({
        title: "Order Placed!",
        text: "Your order at LUNOR has been placed successfully 🎉",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#10B981", // green
        timer: 3000,
        toast: true,
        position: "center",
        showConfirmButton: false,
      });
      setShowOrderForm(false);
      setFormData({ name: "", email: "", phone: "", district: "", street: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <title>Lunor | Details</title>
      <div className="w-11/12 mx-auto py-10">
        {/* Back Button */}
        <Link
          to="/all-products"
          className="flex w-40 items-center gap-2 mb-6 text-gray-400 hover:text-gray-200 font-medium transition-all"
        >
          <IoMdArrowRoundBack className="text-2xl" />
          Back to Products
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 p-2 mx-auto rounded">
            <ImageCarousel images={tuition.images} />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl">{tuition.name}</h1>
            <h1 className="bg-gray-400 rounded-full w-max px-3">
              {tuition.ability}
            </h1>
            <p className="text-s sm:text-l md:text-lg">{tuition.description}</p>

            {/* Price */}
            <div className="flex items-center gap-4 mt-2">
              {tuition.discountPrice ? (
                <>
                  <span className="text-red-400 line-through font-medium md:text-lg">
                    ৳{tuition.price}
                  </span>
                  <span className="sm:text-l md:text-2xl">
                    ৳{tuition.discountPrice}
                  </span>
                </>
              ) : (
                <span className="text-lg">৳{tuition.price}</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span>Quantity :</span>
              <div className="flex items-center  overflow-hidden">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 bg-white text-gray-900 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* products size */}
            <div className="mt-1">
              <span>Size : </span>
              <span>{tuition.size || "N/A"}</span>
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center">
              <div className="text-lg">
                <span>Total Price : </span>
                <span className="">৳{totalPrice}</span>
              </div>

              {role === "admin" && (
                <Link
                  to={`/dashboard/tuition/${id}/edit`}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Edit Product
                </Link>
              )}
            </div>

            {/* Order Now Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full md:w-1/2 py-4 px-6 bg-gray-400 text-white text-l md:text-lg rounded-xl shadow-lg hover:bg-gray-500 hover:shadow-2xl transition-all"
              >
                Order Now
              </button>
            </div>
            {/* WhatsApps Order Button */}
            <div className="mt-4">
              <a
                href={`https://wa.me/8801745762857?text=${encodeURIComponent(
                  `Hello! I want to order:\nProduct: ${tuition.name}\nQuantity: ${quantity}\nSize: ${tuition.size}\nTotal: ৳${totalPrice}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-1/2 block py-4 px-6 bg-green-600 text-white text-l md:text-lg rounded-xl shadow-lg hover:bg-green-700 hover:shadow-2xl transition-all text-center"
              >
                WhatsApp
              </a>
            </div>

            <div className="p-2 text-right text-xs text-gray-400">
              Posted: {formatDate(tuition.postedAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black/40 overflow-scroll">
          <div className="bg-gray-200 p-6 rounded-xl max-w-md w-full relative">
            <h2 className="text-2xl text-black font-bold mb-4 text-center">
              Place Your <span className="text-gray-400">Order</span>
            </h2>
            <form
              onSubmit={handleOrderSubmit}
              className="flex flex-col gap-3 text-black"
            >
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <label>Your Email (auto-filled)</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required={!user}
                value={user ? user.email : formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`border p-2 rounded outline-none border-gray-500 ${user ? "bg-gray-200" : ""}`}
                disabled={!!user}
              />
              <label>Your Phone Number</label>
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                required
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              >
                <option value="">Select Payment Method</option>
                <option value="cashOnDelivery">Cash on Delivery</option>
                <option value="onlinePayment">Online Payment</option>
              </select>
              <label>Your District</label>
              <input
                type="text"
                name="district"
                placeholder="District"
                required
                value={formData.district}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <label>Your Street Address</label>
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                required
                value={formData.street}
                onChange={handleInputChange}
                className="border p-2 rounded outline-none border-gray-500"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <hr className="text-gray-400" />
      <CustomerReview />
      <hr />
      <CustomerReviewSwiper></CustomerReviewSwiper>
    </div>
  );
};

export default ProductDetails;
