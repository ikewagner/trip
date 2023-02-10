import { auth } from "./../../lib/Firebase";
import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [user] = useAuthState(auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
      await auth.signOut();
  };

  return (
    
    <header className="fixed top-0 left-0 right-0 z-10 bg-gray-800 p-3 flex justify-between items-center">
      <h1 className="text-white font-bold text-xl">Ticket Sales</h1>
      <nav>
        {user && (
          <>
            <div className="relative inline-block">
              <button 
                onClick={() => setShowDropdown(!showDropdown)} 
                className="text-white hover:text-gray-400 p-2">
                <FaUser  />
              </button>
              {showDropdown && (
                <div className="bg-gray-800 absolute right-0 mt-2 py-2 w-40 text-white rounded shadow-lg">
                  <a href="/edit-account" className="block px-4 py-2 text-sm hover:bg-gray-700">Editar conta</a>
                  <a href="/users/userList" className="block px-4 py-2 text-sm hover:bg-gray-700">Editar contas</a>
                  <a href="/purchases" className="block px-4 py-2 text-sm hover:bg-gray-700">Verificar compras</a>
                  <a onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-700">Sair</a>
                </div>
              )}
            </div>
          </>
        )}
        {!user && (
          <a href="/auth/login" className="text-white hover:text-gray-400 p-2">Login</a>
        )}
      </nav>
    </header>
  );
};

export default Header;