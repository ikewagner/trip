import Head from 'next/head';
import { useState } from 'react';

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleEventLocationChange = (event) => {
    setEventLocation(event.target.value);
  };

  const handleEventDateChange = (event) => {
    setEventDate(event.target.value);
  };

  const handleEventTimeChange = (event) => {
    setEventTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // handle form submission here
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>Criação de Eventos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-8">Criação de Eventos</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="eventName">
              Nome do Evento
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              id="eventName"
              name="eventName"
              value={eventName}
              onChange={handleEventNameChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="eventLocation">
              Localização
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="text"
              id="eventLocation"
              name="eventLocation"
              value={eventLocation}
              onChange={handleEventLocationChange}
              required
            />
            <button className="mt-2 bg-blue-500 text-white rounded py-2 px-4" onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  setEventLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
                });
              } else {
                alert('Seu navegador não suporta geolocalização.');
              }
            }}>Usar minha localização</button>
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="eventDate">
              Data
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="date"
              id="eventDate"
              name="eventDate"
              value={eventDate}
              onChange={handleEventDateChange}
              required
            />
          </div>

          <div className="mb-8">
            <label className="block font-bold mb-2" htmlFor="eventTime">
              Horário
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="time"
              id="eventTime"
              name="eventTime"
              value={eventTime}
              onChange={handleEventTimeChange}
              required
            />
          </div>

          <button className="bg-blue-500 text-white rounded py-2 px-4" type="submit">
            Criar Evento
          </button>
        </form>
      </main>
    </div>
  );
}