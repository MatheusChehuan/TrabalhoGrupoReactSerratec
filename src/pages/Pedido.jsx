import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pedido() {
  const [carrinho, setCarrinho] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(itens);
  }, []);

  const finalizarCompra = async () => {
    if (carrinho.length === 0) {
      alert("Carrinho vazio!");
      return;
    }

    try {
      await api.post("/pedidos/inserir", { itens: carrinho });
      setMensagem("Compra finalizada com sucesso!");
      localStorage.removeItem("carrinho");
      setCarrinho([]);
    } catch (erro) {
      console.error("Erro ao finalizar pedido:", erro);
      setMensagem("Erro ao enviar pedido.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Finalizar Pedido</h2>
        {carrinho.length === 0 ? (
          <p>Nenhum produto no carrinho.</p>
        ) : (
          <>
            <ul>
              {carrinho.map((item) => (
                <li key={item.id}>
                  {item.nome} - {item.quantidade}x R${item.preco}
                </li>
              ))}
            </ul>
            <button onClick={finalizarCompra}>Confirmar Compra</button>
          </>
        )}
        {mensagem && <p style={{ marginTop: "20px" }}>{mensagem}</p>}
      </div>
      <Footer />
    </>
  );
}
