import React, { useState } from 'react';
import { Logo, Top, Down, Bar, Cart, Account,Phone} from './assets/Icons.jsx';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: 'Domains', hasDropdown: true },
    { label: 'Websites and Hosting', hasDropdown: true },
    { label: 'Email', hasDropdown: false },
    { label: 'Security', hasDropdown: true },
    { label: 'Marketing', hasDropdown: true },
    { label: 'Pricing', hasDropdown: false }
  ];

  const utilityItems = [
    { label: 'Help Center', hasDropdown: false },
    { label: 'Sign In', hasDropdown: true }
  ];

  return (
    <div className="bg-white text-gray-700 sticky top-0 z-50 text-sm">
      <header className="flex justify-between flex-wrap gap-4 px-4 lg:px-10 py-3 bg-slate-200 ">
        {/* Main Navigation - Desktop */}
        <section className="flex items-center gap-5">
            {/* Mobile Menu Button */}
            <div className='flex items-center gap-4'>
              <button 
                className="xl:hidden"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <Bar className="w-8 h-8" />
              </button>
              
              <div className="flex items-center">
                <Logo className="w-9 h-9" aria-hidden="true" />
                <h1 className="font-extrabold hidden md:block text-2xl pl-1">GoDaddy</h1>
              </div>
            </div>
            

            <nav className="hidden xl:block" aria-label="Main navigation">
              <ul className="flex gap-5">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="flex items-center hover:text-indigo-600 transition-colors"
                      aria-haspopup={item.hasDropdown}
                    >
                      {item.label}
                      {item.hasDropdown && <Down className="w-4 h-4 ml-1" />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          

          {/* Utility Navigation */}
          <nav className="flex justify-end items-center" aria-label="Utility navigation">
              <ul className="flex gap-4 lg:gap-6 items-center">
                {/* Desktop utility items */}
                {utilityItems.map((item, index) => (
                  <li key={`desktop-${index}`} className="hidden lg:block">
                    <a
                      href="#"
                      className="flex items-center hover:text-indigo-600 transition-colors duration-200"
                      aria-haspopup={item.hasDropdown}
                      aria-expanded={item.hasDropdown ? "false" : undefined}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <Down className="w-4 h-4 ml-1" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                ))}

                {/* Mobile phone icon */}
                <li className="lg:hidden">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center p-1"
                    aria-label="Contact us"
                  >
                    <Phone className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition-colors" />
                  </a>
                </li>

                {/* Mobile account icon */}
                <li className="lg:hidden">
                  <a
                    href="#account"
                    className="flex items-center p-1"
                    aria-label="Account"
                  >
                    <Account className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition-colors" />
                  </a>
                </li>

                {/* Cart with counter - always visible */}
                <li className="relative">
                  <a
                    href="#cart"
                    className="flex items-center p-1"
                    aria-label="Shopping cart"
                  >
                    <Cart className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition-colors" />
                    <span className="absolute bg-[#09757A] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-1 -right-1">
                      0
                      <span className="sr-only">items in cart</span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
      </header>
    </div>
  );
}

export default React.memo(App);