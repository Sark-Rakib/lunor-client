import { useState } from "react";

const colorOptions = [
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
  { name: "Navy Blue", code: "#000080" },
  { name: "Sky Blue", code: "#87CEEB" },
  { name: "Royal Blue", code: "#4169E1" },
  { name: "Grey", code: "#808080" },
  { name: "Ash", code: "#B2BEB5" },
  { name: "Red", code: "#FF0000" },
  { name: "Maroon", code: "#800000" },
  { name: "Green", code: "#008000" },
  { name: "Olive Green", code: "#808000" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Orange", code: "#FFA500" },
  { name: "Pink", code: "#FFC0CB" },
  { name: "Purple", code: "#800080" },
  { name: "Brown", code: "#A52A2A" },
  { name: "Beige", code: "#F5F5DC" },
  { name: "Cream", code: "#FFFDD0" },
  { name: "Khaki", code: "#C3B091" },
  { name: "Off White", code: "#FAF9F6" },
];

const ProductFilter = ({ onFilterChange }) => {
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });

  const [sizes, setSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [open, setOpen] = useState(false);

  const sendFilter = (
    updatedPrice = price,
    updatedSizes = sizes,
    updatedColors = selectedColors,
  ) => {
    onFilterChange({
      min: updatedPrice.min,
      max: updatedPrice.max,
      sizes: updatedSizes,
      colors: updatedColors,
    });
  };

  const handleSizeChange = (size) => {
    const updatedSizes = sizes.includes(size)
      ? sizes.filter((item) => item !== size)
      : [...sizes, size];

    setSizes(updatedSizes);

    sendFilter(price, updatedSizes, selectedColors);
  };

  const handleColorChange = (color) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((item) => item !== color)
      : [...selectedColors, color];

    setSelectedColors(updatedColors);

    sendFilter(price, sizes, updatedColors);
  };

  const handlePriceChange = (e) => {
    const updatedPrice = {
      ...price,
      [e.target.name]: e.target.value,
    };

    setPrice(updatedPrice);

    sendFilter(updatedPrice, sizes, selectedColors);
  };

  const clearFilter = () => {
    const resetPrice = {
      min: "",
      max: "",
    };

    setPrice(resetPrice);
    setSizes([]);
    setSelectedColors([]);

    onFilterChange({
      min: "",
      max: "",
      sizes: [],
      colors: [],
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-5 py-3 tracking-[2px] text-sm"
      >
        FILTER & SORT
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[320px] bg-white overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-sm tracking-[4px] font-medium">FILTERS</h2>

              <button onClick={() => setOpen(false)} className="text-2xl">
                ×
              </button>
            </div>

            {/* Price */}
            <div className="border-b pb-6 mb-6">
              <h3 className="text-sm tracking-[3px] mb-4">PRICE RANGE</h3>

              <div className="space-y-3">
                <input
                  type="number"
                  name="min"
                  placeholder="Minimum Price"
                  value={price.min}
                  onChange={handlePriceChange}
                  className="input input-bordered w-full"
                />

                <input
                  type="number"
                  name="max"
                  placeholder="Maximum Price"
                  value={price.max}
                  onChange={handlePriceChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Size */}
            <div className="border-b pb-6 mb-6">
              <h3 className="text-sm tracking-[3px] mb-4">SIZE</h3>

              <div className="space-y-3">
                {["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"].map(
                  (size) => (
                    <label key={size} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={sizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      />

                      {size}
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Color */}
            <div className="border-b pb-6 mb-6">
              <h3 className="text-sm tracking-[3px] mb-4">COLORS</h3>

              <div className="space-y-3">
                {colorOptions.map((color) => (
                  <label
                    key={color.name}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color.name)}
                      onChange={() => handleColorChange(color.name)}
                    />

                    <span
                      className="w-5 h-5 rounded-full border"
                      style={{
                        backgroundColor: color.code,
                      }}
                    />

                    <span>{color.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilter}
              className="btn w-full bg-black text-white"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
