import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loja from "./pages/Home";
import Categoria from "./pages/Categoria";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import UsuarioForm from "./pages/CriarUsuario";
import Pedido from "./pages/Pedido";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProduto from "./pages/AdminProduto";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loja />} />
        <Route path="/categoria/:nomeCategoria" element={<Categoria />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios/novo" element={<UsuarioForm />} />
        <Route path="/pedidos/inserir" element={<Pedido />} />
        <Route
          path="/admin/produtos"
          element={
            <ProtectedRoute>
              <AdminProduto />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
