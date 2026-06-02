import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "./Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomerReview from "./CustomerReview";
// import Swal from "sweetalert2";
// import useAuth from "../Hooks/useAuth";
import ImageCarousel from "./ImageCarousel";
import UseRole from "../Hooks/useRole";
import CustomerReviewSwiper from "./CustomerReviewSwiper";
import ProductImages from "./ProductImages";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  // const [activeImage, setActiveImage] = useState(0);
  // const { user } = useAuth();
  const { role } = UseRole();

  // Order form modal state
  // const [showOrderForm, setShowOrderForm] = useState(false);

  // Form state
  // const [formData, setFormData] = useState({
  //   name: "",
  //   phone: "",
  //   district: "",
  //   street: "",
  // });

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

  const pantCategories = ["trousers", "baggy", "jeans", "chino"];

  const sizeOptions = pantCategories.includes(
    (tuition?.category || "").toLowerCase(),
  )
    ? ["28", "30", "32", "34", "36"]
    : ["S", "M", "L", "XL", "2XL"];

  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity((prev) => prev + 1);
    if (type === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleOrderSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const orderData = {
  //       productId: tuition._id,
  //       productName: tuition.name,
  //       productImage: tuition.images[0],
  //       quantity,
  //       totalPrice,
  //       size: tuition.size || "Not specified",
  //       email: user?.email || formData.email,
  //       ...formData,
  //     };
  //     await axiosSecure.post("/orders", orderData);
  //     Swal.fire({
  //       title: "Order Placed!",
  //       text: "Your order at LUNOR has been placed successfully 🎉",
  //       icon: "success",
  //       confirmButtonText: "Ok",
  //       confirmButtonColor: "#10B981", // green
  //       timer: 3000,
  //       toast: true,
  //       position: "center",
  //       showConfirmButton: false,
  //     });
  //     setShowOrderForm(false);
  //     setFormData({ name: "", email: "", phone: "", district: "", street: "" });
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to place order. Try again.");
  //   }
  // };

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
      <div className="w-11/12 mx-auto py-7">
        {/* Back Button */}
        <Link
          to="/all-products"
          className="flex w-45 items-center text-[15px] gap-2 mb-6 text-gray-400 hover:text-gray-200 transition-all uppercase"
        >
          <IoMdArrowRoundBack className="text-xl" />
          Back to Products
        </Link>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Product Image */}
          {/* <div className="w-full lg:w-1/2 p-2 mx-auto rounded">
            <ImageCarousel images={tuition.images} />
          </div> */}

          <ProductImages images={tuition.images} loading="lazy" />

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-2xl uppercase">{tuition.name}</h1>
            <h1 className="text-[12px] bg-gray-400 rounded-full w-max px-3 uppercase">
              {tuition.ability}
            </h1>
            {/* <p className="text-[13px] sm:text-l md:text-lg uppercase">
              {tuition.description}
            </p> */}

            {/* Price */}
            <div className="flex items-center gap-4">
              {tuition.discountPrice ? (
                <>
                  <span className="text-red-400 line-through font-medium md:text-lg">
                    ৳{tuition.price}
                  </span>
                  <span className="sm:text-l md:text-2xl uppercase">
                    ৳{tuition.discountPrice}
                  </span>
                </>
              ) : (
                <span className="text-lg uppercase">৳{tuition.price}</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="uppercase">Quantity :</span>
              <div className="flex items-center -mt-2 overflow-hidden">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 bg-white text-gray-900 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Size Selector with Selection */}
            {/* <div className="mt-1">
              <p className="text-s mb-3">Select Size</p>

              <div className="flex flex-wrap gap-4">
                {["S", "M", "L", "XL", "2XL"].map((size) => {
                  const isAvailable = tuition?.sizes?.includes(size);
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      className={`w-8 h-8 rounded border-2 text-sm font-medium transition-all flex items-center justify-center
            ${
              !isAvailable
                ? "border-dashed border-gray-300 text-gray-400 line-through cursor-not-allowed"
                : isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-400 hover:border-black hover:bg-gray-100"
            }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {!selectedSize && (
                <p className="text-red-500 text-[12px] mt-2">
                  Please select a size *
                </p>
              )}
            </div> */}

            <div className="mt-1">
              <p className="text-s mb-3 uppercase">Select Size</p>

              <div className="flex flex-wrap gap-4">
                {sizeOptions.map((size) => {
                  const isAvailable = tuition?.sizes?.includes(size); // DB check
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      className={`w-8 h-8 rounded border-2 text-sm font-medium transition-all flex items-center justify-center
          ${
            !isAvailable
              ? "border-dashed border-gray-300 text-gray-400 line-through cursor-not-allowed"
              : isSelected
                ? "border-black bg-black text-white"
                : "border-gray-400 hover:border-black hover:bg-gray-100"
          }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {!selectedSize && (
                <p className="text-red-500 text-[12px] mt-2">
                  Please select a size *
                </p>
              )}
            </div>

            {/* chart */}

            <button
              type="button"
              onClick={() => setShowSizeChart(true)}
              className="mt-2 text-sm underline text-gray-500 hover:text-black transition-all text-start uppercase"
            >
              View Size Chart
            </button>

            {showSizeChart && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setShowSizeChart(false)}
                    className="absolute top-2 right-3 text-xl"
                  >
                    ✕
                  </button>

                  <h2 className="text-xl font-bold mb-4 text-center">
                    Size Chart
                  </h2>

                  {/* Pant Chart */}
                  {tuition?.category === "Pant" ? (
                    <table className="w-full text-center border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-2 border">Size</th>
                          <th className="p-2 border">Waist (inch)</th>
                          <th className="p-2 border">Length (inch)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { size: "28", waist: 28, length: 38 },
                          { size: "30", waist: 30, length: 39 },
                          { size: "32", waist: 32, length: 40 },
                          { size: "34", waist: 34, length: 41 },
                          { size: "36", waist: 36, length: 42 },
                        ].map((row) => (
                          <tr key={row.size}>
                            <td className="p-2 border">{row.size}</td>
                            <td className="p-2 border">{row.waist}</td>
                            <td className="p-2 border">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    /*  Shirt / T-shirt Chart */
                    <table className="w-full text-center border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-2 border">Size</th>
                          <th className="p-2 border">Chest (inch)</th>
                          <th className="p-2 border">Length (inch)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { size: "S", chest: "36-38", length: 27 },
                          { size: "M", chest: "38-40", length: 28 },
                          { size: "L", chest: "40-42", length: 29 },
                          { size: "XL", chest: "42-44", length: 30 },
                          { size: "2XL", chest: "44-46", length: 31 },
                        ].map((row) => (
                          <tr key={row.size}>
                            <td className="p-2 border">{row.size}</td>
                            <td className="p-2 border">{row.chest}</td>
                            <td className="p-2 border">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* Total Price */}
            <div className="flex justify-between items-center">
              <div className="text-base uppercase">
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
            <div className="mt-2">
              <Link
                to="/order-place"
                state={{
                  product: tuition,
                  quantity,
                  totalPrice,
                  selectedSize: selectedSize,
                }}
              >
                <button
                  disabled={!selectedSize}
                  className={`w-full md:w-1/2 py-4 px-6 text-baserounded-xl shadow-lg transition-all rounded uppercase
        ${
          selectedSize
            ? "bg-black hover:bg-gray-800 text-white"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }
      `}
                >
                  {selectedSize ? "Order Now" : "Select Size First"}
                </button>
              </Link>
            </div>
            {/* WhatsApps Order Button */}
            <div className="mt-4">
              <a
                href={`https://wa.me/8801745762857?text=${encodeURIComponent(
                  `Hello! I want to order:\nProduct: ${tuition.name}\nQuantity: ${quantity}\nSize: ${tuition.size}\nTotal: ৳${totalPrice}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-1/2 block py-4 px-6 bg-green-600 text-white text-l md:text-lg rounded shadow-lg hover:bg-green-700 hover:shadow-2xl transition-all text-center uppercase"
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
      {/* {showOrderForm && (
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
      )} */}

      <hr className="text-gray-400" />

      <div className="p-4">
        <button
          onClick={() => setOpens(!opens)}
          className="w-50 text-left font-medium flex justify-between items-center underline"
        >
          <span className="font-extralight">PRODUCTS DESCRIPTION</span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            opens ? "max-h-40 mt-3" : "max-h-0"
          }`}
        >
          <p className="uppercase text-sm">{tuition.description}</p>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="font-extralight underline px-4"
        >
          {open ? "HIDE REVIEWS" : "SHOW REVIEWS"}
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            open ? "opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="text-[13px]">
            <CustomerReview />
            <hr />
            <CustomerReviewSwiper />
          </div>
        </div>
        <hr className="mt-5 text-gray-400" />
        <RelatedProducts currentProduct={tuition} />
      </div>
    </div>
  );
};

export default ProductDetails;
