import React, { useState } from "react";
import Link from 'next/link'

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  });

  const { email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.error("Passwords do not match");
    } else {
      console.log(formData);
      // make API request to register user
    }
  };

  return (
    <div className=" min-h-screen p-10">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-10">
        <img src="/logo.png" alt="logo" className="mx-auto mb-6" width={64} height={64} />
        <h2 className="text-lg font-medium text-center mb-4">Registrar</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password2"
              type="password"
            >
              Confirmar Senha
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600">
            Registrar
          </button>
          <Link href="/auth/login" legacyBehavior>
            <a className="block mt-4 text-center text-indigo-500 font-medium">Você já tem uma conta? Fazer login</a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;