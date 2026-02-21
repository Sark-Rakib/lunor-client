import React from "react";
import { Link } from "react-router";

const Privacy = () => {
  return (
    <section className="bg-amber-50 py-10">
      <title>Harir Shad | Privacy Policy</title>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-amber-800 mb-8 text-center">
          Privacy Policy
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          At <span className="font-semibold">Harir Shad</span>, we value your
          privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your
          data when you visit or place an order through our website.
        </p>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              1. Information We Collect
            </h3>
            <p>
              We may collect personal information such as your name, phone
              number, email address, delivery address, and order details when
              you place an order or contact us.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              2. How We Use Your Information
            </h3>
            <p>
              Your information is used solely to process orders, provide
              customer support, improve our services, and communicate important
              updates related to your order.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              3. Data Protection
            </h3>
            <p>
              We implement appropriate security measures to protect your
              personal data from unauthorized access, disclosure, or misuse.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              4. Sharing of Information
            </h3>
            <p>
              We do not sell, trade, or share your personal information with
              third parties, except when required to fulfill your order or
              comply with legal obligations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              5. Cookies
            </h3>
            <p>
              Our website may use cookies to enhance user experience and analyze
              website performance. You can disable cookies in your browser
              settings if you prefer.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              6. Your Consent
            </h3>
            <p>
              By using our website, you consent to our Privacy Policy and agree
              to the collection and use of information as described.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              7. Contact Us
            </h3>
            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us at{" "}
              <span className="font-medium">harirshad2026@gmail.com</span>.
            </p>
          </div>
        </div>
        <p className="mt-8 text-gray-500">
          For the full and most up-to-date Privacy Policy, please visit our
          dedicated
          <Link
            to="/terms-service"
            className="text-amber-800 hover:underline ml-1"
          >
            Terms of Service page
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Privacy;
