import { useEffect, useState } from "react";

const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("offerPopupShown");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("offerPopupShown", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded bg-white shadow-2xl">
        <button
          onClick={closePopup}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl font-bold shadow"
        >
          ×
        </button>

        <div className="bg-linear-to-r from-black to-gray-800 px-6 py-8 text-center text-white">
          <p className="mb-2 text-sm uppercase tracking-[4px] opacity-80">
            Exclusive Store Offer
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold">
            BUY 5, GET 50% OFF
          </h2>

          <p className="mt-3 text-sm md:text-base opacity-90">
            Purchase any 5 products and enjoy
            <span className="font-bold text-yellow-300"> 50% OFF</span> on your
            6th item.
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="rounded border border-gray-200 bg-gray-50 p-5 text-center">
            <h3 className="text-xl font-bold uppercase text-gray-900">
              Special Fashion Deal
            </h3>

            <p className="mt-3 uppercase text-gray-600">
              Mix and match any shirts, pants, panjabis, or casual wear. Add 6
              products to your cart and get
              <span className="font-semibold text-red-500">
                {" "}
                50% discount
              </span>{" "}
              on the 6th product.
            </p>
          </div>

          <div className="mt-5 text-center text-xs text-gray-500">
            * 50% discount applies to the lowest-priced item among the 6
            products.
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={closePopup}
              className="flex-1 rounded border border-gray-300 py-3 font-medium hover:bg-gray-100"
            >
              Maybe Later
            </button>

            <button
              onClick={closePopup}
              className="flex-1 rounded bg-black py-3 font-semibold text-white"
            >
              Shop Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;
