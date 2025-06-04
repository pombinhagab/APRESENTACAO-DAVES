import React from "react";
import { Card, Col, Row } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import "./DashboardCards.css";

const DashboardCards = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card className="dashboard-card income" bordered={false}>
            <div className="card-content">
              <DollarCircleOutlined className="card-icon" />
              <div>
                <p>Receita Total</p>
                <h2>R$ 12.500,00</h2>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card className="dashboard-card expense" bordered={false}>
            <div className="card-content">
              <ArrowDownOutlined className="card-icon" />
              <div>
                <p>Despesas</p>
                <h2>R$ 4.320,00</h2>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card className="dashboard-card savings" bordered={false}>
            <div className="card-content">
              <ArrowUpOutlined className="card-icon" />
              <div>
                <p>Total Poupado</p>
                <h2>R$ 2.100,00</h2>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCards;
