import React, { useMemo, useState } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Perfect Shirt",
    category: "Tips",
    date: "25 February 2026",
    read: "5 min read",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200",
    excerpt:
      "Discover how premium fabrics, proper fitting and timeless colors can completely transform your wardrobe.",
  },
  {
    id: 2,
    title: "Fashion Trends 2026",
    category: "Trends",
    date: "20 February 2026",
    read: "4 min read",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200",
    excerpt:
      "Explore the latest fashion trends that every modern wardrobe should include this season.",
  },
  {
    id: 3,
    title: "How To Care Your Shirt",
    category: "Care",
    date: "15 February 2026",
    read: "3 min read",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200",
    excerpt:
      "Keep your favorite shirts looking fresh with proper washing, drying and storage techniques.",
  },
];

const categories = ["All", "Tips", "Trends", "Care"];

const BlogPage = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCategory = category === "All" || post.category === category;

      const matchSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const featured = blogPosts[0];

  return (
    <div className="">
      {/* HERO */}
      <section
        className="relative h-[520px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white px-5">
          <p className="uppercase tracking-[8px] text-sm mb-5">LUNOR JOURNAL</p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Fashion
            <br />
            Inspiration
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg">
            Explore styling tips, premium fashion trends and clothing
            inspiration from Lunor.
          </p>
        </div>
      </section>

      {/* FEATURED */}

      <section className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="overflow-hidden rounded">
            <img
              src={featured.image}
              className="w-full h-[500px] object-cover hover:scale-105 duration-700"
            />
          </div>

          <div>
            <span className="uppercase tracking-[4px] text-xs text-gray-500">
              Featured Article
            </span>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              {featured.title}
            </h2>

            <div className="flex gap-5 mt-5 text-sm text-gray-500">
              <span>{featured.date}</span>
              <span>{featured.read}</span>
            </div>

            <p className="text-gray-600 mt-8 leading-8">{featured.excerpt}</p>

            <button className="mt-10 flex items-center gap-2 bg-black text-white px-8 py-4 hover:bg-gray-800 duration-300">
              Read Article
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="max-w-7xl mx-auto px-5">
        <div className=" rounded-2xl p-4">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            <div className="relative flex-1">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full h-14 rounded-full border pl-14 pr-5 outline-none focus:border-black"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-6 h-12 rounded-full border duration-300 ${
                    category === item
                      ? "bg-black text-white border-black"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-28">
            <h2 className="text-3xl font-bold mb-3">No Articles Found</h2>
            <p className="text-gray-500">Try searching with another keyword.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white border border-gray-100 rounded overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-72 w-full object-cover group-hover:scale-110 duration-700"
                  />
                </div>

                <div className="p-7">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest mb-5">
                    <span className="bg-black text-white px-3 py-1 rounded-full">
                      {post.category}
                    </span>

                    <span className="text-gray-400">{post.read}</span>
                  </div>

                  <h2 className="text-2xl font-bold leading-snug mb-4 text-black duration-300">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 leading-7 mb-6">{post.excerpt}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{post.date}</span>

                    <button className="flex items-center gap-2 font-semibold hover:gap-4 duration-300">
                      Read More
                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* NEWSLETTER */}

      <section className="max-w-7xl mx-auto px-5 pb-24">
        <div className="rounded bg-black text-white py-20 px-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-[6px] text-gray-400 text-sm">
              Stay Connected
            </p>

            <h2 className="text-5xl font-bold mt-5 leading-tight">
              Subscribe To Our Newsletter
            </h2>

            <p className="text-gray-400 mt-6 leading-8">
              Be the first to receive new arrivals, styling tips, exclusive
              discounts and premium fashion inspiration.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-14 rounded-full px-6 text-black outline-none"
              />

              <button className="bg-white text-black rounded-full px-10 hover:bg-gray-200 duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="max-w-7xl mx-auto px-5 pb-28">
        <div className="border rounded py-20 px-10 text-center">
          <p className="uppercase tracking-[5px] text-sm text-gray-500">
            Premium Collection
          </p>

          <h2 className="text-5xl font-bold mt-5">Upgrade Your Wardrobe</h2>

          <p className="max-w-2xl mx-auto text-gray-600 mt-6 leading-8">
            Discover premium shirts designed with comfort, quality and timeless
            elegance.
          </p>

          <Link to="/all-products">
            <button className="mt-10 bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 duration-300">
              Shop Collection
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
