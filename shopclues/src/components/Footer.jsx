import { Link , useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/about", "/contact ", "/faqs", "/terms","/cart","/wishlist"];

  if (hiddenRoutes.includes(location.pathname)) {
      return null; // Don't render the footer
  }
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* 🔹 About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 ">About ShopClues</h2>
            <p className="text-sm text-gray-400">
              Your one-stop destination for fashion, electronics, and home essentials.
            </p>
          </div>

          {/* 🔹 Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400">Contact Us</Link></li>
              <li><Link to="/faqs" className="hover:text-gray-400">FAQs</Link></li>
              <li><Link to="/terms" className="hover:text-gray-400">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* 🔹 Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" className="hover:text-gray-400"><FaFacebook size={20} /></a>
              <a href="https://twitter.com" className="hover:text-gray-400"><FaTwitter size={20} /></a>
              <a href="https://instagram.com" className="hover:text-gray-400"><FaInstagram size={20} /></a>
              <a href="https://youtube.com" className="hover:text-gray-400"><FaYoutube size={20} /></a>
            </div>
          </div>
        </div>

        {/* 🔹 Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} ShopClues.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;