import { FiMapPin, FiNavigation } from "react-icons/fi";

const Map = () => {
  const mapUrl =
    "https://www.google.com/maps?q=24.6622956,89.4203512&output=embed";

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=24.6622956,89.4203512";

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FiMapPin />
        Visit Our Store
      </h4>

      <div className="overflow-hidden rounded-2xl border border-white/20 shadow-lg">
        <iframe
          title="LUNOR Fashion Store Location"
          src={mapUrl}
          className="w-full h-56 md:h-72"
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
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition font-medium"
        >
          <FiNavigation />
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default Map;
