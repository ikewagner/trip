import Header from "./components/Header";
import { auth } from "./../lib/Firebase";
import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import UserTable from "./../pages/users/userTable";


const events = [
    { name: 'Event 1', location: 'New York', data: 10 / 12 / 2023, price: 199.99 },
    { name: 'Event 2', location: 'Los Angeles', data: 10 / 12 / 2023, price: 57.99 },
    { name: 'Event 3', location: 'Chicago', data: 10 / 12 / 2023, price: 43.99 },
    { name: 'Event 4', location: 'Miami', data: 10 / 12 / 2023, price: 53.99 },
    { name: 'Event 5', location: 'San Francisco', data: 10 / 12 / 2023, price: 60.99 },
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
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredEvents.map((event) => (
                            <div className="my-4 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={event.name}>
                                <article className="overflow-hidden rounded-lg shadow-lg">
                                    <a href="#">
                                        <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
                                    </a>
                                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                        <h1 className="text-lg">
                                            <a className="no-underline hover:underline text-black" href="#">
                                                {event.name}
                                            </a>
                                        </h1>
                                        <p className="text-grey-darker text-sm">
                                            {event.data}
                                        </p>
                                    </header>
                                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                        <a className="flex items-center no-underline hover:underline text-black" href="#">
                                            <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
                                            <p className="ml-2 text-sm">
                                                {event.location}
                                            </p>
                                        </a>
                                        <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                            <span className="hidden">Like</span>
                                            <i className="fa fa-heart"></i>
                                        </a>
                                    </footer>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;