import { auth } from "./../../lib/Firebase";
import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUser, FaEdit, FaMoneyBillWave, FaUserCog, FaStopCircle, FaPlusCircle, FaTicketAlt } from "react-icons/fa";
import { collection, query, onSnapshot, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/Firebase";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email),
        where("isAdmin", "==", true)
      );
      getDocs(q).then((querySnapshot) => {
        setIsAdmin(!querySnapshot.empty);
      });
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserName(data.nome);
        });
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-gray-800 p-3 flex justify-between items-center">
      <h1 className="text-white font-bold text-xl">TRIP</h1>
      <nav>
        {user && (
          <>
            <div className="relative inline-block">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white hover:text-gray-400 p-2 flex items-center"
              ><p className="px-2">{userName}</p>
                <FaUser />
              </button>
              {showDropdown && (
                <div className="bg-gray-800 absolute right-0 mt-2 py-2 w-40 text-white rounded shadow-lg">
                  {!isAdmin && (
                    <>
                      <a href="/edit-account" className="block px-4 py-2 text-sm hover:bg-gray-700">
                        <FaEdit className="inline-block mr-2" />Editar conta
                      </a>
                      <a href="/edit-account" className="block px-4 py-2 text-sm hover:bg-gray-700">
                        <FaTicketAlt className="inline-block mr-2" />Tickets
                      </a>
                    </>
                  )}
                  {isAdmin && (
                    <>
                      <a href="/purchases" className="block px-4 py-2 text-sm hover:bg-gray-700">
                        <FaMoneyBillWave className="inline-block mr-2" />Transações
                      </a>
                      <a href="/users/userList" className="block px-4 py-2 text-sm hover:bg-gray-700">
                        <FaUserCog className="inline-block mr-2" />Verificar Contas
                      </a>
                    </>
                  )}
                  <a href="/create-event" className="block px-4 py-2 text-sm hover:bg-gray-700">
                    <FaPlusCircle className="inline-block mr-2" />Criar evento
                  </a>
                  <a href="/" onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-700">
                    <FaStopCircle className="inline-block mr-2" />Sair
                  </a>
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