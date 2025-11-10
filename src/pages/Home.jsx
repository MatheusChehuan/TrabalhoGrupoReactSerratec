import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import ProdutoCard from "../components/ProdutoCard";
import Footer from "../components/Footer";

export default function Loja() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => { api.get("/produto/listar").then((res) => setProdutos(res.data));}, []);

  const adicionarAoCarrinho = (produto) => {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const existente = carrinho.find((p) => p.id === produto.id);

    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Todos os Produtos</h1>
        <div className="produtos">
          {produtos.map((p) => (<ProdutoCard key={p.id} produto={p} onAdd={() => 
            adicionarAoCarrinho(p)}/>))}
        </div>
      </main>
      <Footer />
    </>
  );
}
