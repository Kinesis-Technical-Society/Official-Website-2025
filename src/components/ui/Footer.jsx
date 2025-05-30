import { useState } from "react";
import { FaGithub, FaLinkedin, FaPhone, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import kietLogo from "/kietLogo.webp";
import ktsLogo from "/ktsLogo1.webp";
import people from "../../data/people";
import Contact from "./Contact";
import { Modal } from "@/AccertinityUI/animated-modal";
import { useLocation, useNavigate } from "react-router-dom";

const SimpleTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-wrap -space-x-2">
      {items.map((item, idx) => (
        <a href={item.linkedin} target="_blank" rel="noopener noreferrer" key={item.id}>
          <div
            className="relative"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-8 w-8 rounded-full border-2 border-gray-200 transition duration-300 hover:scale-110 hover:z-10">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                loading="eager"
                className="rounded-full object-cover h-full w-full"
              />
            </div>

            {hoveredIndex === idx && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 min-w-max">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-xs rounded-md py-1 px-2 shadow-lg">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-300 text-xs">{item.designation}</p>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (name, link, e) => {
    if (name === "Message") {
      e.preventDefault();
      setIsOpen(true);
    } else {
      window.location.href = link;
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname === '/projects') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/projects');
    }
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-slate-950 to-indigo-950 text-white py-16 px-5 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <a href="/#"><img src={ktsLogo} loading="eager" alt="KTS Logo" className="h-12 w-17" /></a>
            <a href="https://www.kiet.edu/" target="_blank"><img src={kietLogo} loading="eager" alt="KIET Logo" className="h-14 w-15" /></a>
          </div>

          <div className="flex space-x-4">
            <a href="https://github.com/Kinesis-Technical-Society" aria-label="GitHub" className="bg-gray-800 p-2 rounded-full hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 transition-colors duration-300">
              <FaGithub size={24} className="text-gray-300 hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/company/kinesis-technical-society/" aria-label="LinkedIn" className="bg-gray-800 p-2 rounded-full hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 transition-colors duration-300">
              <FaLinkedin size={24} className="text-gray-300 hover:text-white" />
            </a>
            <a href="https://www.instagram.com/kinesis_technical_society/" aria-label="Instagram" className="bg-gray-800 p-2 rounded-full hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 transition-colors duration-300">
              <FaInstagram size={24} className="text-gray-300 hover:text-white" />
            </a>
            <a href="https://x.com/kts_kiet" aria-label="Twitter" className="bg-gray-800 p-2 rounded-full hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 transition-colors duration-300">
              <FaTwitter size={24} className="text-gray-300 hover:text-white" />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Left - Info & Contributors */}
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              Empowering students through innovation, collaboration, and a passion for technology and creativity
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Our Amazing Contributors</p>
              <SimpleTooltip items={people} />
            </div>
          </div>

          {/* Middle - About */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative inline-block">
              <span className="relative z-10">ABOUT</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Message", link: null },
                { name: "Team", link: "/#team" },
                { name: "Functioning", link: "/#domains" }
              ].map(({ name, link }) => (
                <li key={name}>
                  <a
                    href={link}
                    onClick={(e) => handleLinkClick(name, link, e)}
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition duration-200 inline-block cursor-pointer"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative inline-block">
              <span className="relative z-10">PROJECTS</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />
            </h3>
            <ul className="space-y-3">
              {["Web Development", "Android Development", "Machine Learning", "UI/UX"].map((item) => (
                <li key={item}>
                  <button
                    onClick={handleClick}
                    className="cursor-pointer text-sm text-gray-300 hover:text-white hover:translate-x-1 transition duration-200 inline-block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative inline-block">
              <span className="relative z-10">CONTACT</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919450440115"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <FaPhone className="h-4 w-4 mr-3 text-purple-500" />
                  <span className="text-sm">+91 9450440115</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:itss@kiet.edu"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <MdEmail className="h-4 w-4 mr-3 text-purple-500" />
                  <span className="text-sm">kts@kiet.edu</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hodcsoffice@kiet.edu"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <MdEmail className="h-4 w-4 mr-3 text-purple-500" />
                  <span className="text-sm">hodcsoffice@kiet.edu</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:itss@kiet.edu"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <MdEmail className="h-4 w-4 mr-3 text-purple-500" />
                  <span className="text-sm">itss@kiet.edu</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 text-center md:text-left">
            <p>© {new Date().getFullYear()} KTS. All rights reserved.</p>
            <p className="text-xs mt-1 text-gray-500">Designed with ❤️ by the KTS team</p>
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((text) => (
              <a key={text} href="#" className="text-xs text-gray-400 hover:text-white transition-colors duration-200">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>



      {isOpen && (
        <Modal>
          <Contact isOpen={isOpen} setIsOpen={setIsOpen} />
        </Modal>
      )}
    </footer>
  );
};

export default Footer;
