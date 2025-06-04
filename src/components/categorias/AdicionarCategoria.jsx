import { Modal, Form, Input } from "antd";

export default function AdicionarCategoria({ visible, onCancel, onSubmit, valoresIniciais }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmit(values.nome);
      })
      .catch((info) => {
        console.log("Erro na validação:", info);
      });
  };

  return (
    <Modal
      title={valoresIniciais ? "Editar Categoria" : "Adicionar Categoria"}
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={valoresIniciais || { nome: "" }}
      >
        <Form.Item
          name="nome"
          label="Nome da Categoria"
          rules={[{ required: true, message: "Por favor, insira o nome da categoria." }]}
        >
          <Input placeholder="Ex: Saúde, Investimentos..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
