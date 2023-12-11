const Footer = () => {
  return (
    <footer className="bg-[black] text-white p-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 font-lobster">
            <h2 className="text-2xl font-lobster text-[#FFDF00]">
              HappyPlanet
            </h2>
            <p className="text-sm text-white">AI art for web3 creators.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
            <a href="#" className="hover:text-gray-300">
              About
            </a>
            <a href="#" className="hover:text-gray-300">
              Services
            </a>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
