import type { IUser } from '@/types/user';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  users: IUser[];
}

export const UserTable = ({ users }: Props) => {
  const columns: ColumnsType<IUser> = [
    {
      title: 'Full name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'Role',
      key: 'role',
      render: (_: unknown, record: IUser) => (
        <Tag color="blue">{record.roleId?.name ?? 'Unknown'}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'active'
              ? 'green'
              : status === 'inactive'
                ? 'red'
                : 'default'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <Table<IUser>
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={users}
      pagination={false}
      bordered
    />
  );
};
