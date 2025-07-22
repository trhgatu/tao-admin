import { useAuth } from '@/features/auth/hooks/useAuth';
import { Dropdown, Menu, Avatar, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

export const Header = () => {
  const { user, logout } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Typography.Title level={4} className="m-0">
        Admin Panel
      </Typography.Title>

      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <div className="flex items-center cursor-pointer gap-3">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src={user?.avatarUrl}
            alt={user?.fullName}
          />
          <span className="text-gray-700 font-medium">
            Xin chào, {user?.fullName || 'Khách'}
          </span>
        </div>
      </Dropdown>
    </header>
  );
};
