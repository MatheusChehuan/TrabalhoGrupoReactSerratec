import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);

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
                
                <button style={{ marginLeft: "50px" }} onClick={() => remover(item.id)}>Remover</button>
              
              </div>
            </div>
          ))
        )}
        <button type="button" className="pedido" onClick={navegarParaPedido} style={{marginTop: "20px"}}>
            Finalizar Pedido
          </button>
      </main>
      <Footer />
    </>
  );
}