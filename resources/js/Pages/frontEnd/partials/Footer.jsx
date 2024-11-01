import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-gray-200 py-8" style={{ backgroundColor: '#eb4d4b' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Get In Touch Section */}
          <div className="w-full md:w-5/12 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <ul>
              <li className="mb-2">
                <b>Phone:</b>{" "}
                <a href="tel:+94777394446" className="text-gray-200 hover:text-gray-400">
                  (+94) 77 777 7777
                </a>
              </li>
              <li>
                <b>Email:</b>{" "}
                <a href="mailto:info@test.com" className="text-gray-200 hover:text-gray-400">
                  info@test.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="w-full md:w-3/12 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-200 hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-200 hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-200 hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-gray-400">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Socialize With Us Section */}
          <div className="w-full md:w-4/12">
            <h3 className="text-xl font-semibold mb-4">Socialize With Us</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="flex items-center text-gray-200 hover:text-gray-400">
                  <FaFacebook className="mr-2" /> Facebook
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="flex items-center text-gray-200 hover:text-gray-400">
                  <FaTwitter className="mr-2" /> Twitter
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="flex items-center text-gray-200 hover:text-gray-400">
                  <FaInstagram className="mr-2" /> Instagram
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="flex items-center text-gray-200 hover:text-gray-400">
                  <FaYoutube className="mr-2" /> YouTube
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="flex items-center text-gray-200 hover:text-gray-400">
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8">
          <hr className="border-gray-500 mb-4" />
          <p className="text-center text-gray-400">
            Copyright © 2024 KrishnaPawar
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
