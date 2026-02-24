import React, { useState } from "react";

const allPosts = [
  {
    id: 1,
    title: "How to Choose the Perfect Shirt",
    date: "February 25, 2026",
    category: "Tips",
    excerpt:
      "Choosing the right shirt involves considering quality, fit, and fabric. Here are some tips to help you make the best choice.",
  },
  {
    id: 2,
    title: "Fashion Trends 2026: Shirts You Should Try",
    date: "February 20, 2026",
    category: "Trends",
    excerpt:
      "Stay ahead of the trends with the most popular shirt styles and colors for this year.",
  },
  {
    id: 3,
    title: "Easy Tips to Care for Your Shirts",
    date: "February 15, 2026",
    category: "Care",
    excerpt:
      "Learn how to properly wash, iron, and store your shirts to make them last longer.",
  },
  {
    id: 4,
    title: "Why Fabric Matters: Cotton vs Polyester",
    date: "February 10, 2026",
    category: "Tips",
    excerpt:
      "Understand the differences between fabrics and how they affect comfort, durability, and style.",
  },
  {
    id: 5,
    title: "Top 5 Shirt Styles for 2026",
    date: "February 5, 2026",
    category: "Trends",
    excerpt:
      "From casual to formal, discover the top shirt styles that every wardrobe should have.",
  },
  {
    id: 6,
    title: "How to Mix Colors with Shirts",
    date: "February 1, 2026",
    category: "Style",
    excerpt:
      "Learn how to combine colors and patterns to elevate your outfit with style.",
  },
];

const categories = ["All", "Tips", "Trends", "Care", "Style"];
const POSTS_PER_PAGE = 3;

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts by category
  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);

  // Pagination
  const indexOfLast = currentPage * POSTS_PER_PAGE;
  const indexOfFirst = indexOfLast - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-6xl font-bold mb-4">Lunor Blog</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Discover tips, trends, and style guides to elevate your shirt game
          with Lunor.
        </p>
      </section>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-gray-700 text-white border-gray-700"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-gray-400 hover:text-white transition-colors`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Blog Posts */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-sm">{post.date}</span>
              <span className="text-gray-700 text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h2 className="text-3xl text-black font-bold mb-3">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.excerpt}</p>
            <button className="bg-gray-700 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Read More
            </button>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <section className="flex justify-center mb-16">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 mx-1 rounded-full border ${
              currentPage === i + 1
                ? "bg-gray-700 text-white border-gray-700"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-gray-400 hover:text-white transition-colors`}
          >
            {i + 1}
          </button>
        ))}
      </section>

      {/* Newsletter */}
      <section className="w-11/12 mx-auto bg-linear-60 to-gray-100 from-gray-200 py-15 px-6 text-black text-center rounded-lg mb-10">
        <h2 className="text-4xl font-bold mb-4">
          Subscribe to Lunor Newsletter
        </h2>
        <p className="mb-6 text-lg">
          Get the latest tips, trends, and exclusive offers straight to your
          inbox.
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg text-gray-800 flex-1 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default BlogPage;
