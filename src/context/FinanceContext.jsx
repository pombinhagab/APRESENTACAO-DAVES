import React, { createContext, useState, useEffect, useContext } from 'react';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  //lançamentos do local storage
  const [lancamentos, setLancamentos] = useState(() => {
    const saved = localStorage.getItem('lancamentos');
    return saved ? JSON.parse(saved) : [
      { id: 1, descricao: 'Salário', categoria: 'Receita', tipo: 'Receita', valor: 5000, data: '2025-05-01' },
      { id: 2, descricao: 'Aluguel', categoria: 'Moradia', tipo: 'Despesa', valor: 1200, data: '2025-05-05' },
      { id: 3, descricao: 'Supermercado', categoria: 'Alimentação', tipo: 'Despesa', valor: 450, data: '2025-05-10' },
    ];
  });

  //categorias
  const [categorias, setCategorias] = useState(() => {
    const saved = localStorage.getItem('categorias');
    return saved ? JSON.parse(saved) : [
      'Receita',
      'Moradia',
      'Alimentação',
      'Transporte',
      'Lazer',
    ];
  });

  useEffect(() => {
    localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
  }, [lancamentos]);

 
  useEffect(() => {
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }, [categorias]);

  //func de adicionar lançamento
  const adicionarLancamento = (novoLancamento) => {
    setLancamentos(prev => [...prev, { id: Date.now(), ...novoLancamento }]);
  };

  //func pra adicionar categoria
  const adicionarCategoria = (novaCategoria) => {
    setCategorias(prev => [...prev, novaCategoria]);
  };

  //func pra remover lancamento

  const removerLancamento = (id) => {
    setLancamentos(prev => prev.filter(l => l.id !== id));
  };
  

  return (
    <FinanceContext.Provider value={{
      lancamentos,
      categorias,
      adicionarLancamento,
      adicionarCategoria,
      removerLancamento,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  return useContext(FinanceContext);
};
