import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../lib/Firebase";
import { getFirestore, collection, addDoc} from "firebase/firestore";

import Router from "next/router";

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!email) {
      console.error("Email is empty");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuário cadastrado com sucesso:", user);

      const db = getFirestore();
      const isBlocked = false;
      const isAdmin = false;
      const usersCollection = collection(db, "users");
      await addDoc(usersCollection, {
        nome,
        email,
        isBlocked,
        isAdmin,
        userId: user.uid,
      });

      Router.push("/");
    } catch (error) {
      console.error("Erro ao cadastrar o usuário:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-sky-50 to-gray-200 min-h-screen py-10">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12 login-container">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold text-center">Entre hoje mesmo para a <b>TRIP.</b></h2>
              </div>
              <div className="mt-16 grid space-y-4">
              <input className="group h-12 px-6 border-2 border-gray-300 rounded-full"
                  type="text"
                  id="nome"
                  placeholder="Digite seu Nome Completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                >
                </input>
                <input className="group h-12 px-6 border-2 border-gray-300 rounded-full"
                  type="email"
                  id="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                </input>
                <input className="group h-12 px-6 border-2 border-gray-300 rounded-full"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                >
                </input>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button" onClick={handleCreateAccount}
                  >
                    Registrar
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/auth/login"
                  >
                    Já tem uma conta? Entrar
                  </a>
                </div>
                <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center" >
                    <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-5" alt="google logo"></img>
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;