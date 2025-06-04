import React, { useState } from "react";
import { Button, Form, Input, Modal, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "./LoginPage.css";

const roxoSidebar = "#722ed1";

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const onFinishLogin = (values) => {
    const { login: email, password: senha } = values;
    const sucesso = login(email, senha);

    if (sucesso) {
      message.success("Login efetuado com sucesso!");
      navigate("/dashboard");
    } else {
      message.error("Login ou senha inválidos.");
    }
  };

  const onFinishCadastro = (values) => {
    console.log("Cadastro dados:", values);
    message.success("Cadastro realizado com sucesso! (simulado)");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <Typography.Title style={{ color: roxoSidebar, marginBottom: 24 }}>
            Entrar
          </Typography.Title>

          <Form
            name="loginForm"
            layout="vertical"
            onFinish={onFinishLogin}
            autoComplete="off"
          >
            <Form.Item
              label="Login"
              name="login"
              rules={[{ required: true, message: "Por favor insira seu login!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[{ required: true, message: "Por favor insira sua senha!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="btn-primary">
                Entrar
              </Button>
            </Form.Item>
          </Form>

          <Button type="link" onClick={showModal} className="btn-link">
            Cadastrar
          </Button>
        </div>
      </div>

      <Modal title="Cadastro" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form name="cadastroForm" layout="vertical" onFinish={onFinishCadastro}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Por favor insira seu nome!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: "Por favor insira seu e-mail!" },
              { type: "email", message: "Formato de e-mail inválido!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Por favor insira uma senha!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-primary">
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
