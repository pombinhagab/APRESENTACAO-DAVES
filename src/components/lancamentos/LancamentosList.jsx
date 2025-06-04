import React from "react";
import LancamentoCard from "./LancamentosCard";


const LancamentosList = ({ lancamentos }) => {
  if (lancamentos.length === 0) {
    return <p style={{ padding: "24px", textAlign: "center" }}>Nenhum lançamento cadastrado.</p>;
  }

  return (
    <div>
      {lancamentos.map((lancamento, index) => (
        <LancamentoCard key={index} lancamento={lancamento} />
      ))}
    </div>
  );
};

export default LancamentosList;
