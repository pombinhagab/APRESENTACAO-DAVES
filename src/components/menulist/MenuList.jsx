import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TransactionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthProvider";
import "./MenuList.css";

const MenuList = ({ darkTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const selectedKey =
    location.pathname === "/" ? "dashboard" : location.pathname.slice(1);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      selectedKeys={[selectedKey]}
      className="menu-bar"
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="lancamentos" icon={<TransactionOutlined />}>
        <Link to="/lancamentos">Lançamentos</Link>
      </Menu.Item>
      <Menu.Item key="categorias" icon={<AppstoreOutlined />}>
        <Link to="/categorias">Categorias</Link>
      </Menu.Item>

      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Sair
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
