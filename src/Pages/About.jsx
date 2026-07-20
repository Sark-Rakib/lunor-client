import { motion } from "framer-motion";
import { FiCheck, FiArrowRight, FiAward, FiTruck } from "react-icons/fi";
import aboutImg from "../assets/2f6a0e78-37e2-480b-9ab0-f6bd16373f85.jpg-removebg-preview.png";
import { Link } from "react-router";
import Map from "../Component/Map";

const About = () => {
  const features = [
    "Premium Quality Fabric",
    "Modern Fashion Design",
    "Fast Nationwide Delivery",
    "Secure Shopping Experience",
  ];

  return (
    <section className="py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[4px] text-sm text-gray-500">
            About LUNOR
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
            Fashion That Defines
            <br />
            Your Identity
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            LUNOR is a modern fashion brand dedicated to creating premium
            clothing that blends timeless elegance with everyday comfort. Every
            collection is crafted with attention to quality, detail, and
            confidence.
          </p>

          <p className="mt-5 text-gray-600 leading-8">
            Whether you're dressing for work, special occasions, or casual
            outings, our collections are designed to help you express your
            personality with style.
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <FiCheck />
                </div>

                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5 mt-10">
            <div className="border rounded p-6 text-center hover:shadow-lg duration-300">
              <h3 className="text-3xl font-bold">1K+</h3>
              <p className="text-gray-500 mt-2">Happy Customers</p>
            </div>

            <div className="border rounded p-6 text-center hover:shadow-lg duration-300">
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="text-gray-500 mt-2">Premium Products</p>
            </div>
          </div>

          {/* Button */}
          <Link to="/all-products">
            <button className="mt-10 bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-zinc-800 duration-300">
              Explore Collection
              <FiArrowRight />
            </button>
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gray-100 rounded"></div>

          {/* Image */}
          <div className="relative rounded overflow-hidden">
            <img
              src={aboutImg}
              alt="OXIVOS Fashion"
              className="w-full h-[350px] sm:h-[450px] lg:h-[650px] object-contain"
            />
          </div>

          {/* Floating Card 1 */}
          <div className="hidden lg:flex absolute bottom-8 left-8 bg-white rounded shadow-xl px-6 py-5 items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">
              <FiAward size={24} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-black">5+ Years</h3>
              <p className="text-sm text-gray-500">Fashion Excellence</p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="hidden lg:flex absolute top-8 right-8 bg-white rounded shadow-xl px-6 py-5 items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">
              <FiTruck size={24} />
            </div>

            <div>
              <h3 className="font-bold text-black">Fast Delivery</h3>

              <p className="text-sm text-gray-500">Across Bangladesh</p>
            </div>
          </div>
        </motion.div>
        <Map></Map>
      </div>
    </section>
  );
};

export default About;
