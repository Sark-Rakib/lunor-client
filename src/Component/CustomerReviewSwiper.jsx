import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import useAxiosSecure from "../Hooks/useAxios";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { CiStar } from "react-icons/ci";

// CustomerReview Swiper component
const CustomerReviewSwiper = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/reviews");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.reviews || [];
        setReviews(data);
      } catch (error) {
        console.error("Review fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  if (loading) return <p className="text-center py-20">Loading reviews...</p>;
  if (reviews.length === 0)
    return <p className="text-center py-20">No reviews found 😢</p>;

  return (
    <section className="max-w-7xl mx-auto px-5">
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          stretch: "50%",
          rotate: 30,
          depth: 200,
          modifier: 1,
          scale: 0.75,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            // Mobile
            slidesPerView: 1,
          },
          640: {
            // Small devices
            slidesPerView: 2,
          },
          1024: {
            // Desktop
            slidesPerView: 3,
          },
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper my-10"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <p className="italic text-black mb-4">"{item.message}"</p>
                <p className="italic text-black mb-4 flex gap-1">
                  {Array.from({ length: item.rating }, (_, i) => (
                    <CiStar key={i} className="" />
                  ))}
                </p>
                <p className="font-semibold text-black">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default CustomerReviewSwiper;
