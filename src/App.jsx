import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Logo, Down, Bar, Cart, Account, Phone, Xmark } from './assets/Icons.jsx';

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

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

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
  }, []);

  const toggleDropdown = useCallback((item) => {
    setOpenDropdown(prev => prev === item ? null : item);
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
          Dropdown content for {item.label}
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
        <div className={`absolute top-[125%] right-0 shadow-lg p-2 w-72 mt-1 flex flex-col gap-2 ${styles.dropdownBgColor2} before:content-[''] before:absolute before:-top-2 
            before:right-3 before:w-4 before:h-4 before:transform before:rotate-45 before:border-t before:border-l`}
        >
          <Xmark className='text-lg absolute right-3'/>
          <h3 className='font-bold'>Registered Users</h3>
          <p>Have an account? Sign in now.</p>
          <a className='block cursor-pointer underline text-[#00838C]'>Sign In</a>
          <hr/>
          <p className='font-bold'>New Customer</p>
          <p>New to GoDaddy? Create an account to get started today.</p>
          <a className='block cursor-pointer underline text-[#00838C]'>Create an Account</a>
          <hr/>
          <p className='font-bold'>INBOX LINKS</p>
          <a className='block cursor-pointer underline text-[#00838C]'>Sign in to GoDaddy Webmail</a>
          <a className='block cursor-pointer underline text-[#00838C]'>Sign in to Office 365 Email</a>
        </div>
      )}
    </li>
  ), [openDropdown, styles, toggleDropdown]);

  return (
    <div className="text-gray-700 sticky top-0 z-50 text-sm bg-black">
      <header className={`${styles.bgColor} flex sticky ${styles.headerBg} top-0 left-0 justify-between flex-wrap gap-2 px-4 lg:px-10 py-3`}>
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

            <li className="lg:hidden" onClick={() => toggleDropdown('Sign In')}>
              <Account className={`${styles.textColor} w-6 h-6 hover:text-[#00838C] transition-colors`} />
              {openDropdown === 'Sign In' && (
                <div className={`absolute top-[80%] right-12 flex flex-col gap-2 lg:hidden shadow-lg p-2 w-56 mt-1 ${styles.dropdownBgColor2} before:content-[''] before:absolute before:-top-2 
                    before:right-3 before:w-4 before:h-4 before:transform before:rotate-45 before:border-t before:border-l`}
                >
                  <h3 className='font-bold'>Registered Users</h3>
                  <p>Have an account? Sign in now.</p>
                  <a className='block cursor-pointer underline text-[#00838C]'>Sign In</a>
                  <hr/>
                  <p className='font-bold'>New Customer</p>
                  <p>New to GoDaddy? Create an account to get started today.</p>
                  <a className='block cursor-pointer underline text-[#00838C]'>Create an Account</a>
                  <hr/>
                  <p className='font-bold'>INBOX LINKS</p>
                  <a className='block cursor-pointer underline text-[#00838C]'>Sign in to GoDaddy Webmail</a>
                  <a className='block cursor-pointer underline text-[#00838C]'>Sign in to Office 365 Email</a>
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
      <main className='bg-black'>
        {/* Main content goes here */}
       
      </main>
    </div>
  );
}

export default React.memo(App);  