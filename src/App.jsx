import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import SistemaFinancas from "./layout/SistemaFinancas";
import Dashboard from "./pages/Dashboard";
import Lancamentos from "./pages/Lancamentos";
import Categorias from "./pages/Categorias";
import ptBR from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import LoginPage from "./pages/login/LoginPage";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./context/PrivateRoute";

dayjs.locale("pt-br");

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<SistemaFinancas />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="lancamentos" element={<Lancamentos />} />
                <Route path="categorias" element={<Categorias />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
