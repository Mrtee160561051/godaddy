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
        <div className={`
          absolute top-[125%] right-0 shadow-lg p-2 w-72 mt-1 flex flex-col gap-2 ${styles.dropdownBgColor2} before:content-[''] before:absolute before:-top-2 
            before:right-3 before:w-4 before:h-4 before:transform before:rotate-45 before:border-t before:border-l`}
          onClick={(e) => e.stopPropagation()}
        >
          <Xmark className='text-lg absolute right-3' onClick={() => toggleDropdown('Sign In')}/>
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
      <header className={`${styles.bgColor} flex sticky ${styles.headerBg} top-0 left-0 justify-between gap-2 px-4 lg:px-10 py-3`}
      onClick={(e) =>{if(e.target === e.currentTarget)setOpenDropdown(null)}}
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

            <li className="lg:hidden" onClick={() => toggleDropdown('Sign In')}>
              <Account className={`${styles.textColor} w-6 h-6 hover:text-[#00838C] transition-colors`} />
              {openDropdown === 'Sign In' && (
                <div className={`absolute top-[80%] right-12 flex flex-col gap-2 lg:hidden shadow-lg p-2 w-56 mt-1 ${styles.dropdownBgColor2} before:content-[''] before:absolute before:-top-2 
                    before:right-3 before:w-4 before:h-4 before:transform before:rotate-45 before:border-t before:border-l` }
                    onClick={(e) => e.stopPropagation()}
                >
                  <Xmark className='text-lg absolute right-3' onClick={() => toggleDropdown(null)}/>
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div className={`fixed inset-0 z-40 xl:hidden bg-black bg-opacity-50 transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={(e) => { if (e.target === e.currentTarget) setMobileMenuOpen(false); }}>
          <div className="flex flex-col justify-between top-0 h-full w-[min(25em,90vw)] bg-white text-white p-4">
            <div>
              <Logo className={`text-black w-32 h-12 font-extralight mb-4`} aria-hidden="true" />
              <ul className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label} className="relative group"> {/* Added 'group' for hover effects */}
                      {item.hasDropdown ? (
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className="flex items-center justify-between w-full px-4 py-2 rounded transition-all duration-200 text-black hover:bg-gray-200"
                          aria-haspopup="true"
                          aria-expanded={openDropdown === item.label}
                        >
                          {item.label}
                          {/* New right arrow with hover animation */}
                          <span className={`ml-2 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-90' : ''} group-hover:translate-x-1`}>
                            →
                          </span>
                        </button>
                      ) : (
                        <a 
                          href="#" 
                          className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-black transition-all duration-400 rounded text-black"
                        >
                          {item.label}
                        </a>
                      )}
                      
                      {/* Dropdown content (only shows if clicked) */}
                      {openDropdown === item.label && (
                        <div className="mt-1 pl-4">
                          {/* Your dropdown items here */}
                          Dropdown content for {item.label}
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
            
            <ul className="flex flex-col justify-between mt-4">
              <li>
                <a href="tel:+1234567890" className="flex group text-black items-center p-1" aria-label="Contact us">
                  <Phone className={`text-black w-6 h-6 hover:text-[#00838C] transition-colors`} />
                  <div className="ml-4 group-hover:underline">Contact Us</div>
                </a>
              </li>
              <li>
                <a href="#signin" className="group text-black flex items-center p-1" aria-label="Sign In">
                  <Account className={`text-black w-6 h-6 hover:text-[#00838C] transition-colors`} />
                  <div className="ml-4 group-hover:underline">Sign In</div>
                </a>
              </li>
              <li className="relative">
                  <a href="#cart" className="group flex items-center p-1  text-black" aria-label="Shopping cart">
                    <Cart className={`text-black w-6 h-6 hover:text-[#00838C] transition-colors`} />
                    <div className="ml-4 group-hover:underline">Basket</div>
                    <span className="absolute bg-[#00838C] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs -top-1 left-4">
                      0
                      <span className="sr-only">items in cart</span>
                    </span>
                    
                  </a>
              </li>
            </ul>
          </div>
          <Xmark className='text-9xl text-white absolute top-2 right-2' onClick={() => setMobileMenuOpen(false)}/>
          </div>
        </>
      )}

      <main className='bg-black' onClick={() => setOpenDropdown(null)}>
        {/* Main content goes here */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus temporibus illo rerum. Dignissimos quidem cumque optio aperiam voluptatum. Cumque itaque vitae minus ex nemo dolores eaque nulla sit est sequi.
        Vero aliquam eos ipsum laudantium debitis explicabo odit voluptate nihil ipsam quidem ad modi ducimus obcaecati magnam quas optio expedita exercitationem molestias officia voluptas, perspiciatis doloremque dignissimos harum. Eos, labore.
        Fuga possimus dignissimos consequatur doloremque exercitationem officiis quibusdam neque alias! Cum quaerat necessitatibus saepe quo sequi, doloribus ex quis rem, voluptas deserunt, voluptatem incidunt facilis error illum dolorum nemo assumenda.
        Quos quae dolor eaque dolorem laudantium laborum! Expedita provident perspiciatis nihil ipsum placeat vero culpa mollitia iure rerum aliquid deleniti ex consequuntur ratione, cupiditate dolores! Obcaecati dignissimos fugit veniam aliquam.
        Ipsum molestiae a explicabo, nulla aperiam incidunt commodi repellendus laboriosam perferendis amet. Expedita eum quae fuga, veniam ipsa qui illum nemo sunt non perspiciatis quisquam eligendi id exercitationem ut itaque.
        Dolore, voluptates tempore ut pariatur eum, porro voluptatem labore cupiditate accusamus, dignissimos reiciendis! Suscipit ullam dicta incidunt optio et quia molestiae sequi, maiores veritatis, aliquam numquam cumque laboriosam ut nemo.
        Voluptates doloremque officia provident quisquam! Amet vero ratione illo doloribus id ullam iste quos distinctio accusamus, dignissimos laboriosam, ad labore minima beatae impedit. Ipsum ab molestiae dolore deserunt nemo sapiente.
        Alias eaque ipsam debitis quae corrupti dolorem iusto nobis, quisquam laboriosam. Deserunt laudantium facilis assumenda nostrum perspiciatis eveniet ut quas accusantium! Rerum, quo nam natus officiis nemo itaque animi ducimus.
        Deserunt voluptatum labore sapiente ducimus vel, veritatis culpa modi pariatur consequatur exercitationem ipsum quae. Nobis quas placeat ipsam hic nesciunt ipsum, in repellat odio numquam eum nostrum distinctio incidunt ipsa.
        Minus eaque nulla molestiae eum perferendis ab, perspiciatis incidunt cumque eveniet alias vero harum quisquam unde. Repudiandae, eum nesciunt illo odit delectus, cupiditate eaque rerum repellendus obcaecati, maiores iure blanditiis.
        Rem voluptas quisquam perspiciatis id commodi ratione iusto, soluta necessitatibus error ipsum consectetur voluptate sequi ea dignissimos hic similique ullam quibusdam maxime corporis dolor fuga nobis, accusamus voluptatum repellendus? Non?
        Corrupti, culpa quaerat, voluptates similique voluptate repellendus architecto iure provident fugiat sunt voluptatibus. Quod adipisci maiores fugiat, officia eveniet, sit similique doloribus explicabo sapiente necessitatibus autem ipsa aperiam possimus nobis?
        Reprehenderit rem veniam praesentium nisi doloremque vero iste debitis omnis eos, nostrum vitae, totam atque aut beatae ab natus in doloribus vel perspiciatis! Iusto exercitationem recusandae obcaecati nihil deleniti totam.
        Quis deleniti reiciendis aliquam, autem voluptatibus placeat possimus voluptate quas ratione cumque! Exercitationem iusto ipsa dolorum totam architecto blanditiis, temporibus nostrum libero voluptates accusamus tenetur, aliquam cupiditate ipsam sunt laboriosam.
        Soluta nulla non rerum. Officia aliquid quidem sit quae mollitia quia autem, temporibus velit ad aperiam nobis accusamus? Quasi enim maxime eaque inventore laudantium itaque soluta rem doloribus nisi vel?
        Temporibus placeat officia deleniti minus aut, quis at. Dolor itaque possimus a eos voluptates modi quibusdam perferendis voluptatibus quo, molestias tempora. Distinctio repellendus eos modi cupiditate, nihil rem quis! Sed.
        Odit impedit temporibus ipsa iste minima consequuntur. Reiciendis distinctio eaque quisquam repellendus. Sapiente ipsa facilis molestiae beatae sit, nam incidunt hic dignissimos voluptate similique veritatis asperiores quas in eveniet necessitatibus.
        Neque, delectus obcaecati accusantium voluptate voluptatem nihil quod ut distinctio perspiciatis perferendis dicta ea aliquam, consectetur, temporibus tenetur! In aperiam quas unde, alias quod ab impedit ut reiciendis id architecto.
        Saepe molestias ratione perspiciatis, qui assumenda rem expedita amet impedit cupiditate consequatur ullam non voluptate dolor porro quos. Neque deleniti praesentium officia ipsa illo consequatur excepturi impedit molestias quod dolorem.
        Odio voluptatum quidem ab. Impedit totam neque facilis. Expedita, in eos, repellat animi, dolorum maiores consequuntur accusantium aut aliquid aperiam doloribus nihil! Eos ad blanditiis nulla ratione facilis, pariatur sequi!
        Fugit mollitia nobis, ad nulla, aliquam nostrum eius excepturi optio vero omnis magni deleniti ipsum veniam facere, et voluptas quod expedita natus asperiores! Quas consectetur accusantium dicta molestias quis ipsam.
        Officia aut numquam nam soluta exercitationem harum, inventore dicta, veritatis fugit sed facilis ab omnis alias quae maiores beatae aliquam ducimus hic illo? Ratione, quos! Perspiciatis commodi fugit beatae dolorum.
        Quia voluptate officiis maiores quisquam, totam incidunt sapiente fugit repellendus velit. Temporibus unde maxime animi inventore, fugiat placeat dolorem commodi accusamus iusto, porro totam deleniti rerum quis ducimus dolore iure.
      </main>
    </div>
  );
}

export default React.memo(App);
