import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  margin: 125px auto 0;
  max-width: 90%;
  overflow: hidden;
  position: relative; /* Ensure it's positioned */
  z-index: 1; /* Ensures it appears above particles */
`;

const Table = styled.table`
  width: 100%;
  max-height: 400px;
  overflow: auto;
  position: relative;
  background-color: #7d735b;
  padding: 20px;
  box-shadow: inset 0 0 25px black, 0px 0px 5px #ffdb99;
  border-radius: 5px;
  word-break: break-word;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scrollbar-width: none;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #7d735b;
`;

const Tbody = styled.tbody`
  overflow-y: auto;
  display: block;
  max-height: 300px;
`;

const Tr = styled.tr`
  display: table;
  width: 100%;
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
  background-color: #f7a50c;
  box-shadow: inset 0 0 15px #9c6308, 1px 1px 2px black;
  color: white;
  border: none;
  text-align: center;
  margin-top: 20px;
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleEdit = (item) => {
    setEditingUser(item.id);
    setUpdatedData({
      nome: item.nome,
      email: item.email,
      senha: item.senha,
      data_nascimento: item.data_nascimento,  // Adiciona o campo de data de nascimento
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

    setEditingUser(null);
  };

  const handleDelete = async (id, nome) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja deletar o usuário ${nome}?`);
    if (!confirmDelete) {
      return;
    }

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
            <Th>Data de Nascimento</Th> {/* Coluna para a data de nascimento */}
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
                    type="date"
                    name="data_nascimento"  // Campo de data de nascimento
                    value={updatedData.data_nascimento}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.data_nascimento // Exibe a data de nascimento se não estiver editando
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
                <FaTrash onClick={() => handleDelete(item.id, item.nome)} />
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
