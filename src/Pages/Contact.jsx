// src/sections/ContactUs.jsx
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxios";

const ContactUs = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Contact Form:", data);
    await axiosSecure.post("/contact", data);
    Swal.fire(
      "Thank you! We received your message. Our team will contact you within 24 hours.",
      {
        position: "top-right",
        autoClose: 5000,
      },
    );
    reset();
  };

  return (
    <section className="rounded py-20 bg-linear-to-r from-gray-50 to-gray-100">
      <title>Harir Shad | Contact</title>
      <div className="w-11/12 mx-auto px-1 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4">
            Get in Touch <span className="text-gray-400">With Us</span>
          </h2>
          <p className="text-l text-gray-600 max-w-2xl mx-auto">
            Have questions? Need help? We're here 24 hour for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-indigo-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-5 py-4 text-black rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 transition-all outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  className="w-full px-5 py-4 text-black rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 transition-all outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <input
                type="number"
                placeholder="Your Contact Number"
                {...register("number", {
                  required: "Number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Number must be 11 digits",
                  },
                })}
                className="w-full px-5 py-4 text-black rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 transition-all outline-none"
              />

              <div>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-5 py-4 text-black rounded-xl border border-gray-300 focus:border-gray-600 focus:ring-4 focus:ring-gray-200 transition-all outline-none resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-gray-400 to-purple-300 text-white font-bold py-2 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            {[
              {
                icon: FaPhoneAlt,
                title: "Call Us",
                info: "+880 1745762857",
                sub: "Everyday",
              },
              {
                icon: FaEnvelope,
                title: "Email Us",
                info: "lunor2026@gmail.com",
                sub: "We reply within 2 hours",
              },
              {
                icon: FaMapMarkerAlt,
                title: "Office Location",
                info: "Dhunat more ,Sherpur, Bogura, Bangladesh, 5840",
                sub: "Bangladesh",
              },
              {
                icon: FaClock,
                title: "Emergency",
                info: "+880 1745762857",
                sub: "24 hour Support",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-5 border border-indigo-100 hover:shadow-xl transition-all"
              >
                <div className="text-indigo-600 bg-indigo-100 p-2 rounded-full">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    {item.title}
                  </h4>
                  <p className="text-l font-semibold text-gray-400 mt-1">
                    {item.info}
                  </p>
                  <p className="text-gray-600 text-sm">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h4 className="font-bold text-xl mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61587197698698#"
                  className="bg-indigo-600 text-white p-4 rounded-full hover:bg-indigo-700 transition"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="+880 1616-084840"
                  className="bg-green-600 text-white p-4 rounded-full hover:bg-green-700 transition"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
