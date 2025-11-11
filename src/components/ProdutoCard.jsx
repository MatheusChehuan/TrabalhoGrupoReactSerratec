import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaShoppingCart } from "react-icons/fa";

const ProdutoCard = ({ produto, onEdit, onDelete, isAdmin = false, onAdd }) => {
  if (!produto) return null;

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
      <img
        src={imagem}
        alt={produto.nome}
        className="produto-imagem"
        onError={(e) => (e.target.src = "https://via.placeholder.com/250x200?text=Sem+Imagem")}
      />

      <div className="produto-card-content">
        <h3>{produto.nome}</h3>
        <p className="preco">
          {Number(produto.valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        {produto.categoria && <p>Categoria: {produto.categoria}</p>}
        {produto.descricao && <p>{produto.descricao}</p>}
      </div>

      <div className="produto-card-actions">
        {isAdmin ? (
          <>
            <button className="btn editar" onClick={onEdit}>
              <FaEdit /> Editar
            </button>
            <button className="btn excluir" onClick={onDelete}>
              <FaTrash /> Excluir
            </button>
          </>
        ) : (
          <button className="btn adicionar" onClick={() => onAdd(produto)}>
            <FaShoppingCart /> Adicionar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProdutoCard;
