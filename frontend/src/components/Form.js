import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Importando Link para navegação

const FormContainer = styled.form`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  background-color: #7d735b;
  padding: 20px;
  box-shadow: inset 0 0 25px black,
              0px 0px 5px #ffdb99;
  border-radius: 5px;
  max-width: 600px;
  margin: 20px auto; 
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%; 
  min-width: 200px;
`;

const Input = styled.input`
  width: 100%px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  background-color: #0d0d0a; 
  color: #faf5c0; 
  font-size: 16px;
  text-shadow: 1px 1px 2px black

  }

  &:focus {
    border: 1px solid yellow; 
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Centraliza os botões */
  gap: 10px; /* Espaço entre os botões */
  width: 100%;
  margin-top: 20px;
  `;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #f7a50c;
  color: white;
  shadow: 0 0 5 black;
  border: none;
  height: 42px;
  width: 100%;
  max-width: 200px;
  font-weight: bold;
  text-shadow: 1px 1px 2px black,
               0px 0px 1px black;
  box-shadow: inset 0 0 15px #9c6308,
              1px 1px 2px black;


`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>
      <ButtonContainer>
        <Button type="submit">CADASTRAR</Button>
        <Link to="/usuarios">
          <Button>Usuários Cadastrados</Button>
        </Link>
      </ButtonContainer>
    </FormContainer>
  );
  
};

export default Form;

