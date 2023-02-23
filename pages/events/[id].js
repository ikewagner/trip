import { useRouter } from "next/router";
import { auth } from "./../../lib/Firebase";
import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaTicketAlt } from "react-icons/fa";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../lib/Firebase";
import Head from 'next/head';
import Image from 'next/image';

const EventDetail = () => {

  const [numTickets, setNumTickets] = useState({ comum: 1, vip: 0, camarote: 0 });
  
  const tickets = [
    { type: 'comum', price: 50 },
    { type: 'vip', price: 100 },
    { type: 'camarote', price: 200 },
  ];

  const handleNumTicketsChange = (event, type) => {
    const value = parseInt(event.target.value, 10);
    setNumTickets((prevNumTickets) => ({ ...prevNumTickets, [type]: isNaN(value) ? '' : value }));
  };

  const handleBuyAll = () => {
    const total =
      numTickets.comum * tickets.find((ticket) => ticket.type === 'comum').price +
      numTickets.vip * tickets.find((ticket) => ticket.type === 'vip').price +
      numTickets.camarote * tickets.find((ticket) => ticket.type === 'camarote').price * 2;
    alert(`Adicionado ao carrinho: ${numTickets.comum} ingressos comuns, ${numTickets.vip} ingressos VIP e ${numTickets.camarote} ingressos camarote por R$${total.toFixed(2)}`);
  };

  const router = useRouter();
  const { id } = router.query;
  const [eventData, setEventData] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [cidade, setCidade] = useState("");

  useEffect(() => {
    if (id) {
      const q = query(
        collection(db, "events"),
        where("id", "==", id),
      );

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          setNome(data.nome);
          setDescricao(data.descricao);
          setData(data.dia);
          setHora(data.hora);
          setLocalizacao(data.endereco);
          setCidade(data.cidade)
        });
      });
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>{nome} - Detalhes do Evento</title>
        <meta name="description" content={`Detalhes do evento: ${descricao}`} />
      </Head>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4 md:mb-0">
            <Image

              width={600}
              height={400}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-2">{nome}</h1>
            <p className="text-gray-500 mb-4">
              {data} - {hora}
            </p>
            <p className="text-gray-500 mb-4">{localizacao} - {cidade}</p>
            <p className="text-gray-500 mb-4">{descricao}</p>
            <div className="mt-8">
              <div className="grid grid-cols-3 gap-4">
                {tickets.map((ticket) => (
                  <div key={ticket.type} className="bg-gray-100 rounded-lg p-4">
                    <div className="text-lg font-bold mb-2">{ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)}</div>
                    <div className="text-gray-500">{`R$ ${ticket.price.toFixed(2)}`}</div>
                    <div className="mt-2">
                      <label htmlFor={`numTickets-${ticket.type}`} className="mr-2 font-bold">
                        Quantidade:
                      </label>
                      <input
                        id={`numTickets-${ticket.type}`}
                        type="number"
                        min="1"
                        step="1"
                        value={numTickets[ticket.type]}
                        onChange={(event) => handleNumTicketsChange(event, ticket.type)}
                        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-20 px-2 py-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <label htmlFor="numTickets-total" className=" font-bold py-3">
                Total:
              </label>
              <input
                id="numTickets-total"
                type="text"
                value={`R$ ${(numTickets.comum * tickets.find((ticket) => ticket.type === 'comum').price +
                  numTickets.vip * tickets.find((ticket) => ticket.type === 'vip').price +
                  numTickets.camarote * tickets.find((ticket) => ticket.type === 'camarote').price * 2).toFixed(2)}`}
                className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-32 px-3 py-3"
                readOnly
              />
            </div>
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleBuyAll()}
              >
                <FaTicketAlt className="inline-block mr-2" />
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default EventDetail;