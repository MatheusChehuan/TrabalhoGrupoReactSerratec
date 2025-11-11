import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pedido() {
  const [carrinho, setCarrinho] = useState([]);
  const [mensagem, setMensagem] = useState("");


  useEffect(() => {
    const itensLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(itensLocal);
  }, []);

  const finalizarCompra = async () => {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  // Mapeia para o formato esperado pela API
  const itensParaApi = carrinho.map(item => ({
    produtoId: item.id,
    quantidade: item.quantidade
  }));

  try {
    await api.post("/pedidos/inserir", {
      clienteId: "509f31fd-1481-4de9-b00c-0e385ce51b8f",
      itens: itensParaApi
    });

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
      <main>
        <div className="Finalizar" style={{ padding: "200px" }}>
          <h2>Finalizar Pedido</h2>

          {carrinho.length === 0 ? (
            <p>Nenhum produto no carrinho.</p>
          ) : (
            <>
              <ul>
                {carrinho.map((item) => (
                  <li key={item.id}>
                    {item.quantidade} x {item.nome} - R${item.valor * item.quantidade},00
                  </li>
                ))}
              </ul>
              <button onClick={finalizarCompra}>Confirmar Compra</button>
            </>
          )}

          {mensagem && <p style={{ marginTop: "20px" }}>{mensagem}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
