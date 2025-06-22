import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Logo, Down, Bar, Cart, Account, Phone, Xmark, Prev } from './assets/Icons.jsx';

const NAV_ITEMS = [
  { label: 'Domains', hasDropdown: true },
  { label: 'Websites and Hosting', hasDropdown: true },
  { label: 'Email', hasDropdown: false },
  { label: 'Security', hasDropdown: true },
  { label: 'Marketing', hasDropdown: true },
  { label: 'Pricing', hasDropdown: false }
];

const UTILITY_ITEMS = [
  { label: 'Help Center', hasDropdown: false },
  { label: 'Sign In', hasDropdown: true }
];

const SIGN_IN_DROPDOWN_CONTENT = (
  <>
    <h3 className='font-bold'>Registered Users</h3>
    <p>Have an account? Sign in now.</p>
    <a href="#signin" className='block cursor-pointer underline text-[#00838C]'>Sign In</a>
    <hr/>
    <p className='font-bold'>New Customer</p>
    <p>New to GoDaddy? Create an account to get started today.</p>
    <a href="#create-account" className='block cursor-pointer underline text-[#00838C]'>Create an Account</a>
    <hr/>
    <p className='font-bold'>INBOX LINKS</p>
    <a href="#webmail" className='block cursor-pointer underline text-[#00838C]'>Sign in to GoDaddy Webmail</a>
    <a href="#office365" className='block cursor-pointer underline text-[#00838C]'>Sign in to Office 365 Email</a>
  </>
);

const DROPDOWN_CONTENT = (label) => (
  <>
    <h3 className='font-bold'>Dropdown for {label}</h3>
    <p>Content for {label} goes here.</p>
    <a href="#learn-more" className='block cursor-pointer underline text-[#00838C]'>Learn More</a>
    <hr/>
    <p className='font-bold'>Additional Links</p>
    <a href="#link1" className='block cursor-pointer underline text-[#00838C]'>Link 1</a>
    <a href="#link2" className='block cursor-pointer underline text-[#00838C]'>Link 2</a>
    <a href="#link3" className='block cursor-pointer underline text-[#00838C]'>Link 3</a>
    <hr/>
    <p className='font-bold'>Contact Us</p>
    <a href="mailto:support@example.com" className='block cursor-pointer underline text-[#00838C]'>Email Support</a>
    <a href="tel:+1234567890" className='block cursor-pointer underline text-[#00838C]'>Call Support</a>
  </>
);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeMobileItem, setActiveMobileItem] = useState(null);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
    if (mobileMenuOpen) {
      setOpenDropdown(null);
      setActiveMobileItem(null);
    }
  }, [mobileMenuOpen]);

  const toggleDropdown = useCallback((item) => {
    setOpenDropdown(prev => prev === item ? null : item);
  }, []);

  const handleMobileItemClick = useCallback((item) => {
    if (item.hasDropdown) {
      setActiveMobileItem(item.label);
      setOpenDropdown(item.label);
    }
  }, []);

  // Memoize all style calculations
  const styles = useMemo(() => ({
    textColor: scrolled ? 'text-white' : 'text-black',
    bgColor: scrolled ? 'bg-black' : 'bg-white',
    dropdownBgColor: scrolled ? 'bg-white text-black' : 'bg-[#353535] text-white',
    dropdownBgColor2: scrolled 
      ? 'bg-white before:bg-white before:border-white text-black' 
      : 'bg-[#353535] before:bg-[#353535] before:border-[#353535] text-white',
    headerBg: scrolled ? 'bg-[#353535] text-white' : ''
  }), [scrolled]);

  // Memoize navigation items to prevent unnecessary re-renders
  const renderNavItem = useCallback((item) => (
    <li key={item.label}>
      {item.hasDropdown ? (
        <button
          onClick={() => toggleDropdown(item.label)}
          className={`
            flex items-center px-4 py-2 rounded transition-all duration-200
            ${openDropdown === item.label 
              ? styles.dropdownBgColor
              : `${styles.textColor} hover:bg-gray-200 hover:text-black`
            }
          `}
          aria-haspopup="true"
          aria-expanded={openDropdown === item.label}
        >
          {item.label}
          <Down className={`
            w-4 h-4 ml-1 transition-all duration-500 ease-in-out 
            ${openDropdown === item.label ? 'scale-y-[-1]' : 'scale-y-1'}
          `} />
        </button>
      ) : (
        <a 
          href="#" 
          className={`flex items-center px-4 py-2 hover:bg-gray-200 hover:text-black transition-all duration-400 rounded ${styles.textColor}`}
        >
          {item.label}
        </a> 
      )}
      
      {openDropdown === item.label && (
        <div className={`
          absolute top-full left-0 w-full
          ${styles.dropdownBgColor} shadow-lg
          transition-all duration-300 ease-out overflow-hidden
          ${openDropdown === item.label ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        `}>
          {DROPDOWN_CONTENT(item.label)}
        </div>
      )}
    </li>
  ), [openDropdown, styles, toggleDropdown]);

  const renderUtilityItem = useCallback((item) => (
    <li key={item.label} className="hidden lg:block relative">
      {item.hasDropdown ? (
        <button
          onClick={() => toggleDropdown(item.label)}
          className={`
            flex items-center px-4 py-2 rounded transition-all duration-200
            ${openDropdown === item.label 
              ? styles.dropdownBgColor
              : `${styles.textColor} hover:bg-gray-200 hover:text-black`
            }
          `}
          aria-haspopup="true"
          aria-expanded={openDropdown === item.label}
        >
          {item.label}
          <Down className={`
            w-4 h-4 ml-1 transition-all duration-500 ease-in-out 
            ${openDropdown === item.label ? 'scale-y-[-1]' : 'scale-y-1'}
          `} aria-hidden="true" />
        </button>
      ) : (
        <a
          href="#"
          className={`flex items-center px-2 py-2 hover:bg-gray-200 hover:text-black transition-all duration-200 rounded ${styles.textColor}`}
        >
          {item.label}
        </a>
      )}
      
      {openDropdown === item.label && (
        <div className={`
          absolute top-[125%] right-0 shadow-lg p-2 w-72 mt-1 flex flex-col gap-2 ${styles.dropdownBgColor2} before:content-[''] before:absolute before:-top-2 
            before:right-3 before:w-4 before:h-4 before:transform before:rotate-45 before:border-t before:border-l`}
          onClick={(e) => e.stopPropagation()}
        >
          <Xmark className='text-lg absolute right-3 cursor-pointer' onClick={() => toggleDropdown(null)}/>
          {SIGN_IN_DROPDOWN_CONTENT}
        </div>
      )}
    </li>
  ), [openDropdown, styles, toggleDropdown]);

  return (
    <div className="text-gray-700 sticky top-0 z-50 text-sm bg-black">
      <header 
        className={`${styles.bgColor} flex sticky ${styles.headerBg} top-0 left-0 justify-between gap-2 px-4 lg:px-10 py-3`}
        onClick={(e) => { if(e.target === e.currentTarget) setOpenDropdown(null) }}
      >
        {/* Main Navigation */}
        <section className="flex items-center gap-5">
          <div className='flex items-center gap-4'>
            <button 
              className="xl:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <Bar className={`w-8 h-8 ${styles.textColor}`} />
            </button>
            
            <Logo className={`${styles.textColor} w-32 h-12 font-extralight`} aria-hidden="true" />
          </div>

          <nav className="hidden xl:block" aria-label="Main navigation">
            <ul className="flex gap-3 items-center">
              {NAV_ITEMS.map(renderNavItem)}
            </ul>
          </nav>
        </section>

        {/* Utility Navigation */}
        <nav className="flex justify-end items-center" aria-label="Utility navigation">
          <ul className="flex gap-2 items-center">
            {UTILITY_ITEMS.map(renderUtilityItem)}

            {/* Mobile Icons */}
            <li className="lg:hidden">
              <a href="tel:+1234567890" className="flex items-center p-1" aria-label="Contact us">
                <Phone className={`${styles.textColor} w-6 h-6 hover:text-indigo-600 transition-colors`}/>
              </a>
            </li>

            <li className="lg:hidden">
              <button 
                onClick={() => toggleDropdown('Sign In')}
                className="p-1"
                aria-label="Account"
              >
                <Account className={`${styles.textColor} w-6 h-6 hover:text-[#00838C] transition-colors`} />
              </button>
              {openDropdown === 'Sign In' && (
                <div className={`absolute top-[80%] right-12 flex flex-col gap-2 lg:hidden shadow-lg p-2 w-56 mt-1 ${styles.dropdownBgColor2} before:content-[''] before:absolute before:-top-2 
                    before:right-3 before:w-4 before:h-4 before:transform before:rotate-45 before:border-t before:border-l`}
                    onClick={(e) => e.stopPropagation()}
                >
                  <Xmark className='text-lg absolute right-3 cursor-pointer' onClick={() => toggleDropdown(null)}/>
                  {SIGN_IN_DROPDOWN_CONTENT}
                </div>
              )}
            </li>
            
            {/* Cart */}
            <li className="relative">
              <a href="#cart" className="flex items-center p-1" aria-label="Shopping cart">
                <Cart className={`${styles.textColor} w-6 h-6 hover:text-[#00838C] transition-colors`} />
                <span className="absolute bg-[#00838C] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-1 -right-1">
                  0
                  <span className="sr-only">items in cart</span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={toggleMobileMenu}
          />
          
          <div className="relative z-50 flex flex-col justify-between h-full w-[min(25em,90vw)] bg-white text-white p-4">
            <div>
              <Logo className="text-black w-32 h-12 font-extralight mb-4" aria-hidden="true" />
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label} className="group">
                    {item.hasDropdown ? (
                      <button
                        onClick={() => handleMobileItemClick(item)}
                        className="flex items-center justify-between w-full px-4 py-2 rounded transition-all duration-200 text-black hover:bg-gray-200"
                        aria-haspopup="true"
                        aria-expanded={activeMobileItem === item.label}
                      >
                        {item.label}
                        <span className={`text-2xl ml-2 transition-transform duration-200 ${activeMobileItem === item.label ? 'rotate-90' : ''} group-hover:translate-x-1`}>
                          →
                        </span>
                      </button>
                    ) : (
                      <a 
                        href="#" 
                        className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-black transition-all duration-400 rounded text-black"
                        onClick={toggleMobileMenu}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <ul className="flex flex-col justify-between mt-4">
              <li>
                <a href="tel:+1234567890" className="flex group text-black items-center p-1" aria-label="Contact us">
                  <Phone className="text-black w-6 h-6 hover:text-[#00838C] transition-colors" />
                  <div className="ml-4 group-hover:underline">Contact Us</div>
                </a>
              </li>
              <li>
                <a 
                  href="#signIn"
                  className="group text-black flex items-center p-1 w-full"
                  aria-label="Sign In"
                >
                  <Account className="text-black w-6 h-6 hover:text-[#00838C] transition-colors" />
                  <div className="ml-4 group-hover:underline">Sign In</div>
                </a>
              </li>
              <li className="relative">
                <a href="#cart" className="group flex items-center p-1 text-black" aria-label="Shopping cart">
                  <Cart className="text-black w-6 h-6 hover:text-[#00838C] transition-colors" />
                  <div className="ml-4 group-hover:underline">Basket</div>
                  <span className="absolute bg-[#00838C] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-1 left-4">
                    0
                    <span className="sr-only">items in cart</span>
                  </span>
                </a>
              </li>
            </ul>
            
            <button 
              className="absolute top-2 right-2 text-black" 
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <Xmark className="text-3xl" />
            </button>
          </div>
          
          {activeMobileItem && (
            <div 
              className={`absolute top-0 left-0 w-[min(25em,90vw)] h-full z-50 flex flex-col ${styles.dropdownBgColor2} p-4 overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="text-3xl text-left" 
                onClick={() => setActiveMobileItem(null)}
                aria-label="Back"
              >
                <Prev />
              </button>
              {DROPDOWN_CONTENT(activeMobileItem)}
            </div>
          )}
        </div>
      )}

      <main className='bg-black' onClick={() => setOpenDropdown(null)}>
        {/* Main content goes here */}
      </main>
    </div>
  );
}

export default React.memo(App);