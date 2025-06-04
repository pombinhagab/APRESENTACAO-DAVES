import { Button, Table, Popconfirm, Space, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdicionarLancamento from "../components/lancamentos/AdicionarLancamento";
import dayjs from "dayjs";

const { Option } = Select;

export default function Lancamentos() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [editando, setEditando] = useState(null);
  const [lancamentos, setLancamentos] = useState([]);


  const [filtroDescricao, setFiltroDescricao] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("lancamentos");
    if (dadosSalvos) {
      const parsed = JSON.parse(dadosSalvos);
      const comDatas = parsed.map((l) => ({ ...l, data: dayjs(l.data) }));
      setLancamentos(comDatas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
  }, [lancamentos]);

  const handleAdicionar = (novoLancamento) => {
    if (editando) {
      setLancamentos((prev) =>
        prev.map((l) => (l.key === editando.key ? { ...novoLancamento, key: l.key } : l))
      );
      setEditando(null);
    } else {
      setLancamentos((prev) => [...prev, { ...novoLancamento, key: Date.now() }]);
    }
    setModalVisivel(false);
  };

  const handleRemover = (key) => {
    setLancamentos((prev) => prev.filter((l) => l.key !== key));
  };

  const lancamentosFiltrados = lancamentos.filter((l) => {
    return (
      (!filtroDescricao || l.descricao.toLowerCase().includes(filtroDescricao.toLowerCase())) &&
      (!filtroCategoria || l.categoria === filtroCategoria) &&
      (!filtroTipo ||
        (filtroTipo === "receita" ? l.valor >= 0 : l.valor < 0))
    );
  });

  const colunas = [
    { title: "Descrição", dataIndex: "descricao", key: "descricao" },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
      render: (v) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`,
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      render: (date) => date.format("DD/MM/YYYY"),
    },
    { title: "Categoria", dataIndex: "categoria", key: "categoria" },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditando(record);
              setModalVisivel(true);
            }}
          />
          <Popconfirm
            title="Remover lançamento?"
            onConfirm={() => handleRemover(record.key)}
            okText="Sim"
            cancelText="Não"
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Space>
          <Input
            placeholder="Buscar descrição"
            value={filtroDescricao}
            onChange={(e) => setFiltroDescricao(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Filtrar categoria"
            value={filtroCategoria}
            onChange={setFiltroCategoria}
            allowClear
            style={{ width: 160 }}
          >
            <Option value="salario">Salário</Option>
            <Option value="alimentacao">Alimentação</Option>
            <Option value="transporte">Transporte</Option>
            <Option value="lazer">Lazer</Option>
          </Select>
          <Select
            placeholder="Tipo"
            value={filtroTipo}
            onChange={setFiltroTipo}
            allowClear
            style={{ width: 120 }}
          >
            <Option value="receita">Receita</Option>
            <Option value="despesa">Despesa</Option>
          </Select>
        </Space>

        <Button
          type="primary"
          onClick={() => {
            setEditando(null);
            setModalVisivel(true);
          }}
        >
          Adicionar Lançamento
        </Button>
      </div>

      <Table
        dataSource={lancamentosFiltrados}
        columns={colunas}
        locale={{ emptyText: "Não há lançamentos cadastrados." }}
      />

      <AdicionarLancamento
        visible={modalVisivel}
        onCancel={() => {
          setEditando(null);
          setModalVisivel(false);
        }}
        onSubmit={handleAdicionar}
        valoresIniciais={editando}
      />
    </div>
  );
}
