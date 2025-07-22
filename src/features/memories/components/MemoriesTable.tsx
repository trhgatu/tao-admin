import type { IMemory } from '@/types';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  memories: IMemory[];
}

export const MemoriesTable = ({ memories }: Props) => {
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
