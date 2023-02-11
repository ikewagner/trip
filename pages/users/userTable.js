import React, { useState } from 'react';

const userTable = ({ users }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTodos = users ? users.filter((user) => {
        return user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.nome.toLowerCase().includes(searchTerm.toLowerCase());
    }) : [];

    return (
        <div className="relative overflow-x-auto">
            <h2 className="mt-16 text-lg font-medium text-center">Usuários do Sistema</h2>
            <div className="flex justify-center align-center mt-10">
                <input
                    className="border border-gray-400 px-10 py-2"
                    type="text"
                    placeholder="Pesquisar nome ou email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="mt-16 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Nome</th>
                        <th scope="col" className="px-6 py-3">Bloqueado</th>
                        <th scope="col" className="px-6 py-3">Permissão</th>
                        <th scope="col" className="px-6 py-3">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTodos.map((user) => (
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.nome}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span className={user.isBlocked ? 'bg-green-500 text-white inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full' : 'bg-red-500 text-white inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full'}>
                                    {user.isBlocked ? 'Sim' : 'Não'}
                                </span>
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span className={user.isAdmin ? 'bg-orange-400 text-white inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full' : 'bg-gray-500 text-white inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full'}>
                                    {user.isAdmin ? 'Admin' : 'Cliente'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleEditClick(user)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default userTable;