import React, { useState } from 'react';

const TodoTable = ({ todos }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const handleEditClick = (todo) => {
        setSelectedTodo(todo);
        setShowModal(true);
        console.log("mdpsmpmp")
    };

    return (
        <div className="relative overflow-x-auto">
            <h2 className="mt-16 text-lg font-medium text-center">Usuários do Sistema</h2>
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
                    {todos &&
                        todos.map((todo) => (
                            <tr key={todo.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{todo.email}</td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{todo.nome}</td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {todo.isBlocked ? 'Sim' : 'Não'}
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <span className={todo.isAdmin ? 'bg-red-500 text-white p-1' : 'bg-gray-500 text-white p-1 '}>
                                        {todo.isAdmin ? 'Admin' : 'Cliente'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleEditClick(todo)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoTable;