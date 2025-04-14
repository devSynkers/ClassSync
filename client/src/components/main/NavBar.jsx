import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo.svg";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Stakeholder's Login", href: "#stakeholders" },
  { label: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-neutral-900/80 text-white border-b border-neutral-700/80 scroll-smooth">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={Logo} alt="Logo" />
            <span className="text-xl font-semibold tracking-tight">ClassSync</span>
          </div>

          <ul className="hidden lg:flex ml-14 space-x-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>


          {/* Mobile Menu Button */}
          <div className="lg:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar} aria-label="Toggle Menu">
              {mobileDrawerOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 top-16 z-40 bg-neutral-900 w-full p-10 flex flex-col items-center space-y-8 lg:hidden">
            <ul className="flex flex-col items-center space-y-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={toggleNavbar}
                    className="text-lg hover:text-orange-400 transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
