import React, { useState } from 'react';
import { Logo, Top, Down, Bar } from './assets/Icons.jsx';

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
      <header className="flex justify-between flex-wrap gap-4 px-4 xl:px-8 py-3 bg-white ">
        {/* Main Navigation - Desktop */}
        <section className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <div className='flex items-center gap-2'>
              <button 
                className="xl:hidden"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <Bar className="w-6 h-6" />
              </button>
              
              <div className="flex items-center">
                <Logo className="w-10 h-10" aria-hidden="true" />
                <h1 className="font-extrabold text-2xl pl-2">GoDaddy</h1>
              </div>
            </div>
            

            <nav className="hidden xl:block" aria-label="Main navigation">
              <ul className="flex gap-6">
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
          <nav className='flex justify-end items-center' aria-label="Utility navigation">
            <ul className="flex gap-4 lg:gap-6">
              {utilityItems.map((item, index) => (
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
      </header>
    </div>
  );
}

export default React.memo(App);