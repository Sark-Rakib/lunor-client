// src/components/WhyChooseUs.jsx
import React from "react";
import { GiMilkCarton, GiFastArrow, GiCheckMark } from "react-icons/gi";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <GiMilkCarton className="text-gray-500 text-4xl mx-auto mb-4" />,
      title: "Fresh Ingredients",
      description: "Made with only the freshest ingredients to ensure quality.",
    },
    {
      icon: <GiFastArrow className="text-gray-500 text-3xl mx-auto mb-4" />,
      title: "Fast Delivery",
      description: "Delivered to your doorstep quickly and safely.",
    },
    {
      icon: <GiCheckMark className="text-gray-500 text-3xl mx-auto mb-4" />,
      title: "Trusted Quality",
      description: "Trusted by hundreds of happy customers across the region.",
    },
  ];

  return (
    <section className=" py-16 bg-linear-to-r from-gray-200 to-gray-50">
      <div className="w-11/12  container mx-auto px-4 text-center text-black">
        <h2 className="text-3xl font-bold mb-10">
          Why <span className="text-gray-400">Choose Us</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              {feature.icon}
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
