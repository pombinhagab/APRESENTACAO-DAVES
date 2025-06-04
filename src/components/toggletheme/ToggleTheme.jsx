import { Button, Tooltip } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import './ToggleTheme.css';

const ToggleTheme = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
      <Tooltip title="Alternar tema" placement="right">
        <Button
          shape="circle"
          icon={darkTheme ? <BulbFilled /> : <BulbOutlined />}
          onClick={toggleTheme}
        />
      </Tooltip>
    </div>
  );
};

export default ToggleTheme;
