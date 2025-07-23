import type { IMemory } from '@/types';
import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  memories: IMemory[];
  onView?: (memory: IMemory) => void;
  onEdit?: (memory: IMemory) => void;
  onDelete?: (memory: IMemory) => void;
}

export const MemoriesTable = ({
  memories,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  const columns: ColumnsType<IMemory> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string) => <code>{slug}</code>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'published'
              ? 'green'
              : status === 'draft'
                ? 'orange'
                : 'default'
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : <span>-</span>,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_unused, record: IMemory) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onView?.(record)}
            type="link"
            title="Xem"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit?.(record)}
            type="link"
            title="Sửa"
          />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => onDelete?.(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} type="link" danger title="Xóa" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<IMemory>
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={memories}
      pagination={false}
      bordered
    />
  );
};
