import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxios";
import Loading from "../Component/Loading";
import "swiper/css";
import "swiper/css/effect-coverflow";
import HeroSection from "../Component/HeroSection";
import CustomerReviewSwiper from "../Component/CustomerReviewSwiper";
import WhyChooseUs from "../Component/WhyChooseUs";
import Products from "../Component/Products";
import panjabi from "../assets/panjabiforhome.jpg";
import formal from "../assets/formalshirtforhome.png";
import casual from "../assets/CASUALSHIRTS.webp";
import pant from "../assets/pantforhome.webp";
import { Link } from "react-router";
import TrandingCategory from "../Component/TrandingCategory";
import OfferPopup from "../Component/OfferPopup";

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
      {/* <OfferPopup></OfferPopup> */}
      <HeroSection></HeroSection>
      <TrandingCategory></TrandingCategory>

      <div className="mt-10 relative">
        <img
          src={casual}
          alt="Hero"
          className="w-full h-50 sm:h-80 md:h-170 object-top object-cover"
        />
        <div className="text-center text-white/90 md:text-xl absolute top-1/2 right-1/4 transform translate-x-1/3 -translate-y-1/2 ">
          <p className="text-lg md:text-4xl font-semibold">
            CASUAL SHIRT COLLECTION
          </p>
          <Link
            to="/casual-shirt"
            className="bg-white/90 text-gray-800 cursor-pointer rounded py-1 px-3 text-center mt-1 inline-block"
          >
            FOR HIM
          </Link>
        </div>
      </div>

      <div className="mt-5 relative">
        <img
          src={pant}
          alt="Hero"
          className="w-full h-50 sm:h-80 md:h-170 object-cover"
        />
        <div className="text-center md:text-xl text-white/90 absolute top-1/2 left-1/4 transform -translate-x-1/3 -translate-y-1/2 ">
          <p className="text-lg md:text-4xl font-semibold">PANT COLLECTION</p>
          <Link
            to="/baggy"
            className="bg-white/80 text-gray-800 cursor-pointer rounded py-1 px-3 text-center mt-1 inline-block"
          >
            FOR HIM
          </Link>
        </div>
      </div>

      {/* feature products */}
      <Products></Products>

      <div className="mt-10 relative">
        <img src={formal} alt="Hero" className="w-full h-50 sm:h-80 md:h-170" />
        <div className="text-center md:text-xl text-white/90 absolute top-1/2 left-1/4 transform -translate-x-1/3 -translate-y-1/2 ">
          <p className="text-lg md:text-4xl font-semibold">
            FORMAL SHIRT COLLECTION
          </p>
          <Link
            to="/formal-shirt"
            className="bg-white/90 text-gray-800 cursor-pointer rounded py-1 px-3 text-center mt-1 inline-block"
          >
            FOR HIM
          </Link>
        </div>
      </div>

      <div className="mt-5 relative mb-10">
        <img
          src={panjabi}
          alt="Hero"
          className="w-full h-50 sm:h-80 md:h-170 object-top object-cover"
        />
        <div className="rounded py-2 px-3 text-center text-white md:text-xl absolute top-1/2 right-1/5 transform translate-x-1/3 -translate-y-1/2">
          <p className="text-lg md:text-4xl font-semibold">
            PANJABI COLLECTION
          </p>
          <Link
            to="/panjabi"
            className="bg-white/90 text-gray-800 cursor-pointer rounded py-1 px-3 text-center mt-1 inline-block"
          >
            SHOP NOW
          </Link>
        </div>
      </div>

      {/* <WhyChooseUs></WhyChooseUs> */}

      {/* ==================== TESTIMONIALS ==================== */}
      {/* <section className="w-11/12 mx-auto px-5 mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our <span className="text-gray-400">Customer Say's</span>
        </h2>
        <CustomerReviewSwiper></CustomerReviewSwiper>
      </section> */}
    </div>
  );
};

export default HomePage;
