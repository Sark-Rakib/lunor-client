import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "../Component/Loading";
import "swiper/css";
import "swiper/css/effect-coverflow";
import HeroSection from "../Component/HeroSection";
import CustomerReviewSwiper from "../Component/CustomerReviewSwiper";
import WhyChooseUs from "../Component/WhyChooseUs";
import Products from "../Component/Products";

const HomePage = () => {
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  //   const approvedTuition = tuitions.filter((t) => t.status === "Approved");
  // const approvedTutor = tutors.filter((t) => t.status === "Approved");

  return (
    <div className="">
      <HeroSection></HeroSection>
      <Products></Products>

      {/* 2️⃣ Features / Why Choose Us */}
      {/* <section className="py-16 bg-gradient-to-r from-yellow-50 to-amber-100">
        <div className="container mx-auto px-4 text-center text-black">
          <h2 className="text-3xl font-bold mb-10">
            Why <span className="text-amber-600">Choose Us</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-amber-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <img
                src="/icons/fresh.png"
                alt="Fresh"
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">
                Made with only the freshest ingredients to ensure quality.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <img
                src="/icons/delivery.png"
                alt="Delivery"
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Delivered to your doorstep quickly and safely.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <img
                src="/icons/trusted.png"
                alt="Trusted"
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2">Trusted Quality</h3>
              <p className="text-gray-600">
                Trusted by hundreds of happy customers across the region.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <WhyChooseUs></WhyChooseUs>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="w-11/12 mx-auto px-5 mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our <span className="text-gray-400">Customer Say's</span>
        </h2>
        <CustomerReviewSwiper></CustomerReviewSwiper>
      </section>
    </div>
  );
};

export default HomePage;
