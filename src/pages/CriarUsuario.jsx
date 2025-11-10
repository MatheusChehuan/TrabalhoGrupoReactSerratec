import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UsuarioForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const salvar = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios", { nome, email, senha });
      alert("Usuário criado com sucesso!");
      navigate("/login");
    } catch (err) {
      alert("Erro ao criar usuário");
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Criar Usuário</h1>
        
        <form onSubmit={salvar} className="form">

          <input type="text" placeholder="Nome" value={nome}
            onChange={(e) => setNome(e.target.value)}
            required/>

          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>

          <input type="password" placeholder="Senha" value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required/>

          <button type="submit">Salvar</button>
        </form>
      </main>
      <Footer />
    </>
  );
}