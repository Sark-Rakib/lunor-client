import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

const HeroSection = () => {
  const [images, setImages] = useState([]);
  // const [current, setCurrent] = useState(0);
  const axiosSecure = useAxiosSecure();

  // Fetch images from MongoDB (backend)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axiosSecure.get("/photos");
        const heroImages = res.data.map((product) => product.images[0]);
        setImages(heroImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [axiosSecure]);

  return (
    <Link to="/all-products">
      <section className="relative w-full h-[35vh] sm:h-[60vh] md:h-[77vh] overflow-hidden">
        {/* Carousel */}
        <div className="relative w-full h-full">
          <Swiper
            key={images.length}
            slidesPerView={1}
            loop={images.length > 1}
            autoplay={
              images.length > 1
                ? { delay: 2500, disableOnInteraction: false }
                : false
            }
            modules={[Autoplay]}
            className="absolute w-full h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="relative flex justify-center">
                <img
                  src={img?.url || "/placeholder.jpg"}
                  alt="Hero"
                  className="w-full h-full"
                />
                {/* Text + Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-6 mb-10">
                  {/* <h1 className="text-3xl md:text-5xl font-bold">
                    LUNOR COLLECTION
                    <br />
                  </h1> */}

                  {/* <Link to="/all-products">
            <button className="mt-8 mb-4 px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded text-white font-semibold shadow-xl">
              Explore Now
            </button>
          </Link> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Link>
  );
};

export default HeroSection;
