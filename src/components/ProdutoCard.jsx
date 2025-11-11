import axios from "axios";
import { useEffect, useState } from "react";

export default function ProdutoCard({ produto, onAdd }) {
   const [imagem, setImagem] = useState("");

  useEffect(() => {
    axios
      .get(`https://pixabay.com/api/?key=53191940-45f77bd7c754c58ed993d8341&q=${produto.nome}&image_type=photo`)
      .then(res => {
        if (res.data.hits.length > 0) {
          setImagem(res.data.hits[0].webformatURL);
        }
      });
  }, []);

  return (

    <div className="produto-card">
      <img src={imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <h1>{produto.descricao}</h1>
      <h2>R$ {produto.valor}</h2>
      <button onClick={onAdd}>Adicionar ao carrinho</button>
    </div>
  );
}
