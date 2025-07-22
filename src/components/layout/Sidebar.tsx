import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Users', path: '/users' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Memories', path: '/memories' },
  { label: 'Journals', path: '/journals' },
  { label: 'Quotes', path: '/quotes' },
];

export const Sidebar = () => {
  const location = useLocation();

  const items: MenuProps['items'] = navItems.map((item) => ({
    key: item.path,
    label: <NavLink to={item.path}>{item.label}</NavLink>,
  }));

  return (
    <aside className="w-64 p-4">
      <h1 className="text-xl font-bold mb-6">Admin</h1>
      <Menu
        mode="inline"
        theme="light"
        selectedKeys={[location.pathname]}
        items={items}
      />
    </aside>
  );
};
