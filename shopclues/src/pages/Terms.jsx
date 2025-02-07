import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl relative">
      <Link to="/" className="absolute top-4 left-4 text-blue-500 text-lg">Home</Link>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Terms and Conditions</h1>
      <img src="https://cdn.shopclues.com/images/banners/Work/MerchantSeller/General-Policies-&-Rules.jpg" alt="Terms and Conditions" className="w-full rounded-lg mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">1. Introduction</h2>
      <p className="text-gray-600 mb-4">
        Welcome to ShopClues. By accessing our website, you agree to abide by these terms and conditions. Please read them carefully.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">2. User Responsibilities</h2>
      <p className="text-gray-600 mb-4">
        Users must ensure that they provide accurate information while making a purchase. Any fraudulent activity will lead to account suspension.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">3. Payment and Billing</h2>
      <p className="text-gray-600 mb-4">
        All payments must be completed before the shipment of goods. ShopClues is not responsible for any third-party payment failures.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">4. Shipping and Delivery</h2>
      <p className="text-gray-600 mb-4">
        We strive to deliver orders on time. However, unforeseen circumstances may lead to delays. Customers will be notified in such cases.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">5. Returns and Refunds</h2>
      <p className="text-gray-600 mb-4">
        Items can be returned within 7 days of delivery if they meet the return criteria. Refunds will be processed within 5-7 business days.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">6. Changes to Terms</h2>
      <p className="text-gray-600 mb-4">
        ShopClues reserves the right to modify these terms at any time. Users are advised to review them periodically.
      </p>
    </div>
  );
};

export default TermsAndConditions;
