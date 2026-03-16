import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxios";

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const axiosSecure = useAxiosSecure();

  // Fetch images from MongoDB (backend)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axiosSecure.get("/photos");
        // তোমার API route বসাও

        // সব product এর first image নিচ্ছি
        const heroImages = res.data.map((product) => product.images[0]);
        setImages(heroImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [axiosSecure]);

  // Auto slide
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="relative w-full h-[45vh] md:h-[90vh] overflow-hidden">
      {/* Carousel */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt="Hero"
            className="absolute w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: current === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute"></div>
      {/* inset-0 bg-black/40 */}

      {/* Text + Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          LUNOR COLLECTION
          <br />
        </h1>

        <Link to="/all-products">
          <button className="mt-8 mb-4 px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded text-white font-semibold shadow-xl">
            Explore Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
