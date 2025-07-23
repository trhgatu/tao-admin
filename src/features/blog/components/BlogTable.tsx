import type { IBlog } from '@/types';
import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  blogs: IBlog[];
  onView?: (blog: IBlog) => void;
  onEdit?: (blog: IBlog) => void;
  onDelete?: (blog: IBlog) => void;
}

export const BlogTable = ({ blogs, onView, onEdit, onDelete }: Props) => {
  const columns: ColumnsType<IBlog> = [
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
      title: 'Published',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
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
      width: 160,
      render: (_unused, record: IBlog) => (
        <Space size="small">
          <Button
            onClick={() => onView?.(record)}
            icon={<EyeOutlined />}
            type="link"
            title="Xem chi tiết"
          />
          <Button
            onClick={() => onEdit?.(record)}
            icon={<EditOutlined />}
            type="link"
            title="Chỉnh sửa"
          />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => onDelete?.(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} type="link" title="Xóa" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<IBlog>
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={blogs}
      pagination={false}
      bordered
    />
  );
};
