import React, { useState, useEffect } from 'react';
import { db } from "../../lib/Firebase";
import 'firebase/firestore';
import { collection, query, onSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import EventGrid from "./eventGrid";

const eventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "events"));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setEvents(ar);
            setLoading(false);
        }, (error) => {
            setError(error);
            setLoading(false);
        });
    }, []);

    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Header />
            <EventGrid events={events} />
        </>
    );
};

export default eventList;