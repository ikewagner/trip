import { useState, useEffect } from 'react';
import { collection, query, addDoc, doc, getDocs } from "firebase/firestore";
import { db } from '../lib/Firebase';
import Router from "next/router";
import { auth } from "./../lib/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaMapMarkerAlt } from "react-icons/fa";


export default function CreateEvent() {
  const [user, loading, error] = useAuthState(auth);
  const [nome, setNome] = useState("");
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [eventos, setEventos] = useState([]);
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`)
            .then((response) => response.json())
            .then((data) => {
              setCidade(data.city);
              setEndereco(data.locality);
            })
            .catch((error) => console.log(error));
        },
        (error) => console.log(error)
      );
    } else {
      console.log("A geolocalização não é suportada por este navegador.");
    }
  };

  useEffect(() => {
    async function fetchEvents() {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsData = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEventos(eventsData);
    }
    fetchEvents();
  }, [user]);

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    
    // adiciona o evento ao Firestore apenas se o endereço e a cidade estiverem preenchidos
    if (cidade && endereco && nome) {
      const q = query(collection(db, "events"));
      const newEventRef = doc(q);
      const newEventId = newEventRef.id;
      await addDoc(q, { id: newEventId, nome, endereco, cidade, dia, hora, descricao });
      alert("event criado")
      Router.push("/");
    } else {
      alert("Por favor, preencha o endereço e a cidade antes de criar o evento.");
    }
  };

  const voltar = () => {

    Router.push("/");
  };

 
  return (
    <>

      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center md:py-4 sm:p-16">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600"><b>Criar Evento Presencial</b></h2>
            <p className="text-gray-500 mb-6">Transforme sua ideia em um evento inesquecível: planeje, promova e realize conosco!</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Detalhes do evento</p>
                  <p>Por favor, preencha todos os campos.</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label for="nome">Nome do evento</label>
                      <input type="text" name="nome" id="nome" value={nome} onChange={(event) => setNome(event.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Nome do evento" />
                    </div>
                    <div className="md:col-span-2">
                      <label for="time">Hora</label>
                      <input type="time" name="hora" id="hora" value={hora} onChange={(event) => setHora(event.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                    </div>
                    <div className="md:col-span-3">
                      <label for="data">Dia</label>
                      <input type="date" id="data" value={dia} onChange={(event) => setDia(event.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                    </div>
                    <div className="md:col-span-3">
                      <label for="address">Endereço / Rua</label>
                      <input type="text" id="endereco" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Endereço" />
                    </div>
                    <div className="md:col-span-2">
                      <label for="city">Cidade</label>
                      <input type="text" id="cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Cidade" />
                    </div>
                    <div className="md:col-span-5">
                      <label for="descricao">Descrição</label>
                      <input type="text" name="descricao" id="descricao" value={descricao} onChange={(event) => setDescricao(event.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Digite uma descrição do evento" />
                    </div>
                    <div className="md:col-span-3">
                      <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center" onClick={handleUseLocation}>
                        <FaMapMarkerAlt className="mr-2" />
                        Usar localização atual
                      </button>
                    </div>
                    <div className="md:col-span-5 text-right py-4">
                      <div className="inline-flex items-end">
                        <button onClick={voltar} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mx-3">Cancelar</button>
                        <button onClick={handleCreateEvent} className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">Criar evento</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}