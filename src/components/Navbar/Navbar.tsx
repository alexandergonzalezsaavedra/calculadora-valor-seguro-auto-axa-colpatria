const Navbar = () => {
  return (
    <nav
      aria-label='Principal'
      className='mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6'
    >
      <a
        href='/'
        className='navbarBrand'
      >
        <img
          src='/axa-colpatria-logo.png'
          alt='AXA Colpatria'
          className='h-14 w-auto'
        />
      </a>
    </nav>
  );
};

export default Navbar;
