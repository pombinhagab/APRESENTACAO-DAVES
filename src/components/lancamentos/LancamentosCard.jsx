import React from "react";
import { Card, Tag } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./LancamentoCard.css";

const LancamentoCard = ({ lancamento }) => {
  const { tipo, descricao, valor, data, categoria } = lancamento;

  const isReceita = tipo === "receita";

  return (
    <Card className={`lancamento-card ${isReceita ? "receita" : "despesa"}`} bordered={false}>
      <div className="card-content">
        <div className="icon-wrapper">
          {isReceita ? (
            <ArrowUpOutlined className="icon receita-icon" />
          ) : (
            <ArrowDownOutlined className="icon despesa-icon" />
          )}
        </div>
        <div className="info">
          <h3>{descricao}</h3>
          <p>
            <CalendarOutlined /> {data} &nbsp;|&nbsp; <Tag color="blue">{categoria}</Tag>
          </p>
        </div>
        <div className={`valor ${isReceita ? "receita-valor" : "despesa-valor"}`}>
          R$ {valor.toFixed(2)}
        </div>
      </div>
    </Card>
  );
};

export default LancamentoCard;
