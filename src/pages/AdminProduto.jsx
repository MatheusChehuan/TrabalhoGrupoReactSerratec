import React, { useEffect, useState } from "react";
import axios from "axios";
import ProdutoList from "../components/ProdutoList";
import ProductForm from "../components/ProductForm";
import SearchBar from "../components/SearchBar";
import Toast from "../components/Toast";

const API_URL = "http://localhost:8080/produto";

const AdminProduto = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtoEdit, setProdutoEdit] = useState(null);
    const [busca, setBusca] = useState("");
    const [toastMsg, setToastMsg] = useState("");

    const listarProdutos = async () => {
        try {
            const response = await axios.get(`${API_URL}/listar`);
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
        }
    };

    useEffect(() => {
        listarProdutos();
    }, []);

    const handleSubmit = async (produto) => {
        try {

            //TODO Corrigir para não precisar de um de para
            const produtoRequest = {
                categoria: 1,
                nome: produto.nome,
                valor: parseFloat(produto.valor),
                descricao: produto.descricao,
            };

            produto.categoria = 1;
            console.log("Produto enviado para API:", produto);
            if (produto.id) {
                await axios.put(`${API_URL}/${produto.id}`, produtoRequest);
                setToastMsg("Produto atualizado com sucesso!");
            } else {
                await axios.post(API_URL, produto);
                setToastMsg("Produto cadastrado com sucesso!");
            }
            setProdutoEdit(null);
            listarProdutos();
        } catch (error) {
            console.error("Erro ao salvar produto:", error);

            const mensagemErro =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Erro ao salvar o produto. Tente novamente.";

            console.log("Erro da API:", error.response);
            setToastMsg(mensagemErro);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Deseja realmente excluir este produto?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setToastMsg("Produto excluído com sucesso!");
                listarProdutos();
            } catch (error) {
                console.error("Erro ao excluir produto:", error);

                const mensagemErro =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Erro ao excluir o produto.";

                setToastMsg(mensagemErro);
            }
        }
    };

    const produtosFiltrados = produtos.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="admin-produto container">
            <h1>Painel Administrativo</h1>

            <SearchBar value={busca} onChange={setBusca} />

            <button className="btn novo" onClick={() => setProdutoEdit({})}>
                Novo Produto
            </button>

            {produtoEdit && (
                <ProductForm
                    produtoEdit={produtoEdit}
                    onSubmit={handleSubmit}
                    onCancel={() => setProdutoEdit(null)}
                />
            )}

            <ProdutoList
                produtos={produtosFiltrados}
                onEdit={setProdutoEdit}
                onDelete={handleDelete}
                isAdmin={true}
            />

            <Toast message={toastMsg} onClose={() => setToastMsg("")} />
        </div>
    );
};

export default AdminProduto;
