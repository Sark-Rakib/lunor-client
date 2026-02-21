import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import SkeletonLoader from "../Component/SkeletonLoader";

const Pant = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchSweetProducts = async () => {
      try {
        const res = await axiosSecure.get("/products?category=pant");

        // backend theke array or object dui ta handle
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        // approved only (same as Products page)
        const approved = data.filter((item) => item.status === "Approved");

        setSweets(approved);
      } catch (error) {
        console.error("Sweet fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSweetProducts();
  }, [axiosSecure]);

  if (loading) {
    return (
      <p className="text-center py-20">
        <SkeletonLoader></SkeletonLoader>
      </p>
    );
  }

  return (
    <section className="bg-gray-200 py-10 ">
      <title>Lunor | Pant</title>
      <div className="w-11/12 mx-auto px-2 md:px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            All <span className="text-gray-400">Pants</span>
          </h2>
          <p className="text-gray-600 mt-2">Pant Collection</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {sweets.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-40 md:h-48">
                <img
                  src={
                    item.images[0]?.url ||
                    item.images[0] ||
                    "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />

                <span className="absolute top-3 right-3 bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.ability}
                </span>
              </div>

              {/* Content */}
              <div className="p-2 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2">
                    {item.name}
                  </h3>

                  {/* <div className="flex flex-wrap justify-between text-sm mt-1">
                    <span className="text-black">Category :</span>
                    <span className="text-black">{item.category}</span>
                  </div> */}

                  {/* Price */}
                  <div className="flex flex-wrap items-center justify-between mt-1">
                    {item.discountPrice ? (
                      <>
                        <span className="text-black text-sm">
                          Price : ৳{item.discountPrice}
                        </span>
                        <span className="text-red-400 line-through text-sm">
                          ৳{item.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-black text-sm">
                        Price : ৳{item.price}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-black line-clamp-2">
                    {item.description || "Premium quality product"}
                  </p>
                </div>

                {/* Button */}
                <Link to={`/products-details/${item._id}`} className="mt-4">
                  <button className="w-full py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-400 transition-all">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {sweets.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No pant items found 😢
          </p>
        )}
      </div>
    </section>
  );
};

export default Pant;
