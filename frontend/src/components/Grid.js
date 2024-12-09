import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  margin: 125px auto 0; /* Adicionado margin-top para mover o container para baixo */
  max-width: 90%; /* Evita corte nas laterais */
  overflow: hidden; /* Esconde a barra de rolagem visual */
`;


const Table = styled.table`
  width: 100%;
  max-height: 400px; /* Define a altura máxima da tabela */
  overflow: auto; /* Ativa o scroll dentro do container */
  position: relative; /* Necessário para manter o cabeçalho fixo */
  background-color: #7d735b;
  padding: 20px;
  box-shadow: inset 0 0 25px black, 0px 0px 5px #ffdb99;
  border-radius: 5px;
  word-break: break-word;

  &::-webkit-scrollbar {
    width: 0; /* Esconde a barra de rolagem no Chrome/Safari */
    height: 0;
  }

  scrollbar-width: none; /* Esconde a barra de rolagem no Firefox */
`;

const Thead = styled.thead`
  position: sticky; /* Fixa o cabeçalho ao topo durante o scroll */
  top: 0;
  z-index: 1;
  background-color: #7d735b; /* Fundo consistente para o cabeçalho */
`;

const Tbody = styled.tbody`
  overflow-y: auto; /* Permite rolar apenas o corpo da tabela */
  display: block; /* Torna o scroll funcional dentro do container */
  max-height: 300px; /* Ajusta a altura do corpo para o scroll */
`;

const Tr = styled.tr`
  display: table;
  width: 100%; /* Garante que as linhas respeitem o layout da tabela */
  table-layout: fixed;
`;

const Th = styled.th`
  padding: 10px;
  text-align: start;
  border-bottom: inset;
`;

const Td = styled.td`
  padding: 10px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  background-color: #0d0d0a;
  color: #faf5c0;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #2c73d2;
  color: white;
  border: none;
  text-align: center;
  margin-top: 20px;
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleEdit = (item) => {
    setEditingUser(item.id); // Marca o usuário como em edição
    setUpdatedData({
      nome: item.nome,
      email: item.email,
      fone: item.fone,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (id) => {
    await axios
      .put("http://localhost:8800/" + id, updatedData)
      .then(({ data }) => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        );
        setUsers(updatedUsers);
        toast.success("Usuário atualizado com sucesso!");
      })
      .catch(({ data }) => toast.error(data));

    setEditingUser(null); // Sai do modo de edição
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setEditingUser(null);
  };

  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th onlyWeb>Fone</Th>
            <Th>Editar</Th>
            <Th>Deletar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td>
                {editingUser === item.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={updatedData.nome}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.nome
                )}
              </Td>
              <Td>
                {editingUser === item.id ? (
                  <input
                    type="email"
                    name="email"
                    value={updatedData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.email
                )}
              </Td>
              <Td>
                {editingUser === item.id ? (
                  <input
                    type="text"
                    name="fone"
                    value={updatedData.fone}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.fone
                )}
              </Td>
              <Td>
                {editingUser === item.id ? (
                  <button onClick={() => handleSave(item.id)}>Salvar</button>
                ) : (
                  <FaEdit onClick={() => handleEdit(item)} />
                )}
              </Td>
              <Td>
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/">
        <Button>Voltar para o Cadastro</Button>
      </Link>
    </Container>
  );
};

export default Grid;
