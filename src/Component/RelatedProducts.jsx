import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios";
import ProductCard from "../Component/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const RelatedProducts = ({ currentProduct }) => {
  const axiosSecure = useAxiosSecure();
  const category = currentProduct?.category;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["related-products", category],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions-pagination", {
        params: {
          page: 1,
          limit: 12,
          status: "Approved",
          category,
        },
      });
      return res.data;
    },
    enabled: !!category,
  });

  const products = data?.tuitions || [];

  const filtered = products.filter((item) => item._id !== currentProduct?._id);

  if (!category)
    return <p className="text-center py-4">No Similar products found.</p>;

  if (isLoading) {
    return (
      <p className="text-center py-4 text-gray-500">
        Loading similar products...
      </p>
    );
  }

  return (
    <div className="my-5 p-4">
      <h2 className="text-2xl text-center mb-4">SIMILAR PRODUCTS</h2>

      <Swiper
        spaceBetween={15}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {filtered.slice(0, 10).map((item) => (
          <SwiperSlide key={item._id}>
            <ProductCard tuition={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProducts;
