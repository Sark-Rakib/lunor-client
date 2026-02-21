import { motion } from "framer-motion";
import aboutImg from "../assets/2f6a0e78-37e2-480b-9ab0-f6bd16373f85.jpg-removebg-preview.png";

const About = () => {
  return (
    <section className="bg-amber-50 py-20">
      <title>Lunor | About</title>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text + Owner */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-amber-700">
            About <span className="text-amber-900">Lunor</span>
          </h2>

          {/* Brand Story */}
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold">Harir Shad</span>, we bring
            authentic Bangladeshi flavors to your table. From creamy doi to
            indulgent sweets like rasmalai and misty, every dish is made fresh
            with love, care, and the highest quality ingredients.
          </p>

          {/* Owner Profile */}
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
            alt="Traditional Bangladeshi Food"
            className="w-full md:w-[400px] rounded-xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
