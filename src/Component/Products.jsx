import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import SkeletonLoader from "./SkeletonLoader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/tuitions");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.tuitions || [];

        // only approved products
        const approved = data.filter((item) => item.status === "Approved");

        setProducts(approved.slice(0, 4));
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (axiosSecure) {
      fetchProducts();
    }
  }, [axiosSecure]);

  return (
    <section className="py-10 border-b border-gray-400 overflow-hidden flex flex-col">
      <div className="px-3 md:px-6">
        {/* Title */}
        <div className="text-center mb-12 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Feature Products</h2>
          <Link
            to="/all-products"
            className="border-b cursor-pointer mt-1 flex items-center gap-2"
          >
            See All Products <FaArrowRight />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            <SkeletonLoader></SkeletonLoader>
          </p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {products.map((item) => (
            <Link to={`/products-details/${item._id}`} key={item._id}>
              <motion.div
                whileHover={{ y: -6 }}
                className="transition-all overflow-hidden flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      item.images[0] ||
                      "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"
                    }
                    alt={item.name}
                    className="w-full h-55 md:h-80 hover:scale-105 transition-transform duration-300"
                  />

                  {/* Status */}
                  <span className="absolute top-3 right-3 bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.ability}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-1 flex flex-col flex-1">
                  {/* Top content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                      {item.name}
                    </h3>

                    {/* category */}

                    {/* <div className="flex flex-wrap justify-between text-sm">
                    <h1 className="text-black">Category :</h1>
                    <h2 className=" text-gray-800">{item.category}</h2>
                  </div> */}

                    {/* Price */}
                    <div className="flex flex-wrap items-center justify-between mt-1">
                      {item.discountPrice ? (
                        <>
                          <span className="text-sm">
                            Price : ৳{item.discountPrice}
                          </span>
                          <span className="text-red-400 line-through text-sm">
                            ৳{item.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm">Price : ৳{item.price}</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm line-clamp-2">
                      {item.description || "Premium quality sweet product"}
                    </p>
                  </div>

                  {/* Button – always bottom */}
                  {/* <Link to={`/products-details/${item._id}`} className="mt-2">
                    <button className="w-full py-2 rounded bg-gray-600 text-white font-semibold hover:bg-gray-400 transition-all">
                      View Details
                    </button>
                  </Link> */}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* See All */}
        {/* <div className="flex justify-center mt-10">
          <Link to="/all-products">
            <button className="flex items-center gap-2 px-6 py-3 rounded bg-gray-600 text-white font-semibold hover:bg-gray-400 transition-all">
              See All Products <FaArrowRight />
            </button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Products;
