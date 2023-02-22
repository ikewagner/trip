import { useRouter } from "next/router";
import { auth } from "./../../lib/Firebase";
import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUser, FaEdit, FaMoneyBillWave, FaUserCog, FaStopCircle, FaPlusCircle, FaTicketAlt } from "react-icons/fa";
import { collection, query, onSnapshot, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/Firebase";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [eventData, setEventData] = useState(null);


  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (id) {
      const q = query(
        collection(db, "events"),
        where("id", "==", id),
      );

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserName(data.nome);
        });
      });
    }
  }, [user]);

  return (
    <div>
      <h1>Detalhes do evento {userName}</h1>
    
    </div>
  );
};

export default EventDetail;