import type { IJournal } from '@/types/journal';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  journals: IJournal[];
}

export const JournalTable = ({ journals }: Props) => {
  const columns: ColumnsType<IJournal> = [
    {
      title: 'Content',
      dataIndex: 'rawContent',
      key: 'rawContent',
      render: (text: string) => (
        <span title={text}>
          {text.length > 48 ? text.slice(0, 48) + '...' : text}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'public'
              ? 'green'
              : status === 'private'
                ? 'orange'
                : 'default'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Auto',
      dataIndex: 'autoTranslated',
      key: 'autoTranslated',
      render: (val: boolean) =>
        val ? <Tag color="blue">Auto</Tag> : <Tag color="default">No</Tag>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Deleted',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (val: boolean) =>
        val ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>,
    },
  ];

  return (
    <Table<IJournal>
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={journals}
      pagination={false}
      bordered
    />
  );
};
