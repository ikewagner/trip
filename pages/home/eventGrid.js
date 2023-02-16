import React, { useState } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";

const eventGrid = ({ events }) => {

    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEvents = events ? events.filter((event) => {
        return event.nome.toLowerCase().includes(searchTerm.toLowerCase());
    }) : [];

    return (
        <div className="relative overflow-x-auto">
            <h2 className="mt-16 text-lg font-medium text-center py-5">Eventos em destaque</h2>
            <div className="flex justify-center align-center mt-10">
                <input
                    className="bg-gray-200 p-2 w-96"
                    type="text"
                    placeholder="Pesquisar eventos"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEvents.map((event) => (
                        <div className="my-4 px-1 w-full " key={event.id} >
                            <article className="overflow-hidden rounded-lg shadow-lg">
                                <a href={`/event/${event.id}`}>
                                    <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
                                </a>
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-base">
                                        <a className=" font-medium text-blue-400">
                                            {event.data}
                                        </a>
                                    </h1>
                                </header>
                                <boby className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <a className=" font-bold no-underline hover:underlinetext-grey-darker text-lg" href={`/event/${event.id}`}>
                                            {event.nome}
                                        </a>
                                    </h1>
                                </boby>
                                <footer className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <a className="flex items-center no-underline text-gray-400 font-medium">
                                        <FaMapMarkerAlt />
                                        <p className="ml-2 text-sm">{event.local}</p>
                                    </a>
                                </footer>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
            {filteredEvents.length === 0 && (
                <div className="justify-center align-center mt-10 text-center text-gray-400">
                    <h1><b>Sem resultados 😲</b></h1>
                    <div className="justify-center align-center mt-10 text-center">
                        <p>Não encontramos eventos que correspondam à sua busca. Tente buscar outras palavras-chave.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default eventGrid;