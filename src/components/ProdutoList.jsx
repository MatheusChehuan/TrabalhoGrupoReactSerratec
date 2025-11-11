import React from "react";
import ProdutoCard from "./ProdutoCard";

const ProdutoList = ({ produtos, onEdit, onDelete, onAddToCart, isAdmin = false }) => {
  if (!produtos || produtos.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <div className="produto-list">
      {produtos.map((produto) => (
        <ProdutoCard
          key={produto.id}
          produto={produto}
          onEdit={() => onEdit?.(produto)}
          onDelete={() => onDelete?.(produto.id)}
          onAddToCart={onAddToCart}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default ProdutoList;
