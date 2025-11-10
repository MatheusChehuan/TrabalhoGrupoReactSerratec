export default function CarrinhoItem({ item, atualizar, remover }) {
  return (
    <div className="carrinho-item">
      
      <div>
        <strong>{item.nome}</strong> — R${item.preco}
      </div>
      
      <div>        
        <button onClick={() => atualizar(item, item.quantidade - 1)}>-</button>
        
        <span style={{ margin: "0 10px" }}>{item.quantidade}</span>

        <button onClick={() => atualizar(item, item.quantidade + 1)}>+</button>

        <button style={{ marginLeft: "10px" }} onClick={() => remover(item.id)}>Remover</button>
      </div>
    
    </div>
  );
}
