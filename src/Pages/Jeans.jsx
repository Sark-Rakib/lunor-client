import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import SkeletonLoader from "../Component/SkeletonLoader";
import Pagination from "../Component/Pagination";
import usePagination from "../Hooks/usePagination";
import ProductFilter from "../Component/ProductFilter";

const Jeans = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { currentData, currentPage, totalPages, handlePageChange } =
    usePagination(filteredProducts, 16);

  const handleFilter = (filters) => {
    let filtered = [...sweets];

    // Price
    if (filters.min) {
      filtered = filtered.filter(
        (item) =>
          Number(item.discountPrice || item.price) >= Number(filters.min),
      );
    }

    if (filters.max) {
      filtered = filtered.filter(
        (item) =>
          Number(item.discountPrice || item.price) <= Number(filters.max),
      );
    }

    // Size
    if (filters.sizes?.length > 0) {
      filtered = filtered.filter((item) => {
        if (!item.sizes) return false;

        return item.sizes.some((size) => filters.sizes.includes(size));
      });
    }

    // Color
    if (filters.colors?.length > 0) {
      filtered = filtered.filter((item) => {
        if (!item.color || !Array.isArray(item.color)) return false;

        return item.color.some((c) => filters.colors.includes(c.name));
      });
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const fetchSweetProducts = async () => {
      try {
        const res = await axiosSecure.get("/products?category=jeans");

        // backend theke array or object dui ta handle
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        const sorted = [...data].sort(
          (a, b) => new Date(b.postedAt) - new Date(a.postedAt),
        );

        // approved only (same as Products page)
        const approved = sorted.filter((item) => item.status === "Approved");

        setSweets(approved);
        setFilteredProducts(approved);
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
      <div className="text-center py-20 px-4">
        <SkeletonLoader></SkeletonLoader>
      </div>
    );
  }

  return (
    <section className="py-7">
      <title>Lunor | Jeans</title>
      <div className="px-4 sm:px-7 md:px-6">
        {/* Title */}
        <div className="flex items-center gap-2 mb-5 text-xs font-extralight uppercase">
          <Link to="/" className="text-gray-400 hover:text-black">
            Home
          </Link>
          <span>/</span>
          <span className="">Jeans</span>
        </div>

        <div className="mb-5">
          <ProductFilter onFilterChange={handleFilter} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {currentData.map((item) => (
            <Link to={`/products-details/${item._id}`} key={item._id}>
              <div className="transition-all overflow-hidden flex flex-col h-full">
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      item.images[0]?.url ||
                      item.images[0] ||
                      "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"
                    }
                    alt={item.name}
                    className="w-full h-55 sm:h-65 md:h-80 hover:scale-105 transition-transform duration-300"
                  />

                  <span className="absolute top-3 right-3 bg-gray-600 text-white text-[8px] px-1.5 py-0.5 rounded-full uppercase">
                    {item.ability}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-1 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="uppercase text-sm md:text-base line-clamp-1">
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
                          <span className=" text-sm uppercase">
                            Price : ৳{item.discountPrice}
                          </span>
                          <span className="text-red-400 line-through text-sm uppercase">
                            ৳{item.price}
                          </span>
                        </>
                      ) : (
                        <span className=" text-sm uppercase">
                          Price : ৳{item.price}
                        </span>
                      )}
                    </div>

                    {/* <p className="text-sm line-clamp-2 uppercase">
                      {item.description || "Premium quality product"}
                    </p> */}
                  </div>

                  {/* Button */}
                  {/* <Link to={`/products-details/${item._id}`} className="mt-4">
                    <button className="w-full py-2 rounded bg-gray-600 text-white font-semibold hover:bg-gray-400 transition-all">
                      View Details
                    </button>
                  </Link> */}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          itemsPerPage={16}
          onPageChange={handlePageChange}
        />

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No Jeans items found
          </p>
        )}
      </div>
    </section>
  );
};

export default Jeans;
