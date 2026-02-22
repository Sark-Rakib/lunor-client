import { motion } from "framer-motion";
import { Link } from "react-router";

const TermsService = () => {
  return (
    <section className="bg-gray-50 py-10">
      <title>Lunor | Terms & Service</title>

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800">Terms & Service</h1>
          <p className="text-gray-600 mt-2">
            Please read these terms carefully before using Lunor.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-8 space-y-8 text-gray-700 leading-relaxed"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Lunor, you agree to comply with these Terms
              & Service. If you do not agree, please discontinue using our
              website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              2. Products & Pricing
            </h2>
            <p>
              All product descriptions and prices are subject to change without
              notice. We strive for accuracy but reserve the right to correct
              any errors.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              3. Orders & Payments
            </h2>
            <p>
              By placing an order, you confirm that all provided information is
              accurate. Payments are processed securely through trusted
              providers. Lunor reserves the right to cancel any order if
              necessary.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              4. Shipping & Delivery
            </h2>
            <p>
              Delivery timelines may vary depending on location and product
              availability. Lunor is not responsible for delays caused by
              third-party shipping services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              5. Returns & Refunds
            </h2>
            <p>
              Returns and refunds are subject to our Refund Policy. Products
              must be unused and in original condition.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              6. User Responsibilities
            </h2>
            <p>
              Users agree not to misuse the website, attempt unauthorized
              access, or engage in harmful activities that may affect Lunor or
              other users.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              7. Changes to Terms
            </h2>
            <p>
              Lunor may update these Terms & Service at any time. Continued use
              of the website means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              8. Contact Us
            </h2>
            <p>
              For any questions regarding these Terms, contact us at{" "}
              <span className="font-semibold">support@lunor.com</span>.
            </p>
          </div>
        </motion.div>

        {/* Bottom Link */}
        <p className="mt-8 text-gray-500 px-8">
          To learn more about how we handle your data, please read our{" "}
          <Link to="/privacy-policy" className="text-blue-300 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default TermsService;
