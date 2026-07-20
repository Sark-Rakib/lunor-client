import { FiMapPin, FiNavigation } from "react-icons/fi";

const Map = () => {
  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FiMapPin />
        Visit Our Store
      </h4>

      <div className="overflow-hidden rounded-2xl border border-white/20 shadow-lg">
        <iframe
          title="OXIVOS Store Location"
          src="https://www.google.com/maps?q=Dhunat+More+Sherpur+Bogura+Bangladesh&output=embed"
          className="w-full h-56"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="font-medium">LUNOR Fashion Store</p>
          <p className="text-sm">Dhunat More, Sherpur, Bogura, Bangladesh</p>
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Dhunat+More+Sherpur+Bogura+Bangladesh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition font-medium"
        >
          <FiNavigation />
          Open Map
        </a>
      </div>
    </div>
  );
};

export default Map;
