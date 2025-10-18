import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-4 border-b border-b-gray-300 px-4 md:px-10 bg-white relative z-50">
      {/* LOGO */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-40 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {/* DESKTOP MENU */}
      <ul className="hidden md:flex items-start gap-6 font-medium text-gray-700">
        <NavLink to="/" className="hover:text-primary">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors" className="hover:text-primary">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about" className="hover:text-primary">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact" className="hover:text-primary">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={assets.profile_pic} alt="" className="w-8 rounded-full" />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md">
                <p
                  onClick={() => navigate('my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('my-appointments')}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* MOBILE MENU ICON */}
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="w-6 cursor-pointer md:hidden"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>

      {/* MOBILE MENU */}
      {showMenu && (
        <>
          {/* Dim background when open */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowMenu(false)}
          ></div>

          <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col items-center gap-5 py-6 md:hidden z-50 animate-fadeIn">
            <NavLink
              to="/"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 hover:text-primary text-base"
            >
              HOME
            </NavLink>
            <NavLink
              to="/doctors"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 hover:text-primary text-base"
            >
              ALL DOCTORS
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 hover:text-primary text-base"
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 hover:text-primary text-base"
            >
              CONTACT
            </NavLink>

            {!token ? (
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate('/login');
                }}
                className="bg-primary text-white px-8 py-2 rounded-full"
              >
                Create Account
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowMenu(false);
                  logout();
                }}
                className="text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
