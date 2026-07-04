import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import { FiTruck } from "react-icons/fi";
import { MdPayment } from "react-icons/md";

const OrderPlace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  // const [locations, setLocations] = useState({});
  const handleDistrictChange = (e) => {
    const value = e.target.value;

    setSelectedDistrict(value);

    setFormData((prev) => ({
      ...prev,
      district: value,
      street: "", // reset area
    }));
  };
  const { product, quantity, totalPrice, selectedSize, selectedColor } =
    location.state || {};

  useEffect(() => {
    if (!product) navigate("/");
  }, [product, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    address: "",
    paymentMethod: "",
    paymentType: "",
    transactionId: "",
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
        name: user.name || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const districts = [
    "Bagerhat",
    "Bandarban",
    "Barguna",
    "Barishal",
    "Bhola",
    "Bogura",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Chuadanga",
    "Comilla",
    "Cox's Bazar",
    "Dhaka",
    "Dinajpur",
    "Faridpur",
    "Feni",
    "Gaibandha",
    "Gazipur",
    "Gopalganj",
    "Habiganj",
    "Jamalpur",
    "Jashore",
    "Jhalokati",
    "Jhenaidah",
    "Joypurhat",
    "Khagrachari",
    "Khulna",
    "Kishoreganj",
    "Kurigram",
    "Kushtia",
    "Lakshmipur",
    "Lalmonirhat",
    "Madaripur",
    "Magura",
    "Manikganj",
    "Meherpur",
    "Moulvibazar",
    "Munshiganj",
    "Mymensingh",
    "Naogaon",
    "Narail",
    "Narayanganj",
    "Narsingdi",
    "Natore",
    "Netrokona",
    "Nilphamari",
    "Noakhali",
    "Pabna",
    "Panchagarh",
    "Patuakhali",
    "Pirojpur",
    "Rajbari",
    "Rajshahi",
    "Rangamati",
    "Rangpur",
    "Satkhira",
    "Shariatpur",
    "Sherpur",
    "Sirajganj",
    "Sunamganj",
    "Sylhet",
    "Tangail",
    "Thakurgaon",
  ];

  const deliveryCharge =
    formData.district?.toLowerCase() === "bogura"
      ? 80
      : formData.district?.toLowerCase() === "sirajganj"
        ? 110
        : 150;

  const subtotal = Number(totalPrice) || 0;
  const grandTotal = subtotal + deliveryCharge;

  const isOnlinePayment = formData.paymentMethod === "onlinePayment";

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!product) {
      Swal.fire({
        title: "Error",
        text: "Product information missing",
        icon: "error",
      });
      return;
    }

    if (!formData.paymentMethod) {
      Swal.fire({
        title: "Payment Required",
        text: "Please select a payment method",
        icon: "warning",
      });
      return;
    }

    if (isOnlinePayment && !formData.transactionId) {
      Swal.fire({
        title: "Required",
        text: "Please enter Transaction ID",
        icon: "warning",
      });
      return;
    }

    try {
      const orderData = {
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0] || "",
        quantity,
        totalPrice: subtotal,
        deliveryCharge,
        grandTotal,
        size: selectedSize || "Not specified",
        email: user?.email || formData.email,
        ...formData,
        postedAt: new Date().toLocaleString("en-BD", {
          timeZone: "Asia/Dhaka",
        }),
      };

      const res = await axiosSecure.post("/orders", orderData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Order Placed!",
          text: "Your order at LUNOR has been placed successfully 🎉",
          icon: "success",
          timer: 3000,
          toast: true,
          position: "center",
          showConfirmButton: false,
        });
        navigate("/order-success", {
          state: {
            orderId: res?.data?.orderId || `LUNOR-${Date.now()}`,
            product,
            quantity,
            totalPrice: subtotal,
            formData,
            paymentMethod: formData.paymentMethod,
            deliveryCharge,
            selectedSize,
            selectedColor,
            postedAt: new Date().toLocaleString("en-BD", {
              timeZone: "Asia/Dhaka",
            }),
          },
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: err?.response?.data?.message || "Failed to place order.",
        icon: "error",
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Loading order details...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center gap-2 mb-5 text-xs font-extralight uppercase">
          <Link to="/" className="text-gray-400 hover:text-black">
            Home
          </Link>

          <span>/</span>

          <Link to="/all-products" className="text-gray-400 hover:text-black">
            Products
          </Link>

          <span>/</span>

          <Link
            to={`/products-details/${product._id}`}
            className="text-gray-400 hover:text-black"
          >
            {product.name}
          </Link>

          <span>/</span>

          <span>order place</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* LEFT - SHIPPING ADDRESS */}
          <div className="p-4 border border-gray-300">
            <h2 className="text-l font-semibold mb-8 border-b pb-4">
              SHIPPING ADDRESS
            </h2>

            <form
              onSubmit={handleOrderSubmit}
              id="orderForm"
              className="space-y-6"
            >
              {/* ... Form ... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Full name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="jhon de"
                    required
                    className="w-full border border-gray-300 p-2 focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Phone number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+880"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 focus:border-black outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jhon@gmail.com"
                    value={formData.email}
                    disabled={!!user}
                    className="w-full border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleDistrictChange}
                    required
                    className="w-full border text-gray-500 border-gray-300 p-2 outline-none"
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-medium mb-1.5">
                  Area *
                </label>
                <select
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-2 focus:border-black outline-none"
                >
                  <option value="">Please select</option>
                  {selectedDistrict &&
                    districts[selectedDistrict]?.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                </select>
              </div> */}

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 p-2 focus:border-black outline-none resize-y"
                  placeholder="Address Details"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3 h-3 accent-red-600"
                />
                <span className="text-xs">
                  Billing Address Same As Shipping Address
                </span>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Review Cart */}
            <div className="p-4 border border-gray-300">
              <h2 className="text-l font-semibold mb-6">REVIEW CART</h2>
              <div className="flex gap-4">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold uppercase">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedSize} | {quantity} pcs
                  </p>
                  {selectedColor && (
                    <p className="flex items-center gap-2">
                      <span>{selectedColor.name}</span>
                      <span
                        className="w-5 h-5 rounded border border-gray-300"
                        style={{
                          backgroundColor: selectedColor.code,
                        }}
                      />
                    </p>
                  )}

                  <p className="font-semibold ">৳{subtotal}</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="border border-gray-300 p-4">
              <div>
                <h3 className="font-semibold mb-5">SUMMARY</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Charge</span>
                    <span>৳{deliveryCharge}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-l font-bold">
                    <span>Grand Total</span>
                    <span>৳{grandTotal}</span>
                  </div>
                </div>
              </div>

              <hr className="mt-6 text-gray-300" />

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold mt-4 mb-4">
                  Select Payment Method
                </h3>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      required
                      value="cod"
                      onChange={handleInputChange}
                    />
                    <FiTruck /> <span className="text-sm">C.O Delivery</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="onlinePayment"
                      required
                      onChange={handleInputChange}
                    />
                    <MdPayment />{" "}
                    <span className="text-sm">Online Payment</span>
                  </label>
                </div>

                {isOnlinePayment && (
                  <div className="mt-6 space-y-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            paymentType: "bKash",
                          }))
                        }
                        className={`flex-1 py-2 border rounded ${formData.paymentType === "bKash" ? "border-red-500 bg-red-50" : ""}`}
                      >
                        bKash
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, paymentType: "Nagad" }))
                        }
                        className={`flex-1 py-2 border rounded ${formData.paymentType === "Nagad" ? "border-red-500 bg-red-50" : ""}`}
                      >
                        Nagad
                      </button>
                    </div>

                    <div>
                      bkash/nagad number:{" "}
                      <span className="font-semibold">01745762857</span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Transaction ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        placeholder="Enter Transaction ID"
                        className="w-full border border-gray-300 p-3"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* delivary charge */}
              <div className="bg-gray-50 p-2 text-sm space-y-1 mt-4 rounded text-black">
                <p className="font-semibold">Delivery Charge :</p>

                <p className="border-b border-dotted">
                  Inside Bogura City — 80 Tk
                </p>

                <p className="border-b border-dotted">
                  Sirajganj (nearby district of Bogura) — 110 Tk
                </p>

                <p className="border-b border-dotted">
                  Outside Bogura — 150 Tk
                </p>

                <p className="border-b border-dotted">
                  Express delivery (only inside Bogura city) — 100 Tk
                </p>
              </div>
              {/* ORDER NOW BUTTON */}

              <div className="flex flex-col-reverse md:flex-row-reverse gap-3 mt-5">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("orderForm").requestSubmit()
                  }
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 text-sm font-semibold  transition"
                >
                  ORDER NOW — ৳{grandTotal}
                </button>
                <Link
                  to="/all-products"
                  className="w-full text-center bg-gray-700 hover:bg-gray-800 text-white py-3 text-sm font-semibold  transition"
                >
                  CONTINUE SHOPING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlace;
