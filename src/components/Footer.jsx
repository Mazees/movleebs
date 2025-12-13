import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white poppins-regular rounded-base shadow-xs mt-auto">
      <div className="w-full mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-body sm:text-center">
          © 2025 <a href="#" className="hover:underline">Movleebs</a>. All Rights Reserved.
        </span>

        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
          <li>
            <Link to="/" className="hover:underline me-4 md:me-6">Home</Link>
          </li>
          <li>
            <Link to="/feedback" className="hover:underline me-4 md:me-6">Feedback</Link>
          </li>
          <li>
            <Link to="/movielist" className="hover:underline me-4 md:me-6">All Movie</Link>
          </li>
          <li>
            <a href="https://github.com/Mazees/movleebs.git" className="hover:underline">Source</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
