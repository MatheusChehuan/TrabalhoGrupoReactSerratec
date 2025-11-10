import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const salvo = JSON.parse(localStorage.getItem("usuario"));
    if (salvo) setUsuario(salvo);
  }, []);

  const navegarParaCarrinho = () => {
    navigate("/carrinho");
  };

  const navegarParaLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <nav>
      <div className="barra-items">
        <div className="barra-conteudo">
          <img src="/logo.png" className="logo" alt="Logo do site" />

          <div className="barra-pesquisa" style={{ display: "flex", alignItems: "center" }}>
            {/* Aqui você pode adicionar barra de pesquisa se quiser */}
          </div>

          <button type="button" className="carrinho" onClick={navegarParaCarrinho}>
            Carrinho
          </button>

          {usuario ? (
            <>
              <span style={{ color: "#2b2c2c", marginLeft: "10px" }}>
                Olá, {usuario.nome}
              </span>
              <button type="button" className="login" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <button type="button" className="login" onClick={navegarParaLogin}>
              Login
            </button>
          )}
        </div>
      </div>

      <div className="links">
        <Link to="/">Inicio</Link>
        <Link to="/categoria/derretidos">Derretidos</Link>
        <Link to="/categoria/fatiados">Fatiados</Link>
        <Link to="/categoria/degustacao">Degustacao</Link>
      </div>
    </nav>
  );
}