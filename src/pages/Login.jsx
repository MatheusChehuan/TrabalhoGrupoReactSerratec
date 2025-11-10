import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, senha });
      if (res.data) {
        localStorage.setItem("usuario", JSON.stringify(res.data));
        alert("Login realizado com sucesso!");
        navigate("/");
      } else {
        alert("Credenciais inválidas");
      }
    } catch (err) {
      alert("Erro ao tentar logar");
    }
  };

  return (
    <>
      <Navbar />
      <main className="login">
        
        <form onSubmit={login} className="form"  style={{marginTop:"100px"}}>
          <h1>Login</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  required/>
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
          <button type="submit">Entrar</button>
        </form>
        <h3 style={{ color: "#2c2b2b", marginTop: "20px" }}> Ainda não tem conta?</h3>
          <span
            style={{ color: "#757027ff", cursor: "pointer" }}
            onClick={() => navigate("/usuarios/novo")}
          >
            Cadastre-se aqui
          </span>
      </main>
      <Footer />
    </>
  );
}