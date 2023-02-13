import Header from "./components/Header";
import { auth } from "./../lib/Firebase";
import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import UserTable from "./../pages/users/userTable";


const events = [
    { name: 'Event 1', location: 'New York' },
    { name: 'Event 2', location: 'Los Angeles' },
    { name: 'Event 3', location: 'Chicago' },
    { name: 'Event 4', location: 'Miami' },
    { name: 'Event 5', location: 'San Francisco' },
];

const Home = () => {
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [user] = useAuthState(auth);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredResults = events.filter(
            (event) => event.name.toLowerCase().includes(searchTerm) || event.location.toLowerCase().includes(searchTerm)
        );
        setFilteredEvents(filteredResults);
    };

    return (
        <>
            <Header />
            <div className="relative overflow-x-auto">
                <h2 className="mt-16 text-lg font-medium text-center">Eventos em destaque na <b>TRIP.</b></h2>
                <div className="flex justify-center align-center mt-10">
                    <input
                        className="bg-gray-200 p-2 w-96"
                        type="text"
                        placeholder="Pesquisar usuários"
                        onChange={handleSearch}
                    />
                </div>
                <div>

                    <ul className="mt-10">
                        {filteredEvents.map((event) => (
                            <li className="p-2 bg-gray-100" key={event.name}>
                                {event.name} - {event.location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Home;