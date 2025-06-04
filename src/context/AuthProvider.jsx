import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usuario = localStorage.getItem("user");
    if (usuario) {
      setUser(JSON.parse(usuario));
      setLogado(true);
    }
  }, []);

  const logout = () => {
    setUser(null);
    setLogado(false);
    localStorage.removeItem("user");
  };

  const login = (email, senha) => {
    if (email === "admin@email.com" && senha === "123") {
      let usuario = {
        nome: "Teste da Silva",
        id: "1",
        perfil: "CLIENTE",
        email,
      };
      localStorage.setItem("user", JSON.stringify(usuario));
      setUser(usuario);
      setLogado(true);
      return true;
    } else {
      setUser(null);
      setLogado(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, logado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
