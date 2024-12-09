import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Importando Link para navegação

const FormContainer = styled.form`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  background-color: #7d735b;
  padding: 20px;
  box-shadow: inset 0 0 25px black, 0px 0px 5px #ffdb99;
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
  width: 100%;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  background-color: #0d0d0a;
  color: #faf5c0;
  font-size: 16px;
  text-shadow: 1px 1px 2px black;

  &:focus {
    border: 1px solid yellow;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  box-shadow: inset 0 0 15px #9c6308, 1px 1px 2px black;
  border: none;
  height: 42px;
  width: 100%;
  max-width: 200px;
  font-weight: bold;
  text-shadow: 1px 1px 2px black, 0px 0px 1px black;
`;

const ShowPasswordButton = styled.button`
  background-color: transparent;
  border: none;
  color: #faf5c0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 5px;
`;

const Form = ({ getUsers }) => {
  const ref = React.useRef();
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    // Verifica se todos os campos estão preenchidos
    if (
      !user.nome.value ||
      !user.email.value ||
      !user.senha.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    // Envia os dados para criar um novo usuário
    await axios
      .post("http://localhost:8800", {
        nome: user.nome.value,
        email: user.email.value,
        senha: user.senha.value,
        data_nascimento: user.data_nascimento.value,
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    // Limpa os campos após o envio
    user.nome.value = "";
    user.email.value = "";
    user.senha.value = "";
    user.data_nascimento.value = "";

    // Atualiza a lista de usuários
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
        <Label>Senha</Label>
        <Input
          name="senha"
          type={showPassword ? "text" : "password"} // Alterna entre 'text' e 'password'
        />
        <ShowPasswordButton
          type="button"
          onClick={() => setShowPassword((prev) => !prev)} // Altera o estado para mostrar/ocultar a senha
        >
          {showPassword ? "Ocultar senha" : "Mostrar senha"}
        </ShowPasswordButton>
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
