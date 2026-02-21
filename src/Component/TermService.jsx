import React from "react";
import { Link } from "react-router";

const TermService = () => {
  return (
    <section className="bg-amber-50 py-10">
      <title>Harir Shad | Term of Service</title>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-amber-800 mb-8 text-center">
          Terms & Services
        </h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Welcome to <span className="font-semibold">Harir Shad</span>. By
          accessing or using our website and services, you agree to be bound by
          the following Terms & Services. Please read them carefully before
          placing an order.
        </p>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              1. Use of Our Services
            </h3>
            <p>
              You agree to use our website only for lawful purposes, including
              browsing products and placing genuine orders. Any misuse or
              unauthorized activity is strictly prohibited.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              2. Orders & Payments
            </h3>
            <p>
              All orders placed through our website are subject to availability
              and confirmation. Prices, product descriptions, and availability
              may change without prior notice.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              3. Delivery
            </h3>
            <p>
              We strive to deliver orders on time; however, delivery times may
              vary due to location, weather, or unforeseen circumstances. Harir
              Shad is not responsible for delays beyond our control.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              4. Cancellation & Refunds
            </h3>
            <p>
              Order cancellations are subject to our refund policy. Once an
              order is prepared or dispatched, cancellation or refunds may not
              be possible.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              5. Intellectual Property
            </h3>
            <p>
              All content, logos, images, and text on this website are the
              property of Harir Shad and may not be copied, reproduced, or used
              without prior written permission.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              6. Limitation of Liability
            </h3>
            <p>
              Harir Shad shall not be held liable for any indirect, incidental,
              or consequential damages arising from the use of our website or
              services.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              7. Changes to Terms
            </h3>
            <p>
              We reserve the right to update or modify these Terms & Services at
              any time. Continued use of our website constitutes acceptance of
              any changes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              8. Contact Information
            </h3>
            <p>
              If you have any questions about these Terms & Services, please
              contact us at{" "}
              <span className="font-medium">harirshad2026@gmail.com</span>.
            </p>
          </div>
        </div>

        <p className="mt-8 text-gray-500">
          For the complete and legally binding Terms of Service, please visit
          our dedicated
          <Link
            to="/privacy-policy"
            className="text-amber-800 hover:underline ml-1"
          >
            Privacy Policy page
          </Link>
        </p>
      </div>
    </section>
  );
};

export default TermService;
