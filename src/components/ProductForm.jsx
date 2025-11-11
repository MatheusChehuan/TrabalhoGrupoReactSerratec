import React, { useState, useEffect } from "react";

const ProductForm = ({ produtoEdit, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    nome: "",
    valor: "",
    descricao: "",
    categoria: "",
  });

  useEffect(() => {
    if (produtoEdit) {
      setForm(produtoEdit);
    } else {
      setForm({
        nome: "",
        valor: "",
        descricao: "",
        categoria: "",
      });
    }
  }, [produtoEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.valor) {
      alert("Preencha os campos obrigatórios!");
      return;
    }
    onSubmit(form);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{produtoEdit ? "Editar Produto" : "Novo Produto"}</h3>

      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
      />
      <input
        name="valor"
        placeholder="Preço"
        type="number"
        value={form.valor}
        onChange={handleChange}
        required
      />
      <input
        name="categoria"
        placeholder="Categoria"
        value={form.categoria}
        onChange={handleChange}
      />
      <textarea
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
      />

      <div className="actions">
        <button type="submit" className="btn salvar">
          Salvar
        </button>
        <button type="button" className="btn cancelar" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
