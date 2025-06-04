import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, message, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdicionarCategoria from "../components/categorias/AdicionarCategoria";

const Categorias = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, nome: "Alimentação" },
    { id: 2, nome: "Transporte" },
    { id: 3, nome: "Lazer" },
    { id: 4, nome: "Salário" },
  ]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);

  const abrirModal = (categoria = null) => {
    setEditando(categoria);
    setModalAberto(true);
  };

  const salvarCategoria = (nome) => {
    if (editando) {
      setCategorias((prev) =>
        prev.map((cat) => (cat.id === editando.id ? { ...cat, nome } : cat))
      );
      message.success("Categoria atualizada!");
    } else {
      const novaCategoria = { id: Date.now(), nome };
      setCategorias((prev) => [...prev, novaCategoria]);
      message.success("Categoria adicionada!");
    }
    setModalAberto(false);
    setEditando(null);
  };

  const excluirCategoria = (id) => {
    setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    message.success("Categoria excluída!");
  };

  const colunas = [
    {
      title: "Categoria",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, categoria) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => abrirModal(categoria)}
          />
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => excluirCategoria(categoria.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => abrirModal()}
        style={{ marginBottom: 16 }}
      >
        Adicionar Categoria
      </Button>
      <Table dataSource={categorias} columns={colunas} rowKey="id" />

      <AdicionarCategoria
        visible={modalAberto}
        onCancel={() => {
          setModalAberto(false);
          setEditando(null);
        }}
        onSubmit={salvarCategoria}
        valoresIniciais={editando}
      />
    </div>
  );
};

export default Categorias;
