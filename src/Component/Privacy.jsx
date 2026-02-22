import { motion } from "framer-motion";
import { Link } from "react-router";

const Privacy = () => {
  return (
    <section className="bg-gray-50 py-10">
      <title>Lunor | Privacy Policy</title>

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">
            Your privacy matters to us at Lunor.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className=" p-8 space-y-8 text-gray-700 leading-relaxed"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, email
              address, phone number, shipping address, and payment details when
              you place an order or create an account on Lunor.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to process orders, improve our services,
              provide customer support, and send updates about your purchases.
              We do not sell or share your personal data with third parties for
              marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              3. Payment Security
            </h2>
            <p>
              All payments are processed securely through trusted payment
              providers. Lunor does not store your full payment details on our
              servers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              4. Cookies
            </h2>
            <p>
              We may use cookies to enhance your browsing experience, remember
              your preferences, and analyze website traffic.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              5. Your Rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal
              information at any time. Contact us if you need assistance.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              6. Changes to This Policy
            </h2>
            <p>
              Lunor may update this Privacy Policy occasionally. Any changes
              will be posted on this page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <span className="font-semibold">support@lunor.com</span>.
            </p>
          </div>
        </motion.div>
        <p className="mt-8 text-gray-500 px-8">
          For the full and most up-to-date Privacy Policy, please visit our
          dedicated
          <Link
            to="/terms-service"
            className="text-blue-300 hover:underline ml-1"
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
