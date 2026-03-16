import React, { useState } from "react";
import { Link } from "react-router";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: "🛍️", link: "/all-products" },
    { id: "formal", name: "Formal Shirt", icon: "👔", link: "/formal-shirts" },
    { id: "casual", name: "Casual Shirt", icon: "👕", link: "/casual-shirts" },
    { id: "pant", name: "Pant", icon: "👖", link: "/pants" },
    { id: "shoes", name: "Shoes", icon: "👟", link: "/shoes" },
    {
      id: "accessories",
      name: "Accessories",
      icon: "⌚",
      link: "/panjabi",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="p-6 rounded-2xl border hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3 shadow-sm text-center"
            >
              <span className="text-3xl">{category.icon}</span>
              <p className="font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
