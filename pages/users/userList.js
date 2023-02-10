import React, { useState, useEffect } from 'react';
import { db } from "../../lib/Firebase";
import 'firebase/firestore';
import { collection, query, onSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import UserTable from "./userTable";

const userList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "users"));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setTodos(ar);
            setLoading(false);
        }, (error) => {
            setError(error);
            setLoading(false);
        });
    }, []);

    if (loading) return(
        <p>Loading...</p>
    );
    
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Header />
            <UserTable todos={todos} />
        </>
    );
};

export default userList;