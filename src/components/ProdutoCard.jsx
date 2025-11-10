export default function ProdutoCard({ produto, onAdd }) {
  return (
    <div className="produto-card">
      <h3>{produto.nome}</h3>
      <h1>{produto.descricao}</h1>
      <h2>R$ {produto.valor}</h2>
      <button onClick={onAdd}>Adicionar ao carrinho</button>
    </div>
  );
}
