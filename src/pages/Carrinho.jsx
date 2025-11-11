import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);

  let total = 0;
  for (let i = 0; i < carrinho.length; i++) {
    total += carrinho[i].valor * carrinho[i].quantidade;
  }


  useEffect(() => {
    const salvo = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(salvo);
  }, []);

  const atualizar = (item, novaQuantidade) => {
    if (novaQuantidade < 1) return;

    const atualizado = carrinho.map((p) =>
      p.id === item.id ? { ...p, quantidade: novaQuantidade } : p
    );

    setCarrinho(atualizado);
    localStorage.setItem("carrinho", JSON.stringify(atualizado));
  };

  const remover = (id) => {
    const atualizado = carrinho.filter((p) => p.id !== id);
    setCarrinho(atualizado);
    localStorage.setItem("carrinho", JSON.stringify(atualizado));
  };

  const navegarParaPedido = () => {
    navigate("/pedidos/inserir");
  };

  return (
    <>
      <Navbar />
      <main className="container">

        <h1>Meu Carrinho</h1>

        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>) : (carrinho.map((item) => (

            <div key={item.id} className="item-carrinho">

              <h3>{item.nome}</h3>

              <p>Preço: R${item.valor},00</p>

              <div>

                <button onClick={() => atualizar(item, item.quantidade - 1)}>-</button>

                <span style={{ margin: "0 10px" }}>{item.quantidade}</span>

                <button onClick={() => atualizar(item, item.quantidade + 1)}>+</button>

                <button style={{ marginLeft: "10px",width:"100%" }} onClick={() => remover(item.id)}>Remover</button>

              </div>
            </div>
          ))
        )}
        {carrinho.length > 0 && (
        <h3 style={{ marginTop: "20px", backgroundColor: "#2c2b2b", padding: "10px", color: "white", borderRadius:"20px"}}>
          Total: R${total},00
        </h3>
        )}
        <button type="button" className="pedido" onClick={navegarParaPedido} style={{ marginTop: "20px" }}>
          Finalizar Pedido
        </button>
        
      </main>
      <Footer />
    </>
  );
}