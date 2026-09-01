import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

const HeroSection = () => {
  const [heroMedia, setHeroMedia] = useState([]);

  const axiosSecure = useAxiosSecure();

  // Fetch hero media from MongoDB
  useEffect(() => {
    const fetchHeroMedia = async () => {
      try {
        const res = await axiosSecure.get("/photos");

        setHeroMedia(res.data);
      } catch (error) {
        console.error("Failed to fetch hero media:", error);
      }
    };

    fetchHeroMedia();
  }, [axiosSecure]);

  return (
    <Link to="/all-products" className="block">
      <section className="relative w-full h-[35vh] sm:h-[60vh] md:h-[77vh] overflow-hidden">
        <div className="relative w-full h-full">
          <Swiper
            key={heroMedia.length}
            slidesPerView={1}
            loop={heroMedia.length > 1}
            autoplay={
              heroMedia.length > 1
                ? {
                    delay: 2500,
                    disableOnInteraction: false,
                  }
                : false
            }
            modules={[Autoplay]}
            className="absolute w-full h-full"
          >
            {heroMedia.map((media, index) => {
              // New structure
              const isVideo = media.type === "video";

              // New URL structure
              // Also supports your old images[0].url structure
              const mediaUrl =
                media.url || media.images?.[0]?.url || "/placeholder.jpg";

              return (
                <SwiperSlide
                  key={media._id || index}
                  className="relative w-full h-full"
                >
                  {isVideo ? (
                    <video
                      src={mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt="Lunor Hero"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Optional dark overlay */}
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                  {/* Hero content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-6 mb-10 pointer-events-none">
                    {/*
                    <h1 className="text-3xl md:text-5xl font-bold">
                      LUNOR COLLECTION
                      <br />
                    </h1>

                    <button className="mt-8 mb-4 px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded text-white font-semibold shadow-xl">
                      Explore Now
                    </button>
                    */}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </Link>
  );
};

export default HeroSection;
