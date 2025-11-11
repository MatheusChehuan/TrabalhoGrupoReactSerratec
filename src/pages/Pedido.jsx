import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pedido() {
  const [carrinho, setCarrinho] = useState([]);
  const [mensagem, setMensagem] = useState("");


  let total = 0;
  for (let i = 0; i < carrinho.length; i++) {
    total += carrinho[i].valor * carrinho[i].quantidade;
  }

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
              <button style={{width:"100%"}} onClick={finalizarCompra}>Confirmar Compra</button>
              
              {carrinho.length > 0 && (
              <h3 style={{ marginTop: "20px" }}>
                Total do pedido: R${total},00
              </h3>
            )}

            </>
          )}

          {mensagem && <p style={{ marginTop: "20px" }}>{mensagem}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
