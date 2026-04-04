import { motion } from "framer-motion";
import aboutImg from "../assets/2f6a0e78-37e2-480b-9ab0-f6bd16373f85.jpg-removebg-preview.png";

const About = () => {
  return (
    <section className="py-20">
      <title>Lunor | About</title>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-amber-700">
            About <span className="text-amber-900">Lunor</span>
          </h2>

          {/* Brand Story */}
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-semibold">Lunor</span> is a modern fashion
            brand dedicated to bringing timeless style and everyday comfort
            together. We specialize in premium shirts, stylish pants, and
            elegant panjabis crafted for men who value confidence and
            individuality.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            At Lunor, we believe clothing is more than just fabric — it's a
            statement of personality. Whether you're dressing for work, a
            celebration, or a casual outing, our collections are designed to
            make you look sharp and feel comfortable.
          </p>

          {/* Mission */}
          <div className=" mt-4">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To provide high-quality, affordable fashion that blends modern
              trends with cultural elegance.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={aboutImg}
            alt="Lunor Fashion Collection"
            className="w-full md:w-[420px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
