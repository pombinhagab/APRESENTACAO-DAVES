import { Modal, Form, Input, InputNumber, DatePicker, Select } from "antd";

const { Option } = Select;

const capitalizar = (texto) =>
  texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

export default function AdicionarLancamento({ visible, onCancel, onSubmit, valoresIniciais }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();

        const valorFinal = values.tipo === "despesa" ? -Math.abs(values.valor) : Math.abs(values.valor);

        onSubmit({
          ...values,
          valor: valorFinal,
          categoria: capitalizar(values.categoria),
        });
      })
      .catch((info) => {
        console.log("Erro na validação:", info);
      });
  };

  return (
    <Modal
      title="Adicionar Lançamento"
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Adicionar"
      cancelText="Cancelar"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={valoresIniciais}
      >
        <Form.Item
          name="descricao"
          label="Descrição"
          rules={[{ required: true, message: "Por favor, insira uma descrição." }]}
        >
          <Input placeholder="Ex: Salário, Conta de luz, etc." />
        </Form.Item>

        <Form.Item
          name="valor"
          label="Valor"
          rules={[{ required: true, message: "Por favor, insira o valor." }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Ex: 1500.00"
            min={0}
            step={0.01}
          />
        </Form.Item>

        <Form.Item
          name="data"
          label="Data"
          rules={[{ required: true, message: "Por favor, selecione a data." }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="categoria"
          label="Categoria"
          rules={[{ required: true, message: "Por favor, selecione uma categoria." }]}
        >
          <Select placeholder="Selecione a categoria">
            <Option value="salario">Salário</Option>
            <Option value="alimentacao">Alimentação</Option>
            <Option value="transporte">Transporte</Option>
            <Option value="lazer">Lazer</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="tipo"
          label="Tipo"
          rules={[{ required: true, message: "Por favor, selecione o tipo." }]}
        >
          <Select placeholder="Receita ou Despesa">
            <Option value="receita">Receita</Option>
            <Option value="despesa">Despesa</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
