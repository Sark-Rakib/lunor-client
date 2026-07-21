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
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

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
  const [selectedColor, setSelectedColor] = useState(null);
  // const [activeImage, setActiveImage] = useState(0);
  // const { user } = useAuth();
  const { role } = UseRole();

  // Order form modal state

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const category = (tuition?.category || "").toLowerCase();

  const pantCategories = ["baggy", "trousers", "jeans", "chino"];

  const shirtCategories = ["formal shirt", "casual shirt", "t-shirt"];

  const hasColor = Array.isArray(tuition?.color) && tuition.color.length > 0;

  const sizeOptions = pantCategories.includes(category)
    ? ["28", "30", "32", "34", "36"]
    : ["S", "M", "L", "XL", "2XL"];

  const noSizeCategories = ["sunglass"];

  const isSizeRequired = !noSizeCategories.includes(category);

  const showSizeChartOption =
    pantCategories.includes(category) || shirtCategories.includes(category);
  const stock = Number(tuition.piece);

  return (
    <div className="min-h-screen flex flex-col">
      <title>Lunor | Details</title>
      <div className="w-11/12 mx-auto lg:px-50 py-7">
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-5 text-xs font-extralight uppercase">
          <Link to="/" className="text-gray-400 hover:text-black">
            Home
          </Link>

          <span>/</span>

          <Link to="/all-products" className="text-gray-400 hover:text-black">
            Products
          </Link>

          <span>/</span>

          <span className="">{tuition.name}</span>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row lg:flex-row lg:gap-5">
          {/* Product Image */}

          <ProductImages images={tuition.images} loading="lazy" />

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-2xl uppercase">{tuition.name}</h1>
            <h1 className="text-xs uppercase">Product code : {tuition._id}</h1>
            <div className="flex items-center gap-10">
              <h1 className="text-[10px] bg-black text-white rounded-full w-max px-3 uppercase">
                {tuition.ability}
              </h1>

              {/* Product piece */}

              <div className="mb-1">
                <p
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extralight uppercase ${
                    stock === 0
                      ? "text-red-600"
                      : stock < 3
                        ? "text-red-600"
                        : "text-green-600"
                  }`}
                >
                  {stock === 0
                    ? "Out of Stock"
                    : stock < 3
                      ? `! Only ${stock} item left in stock`
                      : `${stock} items available in stock`}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              {tuition.discountPrice ? (
                <>
                  <span className="text-red-400 line-through font-medium md:text-lg">
                    Tk {tuition.price} BDT
                  </span>
                  <span className="sm:text-l md:text-lg">
                    Tk {tuition.discountPrice} BDT
                  </span>
                </>
              ) : (
                <span className="text-lg">Tk {tuition.price} BDT</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="uppercase text-[13px]">Quantity </span>
              <div className="flex items-center overflow-hidden">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-3 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="px-3 bg-white text-gray-900 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-3  bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Product color */}

            {hasColor && (
              <div>
                <p className="text-[13px] mb-2 mt-1 uppercase">Select Color</p>

                <div className="flex flex-wrap gap-4">
                  {Array.isArray(tuition.color) &&
                    tuition.color.map((color) => (
                      <div
                        key={color.name}
                        className="flex flex-col items-center gap-1"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          title={color.name}
                          className={`w-7 h-7 rounded border-2 transition-all relative ${
                            selectedColor?.code === color.code
                              ? "border-black ring-black"
                              : "border-gray-200"
                          }`}
                          style={{
                            backgroundColor: color.code,
                          }}
                        >
                          {selectedColor?.code === color.code && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                              ✓
                            </span>
                          )}
                        </button>

                        <span className="text-[8px] uppercase">
                          {color.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Size Selector with Selection */}

            {isSizeRequired && (
              <div className="mt-1">
                <p className="text-[13px] mb-3 uppercase">Select Size</p>

                <div className="flex flex-wrap gap-4">
                  {sizeOptions.map((size) => {
                    const isAvailable = tuition?.sizes?.includes(size);
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        className={`w-8 h-8 rounded border-2 text-sm font-medium
            ${
              !isAvailable
                ? "border-gray-300 text-gray-400 line-through"
                : isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-400"
            }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {!selectedSize && (
                  <p className="text-red-500 text-[12px] mt-2">
                    {/* Please select a size * */}
                  </p>
                )}
              </div>
            )}

            {/* chart */}

            {showSizeChartOption && (
              <>
                <button
                  type="button"
                  onClick={() => setShowSizeChart(true)}
                  className="mt-2 text-[12px] underline hover:text-gray-700 cursor-pointer transition-all text-start uppercase"
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
                      {pantCategories.includes(category) ? (
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
              </>
            )}

            {/* Total Price */}
            <div className="flex justify-between items-center">
              <div className="text-[16px] uppercase">
                <span>Total Price </span>
                <span className="">Tk {totalPrice} BDT</span>
              </div>

              {role === "admin" && (
                <Link
                  to={`/dashboard/tuition/${id}/edit`}
                  className="border px-4 py-2 rounded hover:bg-gray-600 transition-colors"
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
                  selectedColor,
                }}
              >
                <button
                  disabled={
                    hasColor
                      ? !selectedColor || (isSizeRequired && !selectedSize)
                      : isSizeRequired && !selectedSize
                  }
                  className={`w-full md:w-1/2 py-4 px-6 rounded uppercase
${
  hasColor
    ? selectedColor && (!isSizeRequired || selectedSize)
      ? "bg-black hover:bg-gray-800 text-white"
      : "border cursor-not-allowed"
    : !isSizeRequired || selectedSize
      ? "bg-black hover:bg-gray-800 text-white"
      : "border cursor-not-allowed"
}`}
                >
                  {hasColor
                    ? selectedColor && (!isSizeRequired || selectedSize)
                      ? "Order Now"
                      : !selectedColor
                        ? "Select Color"
                        : "Select Size"
                    : !isSizeRequired || selectedSize
                      ? "Order Now"
                      : "Select Size"}
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

            <div className="flex justify-between items-center flex-row-reverse mt-4">
              <div className="p-2 text-right text-xs text-gray-400">
                Posted: {formatDate(tuition.postedAt)}
              </div>

              {/* social media link */}

              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61560576206601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300"
                >
                  <FaFacebookF size={18} />
                </a>

                <a
                  href="https://www.instagram.com/wear.lunor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all duration-300"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="https://www.tiktok.com/@lunor.official3?_r=1&_t=ZS-98E2lNXQOhg&fbclid=IwY2xjawTMoPhleHRuA2FlbQIxMABicmlkETE4Tlo1eFdhM0g1SUpTNmJYc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHr7MFe0NcvmdFvVPjDQhuC4Uy6Xt329dmUyzw20xg8cOm1fICQjuE08GPVot_aem_1OoD5uxhQaLY4gbDdxgZuQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <FaTiktok size={18} />
                </a>

                <a
                  href="https://wa.me/8801745762857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300"
                >
                  <FaWhatsapp size={18} />
                </a>

                <a
                  href="https://www.youtube.com/@rakibrecord"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-300"
                >
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* review section */}

      <hr className="text-gray-400 mb-5" />

      <div className="sm:w-11/14 lg:w-11/14 mx-auto rounded  justify-center text-left items-center bg-gray-50">
        <div className="p-4 text-black">
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
            className="font-extralight underline px-4 text-black"
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
          {/* <hr className="mt-5 text-gray-400" /> */}
        </div>
      </div>
      <RelatedProducts currentProduct={tuition} />
    </div>
  );
};

export default ProductDetails;
