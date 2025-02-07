import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl relative">
      <Link to="/" className="absolute top-4 left-4 text-blue-500 text-lg">Home</Link>
      <h1 className="text-2xl font-bold text-left text-gray-800 mb-6 mt-4">Contact Us</h1>
      <img src="http://cdn.shopclues.com/images1/detailed/117261/86257623-117261465-1689770391.jpg" alt="Contact ShopClues" className="w-full rounded-lg mb-4" />
      <p className="text-gray-600 mb-4">
        We’d love to hear from you! Whether you have a question about your order, our products, or anything else, our team is ready to help.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Get in Touch</h2>
      <p className="text-gray-600 mb-4">
        <strong>Email:</strong> support@shopclues.com<br />
        <strong>Phone:</strong> +91 12345 67890<br />
        <strong>Address:</strong> 123, ShopClues Street, New Delhi, India
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Customer Support</h2>
      <p className="text-gray-600 mb-4">
        Our customer support team is available 24/7 to assist you. Feel free to reach out via email or phone for any queries.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Follow Us</h2>
      <ul className="list-disc list-inside text-gray-600">
        <li>Facebook: facebook.com/shopclues</li>
        <li>Twitter: twitter.com/shopclues</li>
        <li>Instagram: instagram.com/shopclues</li>
      </ul>
    </div>
  );
};

export default ContactUs;
