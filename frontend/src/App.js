import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importações necessárias
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ParticlesComponent from './components/Particles';


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Router> {/* Envolva o app com o Router */}
      <GlobalStyle />
      <ParticlesComponent id="particles" />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <Routes> {/* Defina as rotas */}
        {/* Página de Cadastro */}
        <Route path="/" element={<Form getUsers={getUsers} onEdit={onEdit} setOnEdit={setOnEdit} />} />

        {/* Página de Usuários Cadastrados */}
        <Route path="/usuarios" element={<Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />} />
      </Routes>
    </Router>
  );
}

export default App;
