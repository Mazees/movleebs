import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header
            className="w-full bg-secondary h-[70px] lg:px-10 px-5 flex items-center justify-between sticky top-0 z-20"
        >
            <div className="flex gap-3">
                <img src="/img/icon.svg" className="w-[30px]" alt="icon" />
                <h1 className="poppins-bold text-primary text-2xl">
                    Mov<span className="text-white">Leebs</span>
                </h1>
            </div>
            <nav className="poppins-regular lg:flex hidden text-white gap-10">
                <Link className="hover:underline" to="/">Home</Link>
                <Link className="hover:underline" to="/movielist">All Movie</Link>
                <Link className="hover:underline" to="/bookmark">Bookmarks</Link>
                <a
                    className="hover:underline"
                    href="https://github.com/Mazees/movleebs.git"
                    target="_blank"
                    rel="noreferrer"
                >Source</a>
            </nav>
            <button className="ml-auto lg:hidden" onClick={toggleMobileMenu}>
                <svg
                    className="text-white"
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
            <div
                className={`${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} fixed bg-secondary lg:hidden flex flex-col items-center w-screen h-screen top-0 left-0 transition-all duration-500 z-50`}
            >
                <div className="w-full flex justify-end p-5">
                   <button
                        className="text-white text-3xl"
                        onClick={toggleMobileMenu}
                    >
                        {/* Circle X Mark SVG */}
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                            />
                        </svg>
                    </button>
                </div>
                
                <img
                    src="/img/icon.svg"
                    className="h-[100px] w-full object-contain mb-10 mt-5"
                    alt="icon"
                />
                <nav className="items-center justify-center flex flex-col gap-10">
                    <ul
                        id="beranda"
                        className="text-white cursor-pointer transition-all duration-500 relative before:w-full before:h-[3px] before:bg-white before:absolute before:bottom-0 before:max-w-0 before:transition-all before:rounded-2xl hover:before:max-w-full poppins-light text-lg w-fit"
                    >
                        <Link onClick={toggleMobileMenu} to="/">Home</Link>
                    </ul>
                    <ul
                        className="text-white cursor-pointer transition-all duration-500 relative before:w-full before:h-[3px] before:bg-white before:absolute before:bottom-0 before:max-w-0 before:transition-all before:rounded-2xl hover:before:max-w-full poppins-light text-lg w-fit"
                    >
                        <Link onClick={toggleMobileMenu} to="/movielist">All Movie</Link>
                    </ul>
                    <ul
                        className="text-white cursor-pointer transition-all duration-500 relative before:w-full before:h-[3px] before:bg-white before:absolute before:bottom-0 before:max-w-0 before:transition-all before:rounded-2xl hover:before:max-w-full poppins-light text-lg w-fit"
                    >
                        <Link onClick={toggleMobileMenu} to="/bookmark">Bookmarks</Link>
                    </ul>
                    <ul
                        className="text-white cursor-pointer transition-all duration-500 relative before:w-full before:h-[3px] before:bg-white before:absolute before:bottom-0 before:max-w-0 before:transition-all before:rounded-2xl hover:before:max-w-full poppins-light text-lg w-fit"
                    >
                        <a
                            onClick={toggleMobileMenu}
                            href="https://github.com/Mazees/movleebs.git"
                        >Source</a>
                    </ul>
                </nav>
                <Link to="/smartleebs" onClick={toggleMobileMenu}>
                    <h1
                        className="text-primary-dark bg-primary px-4 py-2 mt-10 rounded-lg poppins-regular hover:text-white"
                    >
                        SMARTLEEBS
                    </h1>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
