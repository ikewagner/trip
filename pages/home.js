import Header from "./components/Header";
import { auth } from "./../lib/Firebase";
import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import UserTable from "./../pages/users/userTable";

const HomePage = () => {

    const [user] = useAuthState(auth);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <Header />
            
            <div>
                {!user && (
                    <h1 className="text-gray-500 align-items-center">
                        Seja bem-vindo!
                    </h1>
                )}
                {user && (
                    <h1 className="text-gray-500 align-items-center">
                        Seja bem-vindo, {user.displayName}
                    </h1>
                )}
            </div>
        </>
    );
};

export default HomePage;