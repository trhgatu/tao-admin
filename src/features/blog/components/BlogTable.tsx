import type { IBlog } from '@/types';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  blogs: IBlog[];
}

export const BlogTable = ({ blogs }: Props) => {
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
  ];

  return (
    <Table
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={blogs}
      pagination={false}
      bordered
    />
  );
};
