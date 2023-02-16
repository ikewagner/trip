import { useState, useEffect } from 'react';
import { collection, query, addDoc, doc, getDocs } from "firebase/firestore";
import { Header } from '../pages/components/Header';
import { db } from '../lib/Firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function CreateEvent() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [time, setTime] = useState("");
  const [local, setLocal] = useState("");
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsData = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEventos(eventsData);
    }
    fetchEvents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // adiciona o evento ao Firestore usando query e addDoc
    const q = query(collection(db, "events"));
    const newEventRef = doc(q);
    const newEventId = newEventRef.id;

    await addDoc(q, { id: newEventId, nome, local, data });
    // limpa os campos do formulário
    setNome("");
    setLocal("");
    setData("");
  };

  return (
    <>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Nome do evento:
            </label>
            <input
              type="text"
              id="name"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div>
            <label htmlFor="date" className="block font-medium">
              Data:
            </label>
            <input
              type="date"
              id="data"
              value={data}
              onChange={(event) => setData(event.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div>
            <label htmlFor="time" className="block font-medium">
              Hora:
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div>
            <label htmlFor="location" className="block font-medium">
              Localização:
            </label>
            <input
              type="text"
              id="location"
              value={local}
              onChange={(event) => setLocal(event.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Criar evento
          </button>
        </form>

        <h2 className="font-medium text-xl">Eventos criados:</h2>
        {eventos.map((evento) => (
          <div key={evento.id} className="border border-gray-300 p-4 rounded-md my-4">
            <p className="font-medium text-lg">{evento.nome}</p>
            <p>Data: {evento.data}</p>
            <p>Local: {evento.local}</p>
          </div>
        ))}
        </div>
      </>
      );
}