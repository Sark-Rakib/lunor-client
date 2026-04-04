import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../assets/Cp2tH1Cw12HTVWR8leFbt967yStScupLurt5wCXb.webp";
import image2 from "../assets/NODEJdh8UKtH2gLPmruHIyXq2lSPSZA0jH1cOgNz.webp";
import image3 from "../assets/SVfuyYnesEr4n0uQKQGShy7gOjDu1Ed6k8KS5hSm.webp";
import image4 from "../assets/YnrwXKeozrIsNeQe2RwAsp0WF1X8scWAhuBzBslD.webp";
import image5 from "../assets/C0GPGCV8NviKRHCHt9nUUHpgSRwxfEVQsXiX2VxB.webp";
import { Link } from "react-router";

const TrandingCategory = () => {
  return (
    <div className="w-full">
      <h1 className="text-center mt-7 text-2xl font-medium md:text-4xl">
        Trending Category
      </h1>

      <div className="mt-7 px-2 md:px-6">
        <Swiper
          spaceBetween={15}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay]}
          // 🔥 responsive part
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          <SwiperSlide className="relative">
            <img
              src={image1}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <Link
              to="/formal-shirt"
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-2 py-2 text-sm md:text-base rounded"
            >
              FOR MEN
            </Link>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <img
              src={image2}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <Link
              to="/pant"
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-2 py-2 text-sm md:text-base rounded"
            >
              FOR MEN
            </Link>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <img
              src={image3}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <Link
              to="/t-shirt"
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-2 py-2 text-sm md:text-base rounded"
            >
              FOR MEN
            </Link>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <img
              src={image4}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <Link
              to="/casual-shirt"
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-2 py-2 text-sm md:text-base rounded"
            >
              FOR MEN
            </Link>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <img
              src={image5}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <Link
              to="/panjabi"
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-2 py-2 text-sm md:text-base rounded"
            >
              FOR MEN
            </Link>
          </SwiperSlide>

          {/* {[1, 2, 3, 4].map((_, i) => (
            <SwiperSlide key={i} className="relative">
              <img
                src="https://i.ibb.co/2sZzj8h/1.jpg"
                alt="Hero"
                className="w-full h-40 md:h-52 lg:h-60 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))} */}
        </Swiper>
      </div>
    </div>
  );
};

export default TrandingCategory;
