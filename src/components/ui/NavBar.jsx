import React, { useMemo, useState, useEffect } from "react";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarKietLogo,
    NavbarKtsLogo,
} from "../../AccertinityUI/ResizableNavbar";
import { MessageSquare } from "lucide-react";
import { Modal } from "@/AccertinityUI/animated-modal";
import Contact from "./Contact";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactOpen, setContactOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = useMemo(
        () => [
            { name: "Home", link: "/" },
            { name: "About", link: "/about" },
            { name: "Team", link: "/team" },
            { name: "Events", link: "/events" },
            { name: "Blogs", link: "/blogs" },
        ],
        []
    );

    useEffect(() => {
        document.body.style.overflow = isContactOpen ? "hidden" : "auto";
    }, [isContactOpen]);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const handleLinkClick = (item) => {
        setIsMenuOpen(false);
        if (item.link.includes("#")) {
            const selector = item.link.substring(item.link.indexOf("#"));

            if (location.pathname === "/") {
                const section = document.querySelector(selector);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                navigate("/", { state: { scrollTo: selector } });
            }
        } else {
            navigate(item.link);
        }
    };

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const section = document.querySelector(location.state.scrollTo);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <>
            <Navbar>
                {/* Desktop Navbar */}
                <NavBody>
                    <NavbarKtsLogo />
                    <NavItems items={navLinks} onItemClick={handleLinkClick} />
                    <div className="mr-4">
                        <button
                            onClick={() => setContactOpen(true)}
                            className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <span className="flex items-center justify-center gap-2 relative z-10 font-medium tracking-wide">
                                <span>Contact Us</span>
                            </span>
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                    <NavbarKietLogo />
                </NavBody>

                {/* Mobile Navbar */}
                <MobileNav>
                    <MobileNavHeader>
                        <div className="flex items-center gap-2">
                            <NavbarKtsLogo />
                            <NavbarKietLogo />
                        </div>
                        <MobileNavToggle isOpen={isMenuOpen} onClick={toggleMenu} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isMenuOpen}>
                        {navLinks.map((item, i) => (
                            <a
                                key={i}
                                href={item.link || "#"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(item);
                                }}
                            >
                                {item.name}
                            </a>
                        ))}

                        {/* Contact Us Button for Mobile Nav */}
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setContactOpen(true);
                                }}
                                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <span className="flex items-center justify-center gap-2 relative z-10 font-medium tracking-wide">
                                    <MessageSquare size={16} />
                                    <span>Contact Us</span>
                                </span>
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {/* Contact Modal */}
            <Modal>
                <Contact isOpen={isContactOpen} setIsOpen={setContactOpen} />
            </Modal>
        </>
    );
};

export default NavBar;
